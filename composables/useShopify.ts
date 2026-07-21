/* =============================================================
   Shopify Storefront API client (GraphQL)
   Requires env:
     NUXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
     NUXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=shpat_xxxxx (public token)
   ============================================================= */

const API_VERSION = '2025-01'

export const useShopify = () => {
  const config = useRuntimeConfig()
  const domain = (config.public.shopifyDomain as string) || ''
  const token = (config.public.shopifyStorefrontToken as string) || ''

  const enabled = computed(() => Boolean(domain && token))

  const shopifyFetch = async <T = any>(
    query: string,
    variables: Record<string, any> = {}
  ): Promise<T> => {
    if (!domain || !token) throw new Error('Shopify not configured')
    const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token
      },
      body: JSON.stringify({ query, variables })
    })
    if (!res.ok) throw new Error(`Shopify API error: ${res.status}`)
    const json = await res.json()
    if (json.errors?.length) throw new Error(json.errors.map((e: any) => e.message).join(', '))
    return json.data as T
  }

  return { enabled, shopifyFetch, domain }
}
