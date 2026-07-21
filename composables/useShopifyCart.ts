/* =============================================================
   Shopify Cart API — creates a real Shopify cart from the local
   cart items, then redirects to the hosted checkout.
   Pickup-only: Local Pickup must be enabled in Shopify admin
   (Settings → Shipping and delivery → Local pickup) for the
   Student Center – Pecota location. No shipping rates needed.
   ============================================================= */

const CART_CREATE = /* graphql */ `
  mutation CartCreate($lines: [CartLineInput!]!, $attributes: [AttributeInput!]) {
    cartCreate(input: { lines: $lines, attributes: $attributes }) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors { field message }
    }
  }
`

const CART_LINES_ADD = /* graphql */ `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
      userErrors { field message }
    }
  }
`

const CART_NOTE_ATTRIBUTE = [
  { key: 'fulfillment', value: 'pickup-only' },
  { key: 'pickup_location', value: 'Student Center – Pecota' }
]

export const useShopifyCart = () => {
  const { enabled, shopifyFetch } = useShopify()
  const cartId = useState<string | null>('shopify-cart-id', () => null)
  const checkingOut = useState<boolean>('shopify-checkout-busy', () => false)

  const persistId = (id: string | null) => {
    cartId.value = id
    if (import.meta.client && id) {
      try { window.localStorage.setItem('swoopshop.shopify-cart-id', id) } catch { /* no-op */ }
    }
  }

  const restoreId = () => {
    if (!import.meta.client || cartId.value) return
    try { cartId.value = window.localStorage.getItem('swoopshop.shopify-cart-id') } catch { /* no-op */ }
  }

  interface CheckoutLine { variantId: string; qty: number }

  const toCartLines = (lines: CheckoutLine[]) =>
    lines.map(l => ({ merchandiseId: l.variantId, quantity: l.qty }))

  /**
   * Creates (or appends to) the Shopify cart and returns the hosted
   * checkout URL. Redirect the browser there — the customer selects
   * Local Pickup in Shopify checkout (the only delivery method when
   * shipping is disabled for the location).
   */
  const checkout = async (lines: CheckoutLine[]): Promise<string> => {
    if (!enabled.value) throw new Error('Shopify not configured')
    if (!lines.length) throw new Error('Cart is empty')
    checkingOut.value = true
    try {
      restoreId()
      const input = toCartLines(lines)

      if (!cartId.value) {
        const data = await shopifyFetch(CART_CREATE, {
          lines: input,
          attributes: CART_NOTE_ATTRIBUTE
        })
        const result = (data as any).cartCreate
        if (result.userErrors?.length) throw new Error(result.userErrors[0].message)
        persistId(result.cart.id)
        return result.cart.checkoutUrl as string
      }

      const data = await shopifyFetch(CART_LINES_ADD, {
        cartId: cartId.value,
        lines: input
      })
      const result = (data as any).cartLinesAdd
      if (result.userErrors?.length) throw new Error(result.userErrors[0].message)
      return result.cart.checkoutUrl as string
    } finally {
      checkingOut.value = false
    }
  }

  /** After a completed order, reset so the next order starts fresh. */
  const resetCart = () => {
    persistId(null)
    if (import.meta.client) {
      try { window.localStorage.removeItem('swoopshop.shopify-cart-id') } catch { /* no-op */ }
    }
  }

  return { enabled, checkout, resetCart, checkingOut: readonly(checkingOut) }
}
