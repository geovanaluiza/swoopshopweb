/* =============================================================
   useCountUp — animates a number to a target value once visible
   ============================================================= */
export const useCountUp = () => {
  if (!import.meta.client) return { observe: () => {} }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        const to = parseInt(el.dataset.to || '0', 10)
        const dur = 1400
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur)
          const v = Math.round(to * (1 - Math.pow(1 - t, 3)))
          el.textContent = String(v)
          if (t < 1) requestAnimationFrame(tick)
          else el.textContent = String(to)
        }
        requestAnimationFrame(tick)
        io.unobserve(el)
      }
    },
    { threshold: 0.4 }
  )

  const observe = (root: ParentNode = document) => {
    root.querySelectorAll('.counter').forEach((el) => io.observe(el))
  }

  return { observe }
}
