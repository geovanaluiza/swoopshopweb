/* =============================================================
   useStickyHeader — toggles .is-stuck on the site header
   ============================================================= */
export const useStickyHeader = () => {
  if (!import.meta.client) return { attach: () => () => {} }

  const attach = (selector = '#siteHeader') => {
    const header = document.querySelector(selector)
    if (!header) return () => {}

    const onScroll = () => {
      if (window.scrollY > 8) header.classList.add('is-stuck')
      else header.classList.remove('is-stuck')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }

  return { attach }
}
