<script setup lang="ts">
const stats = [
  { n: 100, tone: '', label: 'Real internships in every program' },
  { n: 94,  tone: 'stat-number-evergreen', label: 'Employed or in grad school' },
  { n: 93,  tone: 'stat-number-gold', label: 'Felt prepared for their career' },
  { n: 90,  tone: 'stat-number-evergreen', label: 'Say their faith grew at NU' },
]

if (import.meta.client) {
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
    { threshold: 0.2 }
  )

  onMounted(() => {
    nextTick(() => {
      document.querySelectorAll('.counter').forEach((el) => io.observe(el))
    })
  })

  onUnmounted(() => io.disconnect())
}
</script>

<template>
  <section class="why" id="why">
    <div class="container">
      <header class="section-head reveal">
        <h2 class="section-title">Outcomes you can plan a life around.</h2>
      </header>

      <div class="stat-grid">
        <article v-for="s in stats" :key="s.label" class="stat-card reveal">
          <p class="stat-number" :class="s.tone">
            <span class="counter" :data-to="s.n">0</span>%
          </p>
          <h3 class="stat-label">{{ s.label }}</h3>
        </article>
      </div>
    </div>
  </section>
</template>
