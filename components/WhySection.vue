<script setup lang="ts">
const stats = [
  { n: 100, tone: '', label: 'Real internships in every program' },
  { n: 94,  tone: 'stat-number-evergreen', label: 'Employed or in grad school' },
  { n: 93,  tone: 'stat-number-gold', label: 'Felt prepared for their career' },
  { n: 90,  tone: 'stat-number-evergreen', label: 'Say their faith grew at NU' },
]
</script>

<template>
  <section class="why" id="why">
    <div class="container">
      <header class="section-head reveal">
        <h2 class="section-title">Outcomes you can plan a life around.</h2>
      </header>

      <div class="stat-grid">
        <article v-for="s in stats" :key="s.label" class="stat-card reveal">
          <p class="stat-number" :class="s.tone"><span class="counter" :data-to="s.n">0</span>%</p>
          <h3 class="stat-label">{{ s.label }}</h3>
        </article>
      </div>
    </div>
  </section>
</template>
