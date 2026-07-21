/* =============================================================
   Shopify products — fetches from Storefront API and maps to
   the local Product interface. Falls back silently if Shopify
   is not configured (local catalog stays in use).
   ============================================================= */
import type { Product, ProductCategory } from './useProducts'

const PRODUCTS_QUERY = /* graphql */ `
  query Products($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      edges {
        node {
          id
          handle
          title
          description
          productType
          tags
          featuredImage { url altText }
          compareAtPriceRange { minVariantPrice { amount } }
          priceRange { minVariantPrice { amount } }
          options { name values }
          variants(first: 100) {
            edges {
              node {
                id
                title
                availableForSale
                price { amount }
                compareAtPrice { amount }
                selectedOptions { name value }
                image { url altText }
              }
            }
          }
        }
      }
    }
  }
`

interface ShopifyVariantNode {
  id: string
  title: string
  availableForSale: boolean
  price: { amount: string }
  compareAtPrice: { amount: string } | null
  selectedOptions: { name: string; value: string }[]
  image: { url: string; altText: string | null } | null
}

export interface MappedShopifyVariant {
  id: string
  title: string
  available: boolean
  size?: string
  color?: string
}

export interface MappedShopifyProduct extends Product {
  variantId: string
  variantTitle?: string
  shopifyId: string
  variants: MappedShopifyVariant[]
}

const CATEGORY_MAP: Record<string, ProductCategory> = {
  apparel: 'apparel',
  clothing: 'apparel',
  headwear: 'headwear',
  hats: 'headwear',
  accessories: 'accessories',
  drinkware: 'accessories'
}

const COLOR_HEX: Record<string, string> = {
  'nu blue': '#0068bb',
  navy: '#034C87',
  midnight: '#001729',
  evergreen: '#04505c',
  white: '#ffffff',
  cloud: '#f1f2f2',
  grey: '#f1f2f2',
  tour: '#fbd945',
  camo: '#6b5d4a',
  stone: '#8a8070',
  black: '#001729'
}

const badgeFromTags = (tags: string[]): Product['badge'] => {
  const t = tags.map(x => x.toLowerCase())
  if (t.includes('best-seller') || t.includes('best seller')) return 'Best Seller'
  if (t.includes('new')) return 'New'
  if (t.includes('sale')) return 'Sale'
  if (t.includes('limited')) return 'Limited'
  return undefined
}

const mapProduct = (node: any): MappedShopifyProduct | null => {
  const variants: ShopifyVariantNode[] = node.variants.edges.map((e: any) => e.node)
  const firstAvailable = variants.find(v => v.availableForSale) ?? variants[0]
  if (!firstAvailable) return null

  const sizeOption = node.options.find((o: any) => /size/i.test(o.name))
  const colorOption = node.options.find((o: any) => /colo(u)?r/i.test(o.name))

  const typeKey = (node.productType || '').toLowerCase()
  const category: ProductCategory = CATEGORY_MAP[typeKey] ?? 'apparel'

  const price = parseFloat(firstAvailable.price.amount)
  const compareAt = firstAvailable.compareAtPrice
    ? parseFloat(firstAvailable.compareAtPrice.amount)
    : undefined

  return {
    id: node.handle,
    slug: node.handle,
    name: node.title,
    price,
    compareAt: compareAt && compareAt > price ? compareAt : undefined,
    category,
    collection: node.tags.find((t: string) => !/new|sale|best|limited/i.test(t)) ?? 'Shop',
    badge: badgeFromTags(node.tags),
    description: node.description || '',
    image: node.featuredImage?.url ?? '',
    imageAlt: node.featuredImage?.altText ?? node.title,
    sizes: sizeOption ? sizeOption.values : ['OSFM'],
    colors: colorOption
      ? colorOption.values.map((v: string) => ({
          id: v.toLowerCase().replace(/\s+/g, '-'),
          name: v,
          hex: COLOR_HEX[v.toLowerCase()] ?? '#95c5ea'
        }))
      : [],
    variantId: firstAvailable.id,
    variantTitle: firstAvailable.title !== 'Default Title' ? firstAvailable.title : undefined,
    shopifyId: node.id,
    variants: variants.map(v => {
      const sizeOpt = v.selectedOptions.find(o => /size/i.test(o.name))
      const colorOpt = v.selectedOptions.find(o => /colo(u)?r/i.test(o.name))
      return {
        id: v.id,
        title: v.title,
        available: v.availableForSale,
        size: sizeOpt?.value,
        color: colorOpt?.value
      }
    })
  }
}

export const useShopifyProducts = () => {
  const { enabled, shopifyFetch } = useShopify()
  const products = useState<MappedShopifyProduct[]>('shopify-products', () => [])
  const loaded = useState<boolean>('shopify-products-loaded', () => false)

  const fetchProducts = async () => {
    if (!enabled.value || loaded.value) return
    try {
      const data = await shopifyFetch(PRODUCTS_QUERY, { first: 50 })
      products.value = (data as any).products.edges
        .map((e: any) => mapProduct(e.node))
        .filter(Boolean)
      loaded.value = true
    } catch (err) {
      console.warn('[shopify] product fetch failed, using local catalog', err)
    }
  }

  return { products: readonly(products), loaded: readonly(loaded), fetchProducts }
}
