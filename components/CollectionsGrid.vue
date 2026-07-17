<script setup lang="ts">
const collections = [
  {
    name: 'Pilchuck Premium',
    tagline: 'Heritage pieces · hoodie, crew & outerwear',
    img: '/shop/Cotton-Collective-Heavy-Crew-Bering-Sea.jpg',
    href: '#apparel'
  },
  {
    name: 'Eagles Essentials',
    tagline: 'Everyday staples · tees, crews & layering',
    img: '/shop/Hanes-SS-NU-Seal-Tee-Navy.jpg',
    href: '#apparel'
  },
  {
    name: 'Game Day',
    tagline: 'Bleacher-tested · performance & truckers',
    img: '/shop/Augusta-Perf-SS-Tee-Navy.jpg',
    href: '#headwear'
  },
  {
    name: 'Alumni',
    tagline: 'Once an Eagle, always an Eagle',
    img: '/shop/Legacy-Twill-Eagles-Stone-Navy.jpg',
    href: '#headwear'
  }
]
</script>

<template>
  <section id="collections" class="section">
    <div class="container">
      <header class="section-head">
        <div>
          <p class="eyebrow">Curated drops</p>
          <h2 class="section-title">Shop by collection</h2>
        </div>
        <p class="section-sub">Four themed capsules, all officially licensed by Northwest University. Pickup only on campus.</p>
      </header>

      <div class="collections">
        <a
          v-for="c in collections"
          :key="c.name"
          :href="c.href"
          class="collection"
          :aria-label="c.name"
        >
          <img :src="c.img" :alt="c.name" loading="lazy" />
          <div class="collection-overlay">
            <h3>{{ c.name }}</h3>
            <span>{{ c.tagline }}</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
