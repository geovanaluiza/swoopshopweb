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

const NU_BLUE = { id: 'blue', name: 'NU Blue', hex: '#0068bb' }
const NAVY = { id: 'navy', name: 'Navy', hex: '#034C87' }
const MIDNIGHT = { id: 'midnight', name: 'Midnight', hex: '#001729' }
const EVERGREEN = { id: 'evergreen', name: 'Evergreen', hex: '#04505c' }
const WHITE = { id: 'white', name: 'White', hex: '#ffffff' }
const GREY = { id: 'grey', name: 'Cloud', hex: '#f1f2f2' }
const TOUR = { id: 'tour', name: 'Tour', hex: '#fbd945' }

const PLACEHOLDER = (label: string, hex = '0068bb') =>
  `https://placehold.co/640x800/${hex.replace('#', '')}/ffffff?text=${encodeURIComponent(label)}&font=roboto`

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
    image: PLACEHOLDER('Pilchuck+Hoodie', '04505c'),
    imageAlt: 'Evergreen NU hoodie with mountain graphic',
    sizes: SIZE_CLOTHING,
    colors: [EVERGREEN, MIDNIGHT, NAVY]
  },
  {
    id: 'p-002',
    slug: 'eagles-essential-crewneck',
    name: 'Eagles Essential Crewneck',
    price: 58,
    category: 'apparel',
    collection: 'Eagles Essentials',
    description:
      'Mid-weight fleece crewneck in NU Midnight with an embroidered Swoop crest on the chest and rib-knit cuffs.',
    image: PLACEHOLDER('Eagles+Crewneck', '00263d'),
    imageAlt: 'Navy crewneck with Swoop embroidery',
    sizes: SIZE_CLOTHING,
    colors: [MIDNIGHT, EVERGREEN, NU_BLUE]
  },
  {
    id: 'p-003',
    slug: 'swoop-campus-tee',
    name: 'Swoop Campus Tee',
    price: 28,
    category: 'apparel',
    collection: 'Swoop Campus',
    badge: 'New',
    description:
      'Soft ring-spun cotton tee with a vintage Swoop wordmark screen-printed across the chest.',
    image: PLACEHOLDER('Swoop+Campus+Tee', '0068bb'),
    imageAlt: 'NU blue tee with vintage Swoop wordmark',
    sizes: SIZE_CLOTHING,
    colors: [WHITE, NAVY, MIDNIGHT, NU_BLUE]
  },
  {
    id: 'p-004',
    slug: 'game-day-jersey',
    name: 'Game Day Replica Jersey',
    price: 65,
    compareAt: 75,
    category: 'apparel',
    collection: 'Game Day',
    badge: 'Sale',
    description:
      'Officially licensed replica jersey with tackle-twill numbers, embroidered NU crest, and breathable mesh side panels.',
    image: PLACEHOLDER('Game+Day+Jersey', '034C87'),
    imageAlt: 'Navy replica jersey with tackle-twill numbers',
    sizes: SIZE_CLOTHING,
    colors: [NAVY, MIDNIGHT]
  },
  {
    id: 'p-005',
    slug: 'pilchuck-quarter-zip',
    name: 'Pilchuck Quarter-Zip',
    price: 64,
    category: 'apparel',
    collection: 'Pilchuck Premium',
    description:
      'Performance quarter-zip pullover with a moisture-wicking inner and metallic NU crest at the collar.',
    image: PLACEHOLDER('Pilchuck+Quarter+Zip', '04505c'),
    imageAlt: 'Evergreen quarter-zip pullover',
    sizes: SIZE_CLOTHING,
    colors: [EVERGREEN, MIDNIGHT, NU_BLUE, TOUR]
  },
  {
    id: 'p-006',
    slug: 'tour-long-sleeve',
    name: 'Tour Long Sleeve Tee',
    price: 38,
    category: 'apparel',
    collection: 'Eagles Essentials',
    description:
      'Lightweight long sleeve in Tour yellow with a tonal Swoop embroidered on the chest.',
    image: PLACEHOLDER('Tour+Long+Sleeve', 'fbd945'),
    imageAlt: 'Tour yellow long sleeve tee',
    sizes: SIZE_CLOTHING,
    colors: [TOUR, WHITE, NU_BLUE]
  },
  {
    id: 'p-007',
    slug: 'alumni-classic-cap',
    name: 'Alumni Classic Cap',
    price: 32,
    category: 'headwear',
    collection: 'Alumni',
    description:
      'Unstructured six-panel dad cap with an embroidered NU crest and a curved brim. Adjustable metal buckle.',
    image: PLACEHOLDER('Alumni+Cap', '00263d'),
    imageAlt: 'Navy unstructured cap with embroidered NU crest',
    sizes: SIZE_HAT,
    colors: [MIDNIGHT, EVERGREEN, GREY]
  },
  {
    id: 'p-008',
    slug: 'swoop-knit-beanie',
    name: 'Swoop Knit Beanie',
    price: 26,
    category: 'headwear',
    collection: 'Swoop Campus',
    description:
      'Cuffed knit beanie in NU blue with a woven Swoop patch and a contrast stripe.',
    image: PLACEHOLDER('Swoop+Beanie', '0068bb'),
    imageAlt: 'Blue knit beanie',
    sizes: SIZE_HAT,
    colors: [NU_BLUE, MIDNIGHT, EVERGREEN]
  },
  {
    id: 'p-009',
    slug: 'game-day-trucker',
    name: 'Game Day Trucker',
    price: 34,
    category: 'headwear',
    collection: 'Game Day',
    description:
      'Snap-back trucker with a flat brim, breathable mesh back, and raised Swoop embroidery at the front panel.',
    image: PLACEHOLDER('Game+Day+Trucker', '034C87'),
    imageAlt: 'Navy trucker cap with mesh back',
    sizes: SIZE_HAT,
    colors: [NAVY, MIDNIGHT]
  },
  {
    id: 'p-010',
    slug: 'swoop-canvas-tote',
    name: 'Swoop Canvas Tote',
    price: 22,
    category: 'accessories',
    collection: 'Swoop Campus',
    description:
      'Heavyweight cotton canvas tote with reinforced handles, an interior pocket, and a full-bleed Swoop print.',
    image: PLACEHOLDER('Swoop+Tote', '034C87'),
    imageAlt: 'Navy canvas tote with Swoop print',
    sizes: SIZE_HAT,
    colors: [NAVY, MIDNIGHT, TOUR]
  },
  {
    id: 'p-011',
    slug: 'pilchuck-tumbler-24',
    name: 'Pilchuck Tumbler — 24oz',
    price: 34,
    category: 'accessories',
    collection: 'Pilchuck Premium',
    badge: 'Best Seller',
    description:
      'Double-walled 24oz stainless tumbler. Keeps drinks cold for 24 hours, hot for 12. Powder-coated evergreen with white Swoop mark.',
    image: PLACEHOLDER('Pilchuck+Tumbler', '04505c'),
    imageAlt: 'Evergreen 24oz tumbler',
    sizes: ['24oz'],
    colors: [EVERGREEN, MIDNIGHT, NU_BLUE, WHITE]
  },
  {
    id: 'p-012',
    slug: 'campus-mug-12',
    name: 'Campus Mug — 12oz',
    price: 18,
    category: 'accessories',
    collection: 'Swoop Campus',
    description:
      'Ceramic mug featuring an illustrated line of the Northwest University campus skyline.',
    image: PLACEHOLDER('Campus+Mug', '0068bb'),
    imageAlt: 'NU blue mug with campus skyline',
    sizes: ['12oz'],
    colors: [NU_BLUE, WHITE, MIDNIGHT]
  }
]

export const useProducts = () => {
  const list = (category?: ProductCategory) =>
    category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS

  const featured = () => PRODUCTS.filter((p) => p.badge).slice(0, 4)
  const byCollection = (name: string) => PRODUCTS.filter((p) => p.collection === name)
  const find = (slug: string) => PRODUCTS.find((p) => p.slug === slug)

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)

  return { list, featured, byCollection, find, formatPrice }
}
