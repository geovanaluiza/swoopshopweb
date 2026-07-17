interface CartItem {
  key: string
  id: string
  slug: string
  name: string
  price: number
  image: string
  qty: number
  variant?: string
}

const STORAGE_KEY = 'swoopshop.cart.v1'

const state = () => useState<CartItem[]>('swoopshop-cart', () => [])

export const useCart = () => {
  const items = state()

  if (import.meta.client) {
    onMounted(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (raw) items.value = JSON.parse(raw)
      } catch {
        /* no-op */
      }
    })
  }

  const persist = () => {
    if (!import.meta.client) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
    } catch {
      /* no-op */
    }
  }

  const buildKey = (id: string, variant?: string) =>
    `${id}${variant ? `::${variant}` : ''}`

  const add = (product: { id: string; slug: string; name: string; price: number; image: string }, variant?: string) => {
    const key = buildKey(product.id, variant)
    const existing = items.value.find((it) => it.key === key)
    if (existing) {
      existing.qty += 1
    } else {
      items.value.push({
        key,
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1,
        variant
      })
    }
    persist()
  }

  const remove = (key: string) => {
    items.value = items.value.filter((it) => it.key !== key)
    persist()
  }

  const updateQty = (key: string, qty: number) => {
    const it = items.value.find((x) => x.key === key)
    if (!it) return
    if (qty <= 0) return remove(key)
    it.qty = qty
    persist()
  }

  const count = computed(() => items.value.reduce((sum, it) => sum + it.qty, 0))
  const subtotal = computed(() =>
    items.value.reduce((sum, it) => sum + it.qty * it.price, 0)
  )

  return { items: readonly(items), add, remove, updateQty, count, subtotal }
}
