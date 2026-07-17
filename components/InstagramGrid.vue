<script setup lang="ts">
const tiles = [
  { src: '/shop/Hanes-Hoodie-NU-Royal.jpg',   label: '@swoopshop' },
  { src: '/shop/Knit-Beanie-Navy.jpg',         label: '#Eagles' },
  { src: '/shop/Cotton-Collective-Crew-Camo.jpg', label: '#Pilchuck' },
  { src: '/shop/Legacy-Twill-Eagles-Stone-Navy.jpg', label: '#NWU' },
  { src: '/shop/New-Era-Pom-Beanie-Navy.jpg',  label: '#Swoop' },
  { src: '/shop/Made-Crew-NU-Eagle-Grey.jpg',  label: '#GoEagles' }
]
</script>

<template>
  <section class="section">
    <div class="container">
      <header class="section-head">
        <div>
          <p class="eyebrow">From the feed</p>
          <h2 class="section-title">Eagles wear SwoopShop</h2>
        </div>
        <a class="link-arrow" href="https://instagram.com">Follow @swoopshop</a>
      </header>

      <div class="collections">
        <a
          v-for="tile in tiles"
          :key="tile.label"
          href="https://instagram.com"
          class="collection"
          :aria-label="tile.label"
          style="aspect-ratio: 1 / 1;"
        >
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
