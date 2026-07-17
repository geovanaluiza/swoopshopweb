/* =============================================================
   useMicroInteractions — magnetic buttons, custom cursor, 3D tilt
   Pure CSS + vanilla JS, no external libraries.
   Automatically disables on touch devices and when
   prefers-reduced-motion is active.
   ============================================================= */
export const useMicroInteractions = () => {
  if (!import.meta.client) return { init: () => {} }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isTouch = window.matchMedia('(pointer: coarse)').matches

  let cursorEl: HTMLElement | null = null
  let raf = 0

  const init = () => {
    if (prefersReduced || isTouch) return
    initCursor()
    initMagnetic()
    initTilt()
  }

  /* ---- Custom cursor ---- */
  const initCursor = () => {
    cursorEl = document.createElement('div')
    cursorEl.setAttribute('aria-hidden', 'true')
    cursorEl.className = 'custom-cursor'
    document.body.appendChild(cursorEl)

    document.querySelectorAll('button, a, [role="button"], .quiz-opt').forEach((el) => {
      el.addEventListener('mouseenter', () => cursorEl?.classList.add('is-hover'))
      el.addEventListener('mouseleave', () => cursorEl?.classList.remove('is-hover'))
    })

    document.addEventListener('mousemove', (e) => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (!cursorEl) return
        cursorEl.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      })
    }, { passive: true })
  }

  /* ---- Magnetic buttons ---- */
  const initMagnetic = () => {
    document.querySelectorAll<HTMLElement>('.btn').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        if (prefersReduced) return
        const rect = btn.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (e.clientX - cx) / (rect.width / 2)
        const dy = (e.clientY - cy) / (rect.height / 2)
        btn.style.transform = `translate(${dx * 4}px, ${dy * 4}px)`
      })
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = ''
      })
    })
  }

  /* ---- 3D tilt on cards ---- */
  const initTilt = () => {
    document.querySelectorAll<HTMLElement>('.tilt-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        if (prefersReduced) return
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        card.style.transform = `
          perspective(800px)
          rotateX(${y * -6}deg)
          rotateY(${x * 6}deg)
          scale(1.02)
        `
      })
      card.addEventListener('mouseleave', () => {
        card.style.transform = ''
      })
    })
  }

  onUnmounted(() => {
    if (raf) cancelAnimationFrame(raf)
    cursorEl?.remove()
  })

  return { init }
}
