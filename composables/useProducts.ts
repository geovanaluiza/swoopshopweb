export interface ProductVariantColor {
  id: string
  name: string
  hex: string
}

export interface Product {
  id: string
  slug: string
  name: string
  price: number
  compareAt?: number
  category: ProductCategory
  collection: string
  badge?: 'New' | 'Sale' | 'Best Seller' | 'Limited'
  description: string
  image: string
  imageAlt: string
  sizes: string[]
  colors: ProductVariantColor[]
}

export type ProductCategory =
  | 'apparel'
  | 'headwear'
  | 'accessories'

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  apparel: 'Apparel',
  headwear: 'Headwear',
  accessories: 'Accessories'
}

const SIZE_CLOTHING = ['XS', 'S', 'M', 'L', 'XL', '2XL']
const SIZE_HAT = ['OSFM']

const NU_BLUE    = { id: 'blue',     name: 'NU Blue',   hex: '#0068bb' }
const NAVY       = { id: 'navy',     name: 'Navy',      hex: '#034C87' }
const MIDNIGHT   = { id: 'midnight', name: 'Midnight',  hex: '#001729' }
const EVERGREEN  = { id: 'evergreen',name: 'Evergreen', hex: '#04505c' }
const WHITE      = { id: 'white',    name: 'White',     hex: '#ffffff' }
const GREY       = { id: 'grey',     name: 'Cloud',     hex: '#f1f2f2' }
const TOUR       = { id: 'tour',     name: 'Tour',      hex: '#fbd945' }
const CAMO       = { id: 'camo',     name: 'Camo',      hex: '#6b5d4a' }
const STONE      = { id: 'stone',    name: 'Stone',     hex: '#8a8070' }

const IMG = (f: string) => `/shop/${f}`

