<script setup lang="ts">
const items = [
  { mark: 'U.S. News',     cls: 'trust-blue', text: 'Best Regional Universities' },
  { mark: 'U.S. News',     cls: 'trust-blue', text: 'Top 10 Best Value Schools' },
  { mark: 'Niche',         cls: 'trust-ink',  text: 'Rated 3.9 / 5 · #10 in Washington' },
  { mark: 'Seattle Times', cls: 'trust-tour', text: "People's Choice — Best Colleges (Gold)" },
]
</script>

<template>
  <section class="trust-bar" aria-label="Recognitions">
    <div class="container trust-grid">
      <div v-for="(it, i) in items" :key="i" class="trust-item">
        <div class="trust-mark" :class="it.cls" aria-hidden="true">{{ it.mark }}</div>
        <p>{{ it.text }}</p>
      </div>
    </div>
  </section>
</template>
