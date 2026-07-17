/* =============================================================
   useReveal — IntersectionObserver wrapper, Vue 3
   Adds `.is-in` to elements with `.reveal` once they enter the
   viewport. Adds `.is-visible` to `.reveal-hero` elements.
   Auto-disconnects after firing once per element.
   ============================================================= */
export const useReveal = () => {
  if (!import.meta.client) return { observe: () => {}, disconnect: () => {} }

  const revealObs = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          revealObs.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  )

  const heroObs = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          heroObs.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -20px 0px' }
  )

  const observe = (root: ParentNode = document) => {
    root.querySelectorAll('.reveal:not(.is-in)').forEach((el) => revealObs.observe(el))
    root.querySelectorAll('.reveal-hero:not(.is-visible)').forEach((el) => heroObs.observe(el))
  }

  return {
    observe,
    disconnect: () => { revealObs.disconnect(); heroObs.disconnect() }
  }
}