export const PRODUCTS: Product[] = [
  {
    id: 'p-001',
    slug: 'pilchuck-hoodie',
    name: 'Pilchuck Hoodie',
    price: 74,
    category: 'apparel',
    collection: 'Pilchuck Premium',
    badge: 'Best Seller',
    description:
      'Heavyweight 80/20 cotton-poly fleece pullover hoodie. Brushed inner, kangaroo pocket, tonal mountain graphic across the chest.',
    image: IMG('Hanes-Hoodie-NU-Royal.jpg'),
    imageAlt: 'Royal blue hoodie with NU embroidery',
    sizes: SIZE_CLOTHING,
    colors: [NU_BLUE, NAVY, MIDNIGHT]
  },
  {
    id: 'p-002',
    slug: 'eagles-essential-crewneck',
    name: 'Eagles Essential Crewneck',
    price: 58,
    category: 'apparel',
    collection: 'Eagles Essentials',
    badge: 'Best Seller',
    description:
      'Mid-weight fleece crewneck with an embroidered Swoop crest on the chest and rib-knit cuffs.',
    image: IMG('Cotton-Collective-Heavy-Crew-Bering-Sea.jpg'),
    imageAlt: 'Heavyweight crewneck fleece in Bering Sea',
    sizes: SIZE_CLOTHING,
    colors: [EVERGREEN, NAVY, GREY]
  },
  {
    id: 'p-003',
    slug: 'camo-crewneck',
    name: 'Camo Heavy Crewneck',
    price: 65,
    category: 'apparel',
    collection: 'Eagles Essentials',
    badge: 'New',
    description:
      'Military-inspired heavyweight camo crewneck with embroidered Swoop at the chest.',
    image: IMG('Cotton-Collective-Crew-Camo.jpg'),
    imageAlt: 'Camo heavyweight crewneck',
    sizes: SIZE_CLOTHING,
    colors: [CAMO]
  },
  {
    id: 'p-004',
    slug: 'made-crew-nu-eagle',
    name: 'Made Crew — NU Eagle',
    price: 62,
    category: 'apparel',
    collection: 'Pilchuck Premium',
    description:
      'Premium midweight crewneck with a large embroidered Eagle mark across the chest.',
    image: IMG('Made-Crew-NU-Eagle-Grey.jpg'),
    imageAlt: 'Grey crewneck with large embroidered NU Eagle',
    sizes: SIZE_CLOTHING,
    colors: [GREY, NAVY]
  },
  {
    id: 'p-005',
    slug: 'hanes-ls-navy',
    name: 'Hanes Long Sleeve Tee — Navy',
    price: 32,
    category: 'apparel',
    collection: 'Eagles Essentials',
    description:
      'Soft ring-spun cotton long sleeve tee with a small embroidered NU crest at the chest.',
    image: IMG('Hanes-LS-Tee-Navy.jpg'),
    imageAlt: 'Navy long sleeve tee with NU crest',
    sizes: SIZE_CLOTHING,
    colors: [NAVY, MIDNIGHT]
  },
  {
    id: 'p-006',
    slug: 'hanes-ss-nu-seal',
    name: 'Hanes SS Tee — NU Seal',
    price: 28,
    category: 'apparel',
    collection: 'Swoop Campus',
    badge: 'New',
    description:
      'Soft cotton short sleeve tee with a printed NU seal at the chest. An everyday staple.',
    image: IMG('Hanes-SS-NU-Seal-Tee-Navy.jpg'),
    imageAlt: 'Navy short sleeve tee with NU seal print',
    sizes: SIZE_CLOTHING,
    colors: [NAVY, WHITE, NU_BLUE]
  },
  {
    id: 'p-007',
    slug: 'augusta-perf-tee-navy',
    name: 'Augusta Performance SS Tee — Navy',
    price: 30,
    category: 'apparel',
    collection: 'Game Day',
    description:
      'Lightweight moisture-wicking performance tee in navy with a printed Swoop mark. Built for the bleachers.',
    image: IMG('Augusta-Perf-SS-Tee-Navy.jpg'),
    imageAlt: 'Navy performance short sleeve tee',
    sizes: SIZE_CLOTHING,
    colors: [NAVY, NU_BLUE]
  },
  {
    id: 'p-008',
    slug: 'legacy-twill-cap',
    name: 'Legacy Twill Eagles Cap',
    price: 30,
    category: 'headwear',
    collection: 'Alumni',
    badge: 'Best Seller',
    description:
      'Premium unstructured cap in stone/navy with embroidered Eagles wordmark. Adjustable strap.',
    image: IMG('Legacy-Twill-Eagles-Stone-Navy.jpg'),
    imageAlt: 'Stone and navy legacy twill Eagles cap',
    sizes: SIZE_HAT,
    colors: [STONE, NAVY]
  },
  {
    id: 'p-009',
    slug: 'knit-beanie-navy',
    name: 'Knit Beanie — Navy',
    price: 26,
    category: 'headwear',
    collection: 'Eagles Essentials',
    description:
      'Cuffed knit beanie in navy with a woven Swoop patch and contrast stripe.',
    image: IMG('Knit-Beanie-Navy.jpg'),
    imageAlt: 'Navy knit beanie',
    sizes: SIZE_HAT,
    colors: [NAVY, NU_BLUE]
  },
  {
    id: 'p-010',
    slug: 'new-era-pom-navy',
    name: 'New Era Pom Beanie — Navy',
    price: 32,
    category: 'headwear',
    collection: 'Game Day',
    description:
      'Authentic New Era pom-top beanie in navy with embroidered NU crest at the cuff.',
    image: IMG('New-Era-Pom-Beanie-Navy.jpg'),
    imageAlt: 'Navy New Era pom beanie',
    sizes: SIZE_HAT,
    colors: [NAVY, NU_BLUE, GREY]
  },
  {
    id: 'p-011',
    slug: 'new-era-pom-ivory',
    name: 'New Era Pom Beanie — Ivory',
    price: 32,
    category: 'headwear',
    collection: 'Pilchuck Premium',
    description:
      'Authentic New Era pom-top beanie in ivory with embroidered NU crest at the cuff.',
    image: IMG('New-Era-Pom-Beanie-Ivory.jpg'),
    imageAlt: 'Ivory New Era pom beanie',
    sizes: SIZE_HAT,
    colors: [WHITE, GREY]
  },
  {
    id: 'p-012',
    slug: 'sportsman-nu-hat-ivory',
    name: 'Sportsman NU Hat — Ivory',
    price: 34,
    category: 'headwear',
    collection: 'Swoop Campus',
    description:
      'Premium unstructured sportsman hat in ivory with a tonal embroidered Swoop at the front.',
    image: IMG('Sportsman-NU-Ivory-Hat.jpg'),
    imageAlt: 'Ivory unstructured sportsman hat',
    sizes: SIZE_HAT,
    colors: [WHITE, GREY, NAVY]
  },
  {
    id: 'p-013',
    slug: 'sportsman-nu-hat-navy',
    name: 'Sportsman NU Hat — Navy',
    price: 34,
    category: 'headwear',
    collection: 'Game Day',
    description:
      'Premium unstructured sportsman hat in navy with a tonal embroidered Swoop at the front.',
    image: IMG('Sportsman-NU-Navy-Hat.jpg'),
    imageAlt: 'Navy unstructured sportsman hat',
    sizes: SIZE_HAT,
    colors: [NAVY, MIDNIGHT]
  },
  {
    id: 'p-014',
    slug: 'flair-bottle-nu-blue',
    name: 'Flair Bottle — NU Classic Blue',
    price: 28,
    category: 'accessories',
    collection: 'Swoop Campus',
    description:
      'Double-walled insulated 17oz water bottle. Keeps drinks cold for 24 hours. Leak-proof lid.',
    image: IMG('Flair-Bottle-NU-Classic-Blue.jpg'),
    imageAlt: 'NU Classic Blue insulated water bottle',
    sizes: ['17oz'],
    colors: [NU_BLUE, NAVY, WHITE]
  }
]

export const useProducts = () => {
  const { products: shopifyProducts } = useShopifyProducts()

  // Shopify catalog takes over when loaded; local catalog is the fallback.
  const catalog = computed(() =>
    shopifyProducts.value.length ? shopifyProducts.value : PRODUCTS
  )

  const list = (category?: ProductCategory) =>
    category ? catalog.value.filter((p) => p.category === category) : catalog.value

  const featured = () => catalog.value.filter((p) => p.badge).slice(0, 4)
  const byCollection = (name: string) => catalog.value.filter((p) => p.collection === name)
  const find = (slug: string) => catalog.value.find((p) => p.slug === slug)

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

  return { list, featured, byCollection, find, formatPrice }
}
