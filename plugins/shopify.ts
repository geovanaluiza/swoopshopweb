/* Preloads Shopify products (when configured) so the catalog
   is available before components render. Local catalog is the
   fallback when Shopify env vars are missing. */
export default defineNuxtPlugin(async () => {
  const { fetchProducts } = useShopifyProducts()
  await fetchProducts()
})
