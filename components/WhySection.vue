<script setup lang="ts">
const stats = [
  {
    n: 100, tone: '', label: 'Real internships in every program',
    desc: 'Not optional. Not "encouraged." Built into the curriculum from day one.',
    icon: 'list',
  },
  {
    n: 94, tone: 'stat-icon-evergreen stat-number-evergreen', label: 'Employed or in grad school',
    desc: 'Within six months of graduation. Real outcomes, tracked and reported.',
    icon: 'check',
  },
  {
    n: 93, tone: 'stat-icon-gold stat-number-gold', label: 'Felt prepared for their career',
    desc: "Because you've already done the work before you graduate.",
    icon: 'clock',
  },
  {
    n: 90, tone: 'stat-icon-leaf stat-number-evergreen', label: 'Say their faith grew at NU',
    desc: 'Chapel, mentors, and a community that takes belief seriously — not performatively.',
    icon: 'heart',
  },
]
</script>

<template>
  <section class="why" id="why">
    <div class="container">
      <header class="section-head reveal">
        <p class="eyebrow">Why Northwest</p>
        <h2 class="section-title">Outcomes you can plan a life around.</h2>
        <p class="section-sub">
          Faith formation isn't separate from career prep here — they're built into the same four years.
        </p>
      </header>

      <div class="stat-grid">
        <article v-for="s in stats" :key="s.label" class="stat-card reveal">
          <div class="stat-icon" :class="s.tone" aria-hidden="true">
            <svg v-if="s.icon === 'list'" viewBox="0 0 24 24" fill="none">
              <path d="M3 7h18M3 12h18M3 17h12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            <svg v-else-if="s.icon === 'check'" viewBox="0 0 24 24" fill="none">
              <path d="M4 13l4 4L20 5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg v-else-if="s.icon === 'clock'" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" />
              <path d="M12 7v5l3 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none">
              <path d="M12 21s-7-4.5-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.5-7 10-7 10z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
            </svg>
          </div>
          <p class="stat-number" :class="s.tone"><span class="counter" :data-to="s.n">0</span>%</p>
          <h3 class="stat-label">{{ s.label }}</h3>
          <p class="stat-desc">{{ s.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
