/* =============================================================
   useReveal — IntersectionObserver wrapper, Vue 3
   Adds `.is-in` to elements with `.reveal` once they enter the
   viewport. Auto-disconnects after firing once per element.
   ============================================================= */
export const useReveal = () => {
  if (!import.meta.client) return { observe: () => {}, disconnect: () => {} }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  )

  const observe = (root: ParentNode = document) => {
    root.querySelectorAll('.reveal:not(.is-in)').forEach((el) => io.observe(el))
  }

  return { observe, disconnect: () => io.disconnect() }
}
