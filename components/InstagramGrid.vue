<script setup lang="ts">
const tiles = [
  { src: 'https://placehold.co/400x500/00263d/fff?text=Eagles',   label: '#Eagles' },
  { src: 'https://placehold.co/400x500/0068bb/fff?text=Swoop',     label: '#Swoop' },
  { src: 'https://placehold.co/400x500/04505c/fff?text=Pilchuck',  label: '#Pilchuck' },
  { src: 'https://placehold.co/400x500/034C87/fff?text=Kirkland',  label: '#Kirkland' },
  { src: 'https://placehold.co/400x500/85754e/fff?text=NWU',       label: '#NWU' },
  { src: 'https://placehold.co/400x500/44ba82/fff?text=GoEagles',  label: '#GoEagles' }
]
</script>

<template>
  <section class="section">
    <div class="container">
      <header class="section-head">
        <div>
          <p class="eyebrow">From the @swoopshop feed</p>
          <h2 class="section-title">Eagles wear SwoopShop</h2>
        </div>
        <a class="link-arrow" href="https://instagram.com">Follow @swoopshop</a>
      </header>

      <div class="collections">
        <a v-for="tile in tiles" :key="tile.label" href="https://instagram.com" class="collection" :aria-label="tile.label" style="aspect-ratio: 1 / 1;">
          <img :src="tile.src" :alt="tile.label" loading="lazy" />
          <div class="collection-overlay">
            <h3>{{ tile.label }}</h3>
            <span>View on Instagram</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
