<script setup lang="ts">
const collections = [
  { name: 'Pilchuck Premium', tagline: 'Heritage pieces · 12 piece drop', img: 'https://placehold.co/800x600/04505c/ffffff?text=Pilchuck+Premium' },
  { name: 'Eagles Essentials', tagline: 'Everyday staples · wardrobe basics', img: 'https://placehold.co/800x600/0068bb/ffffff?text=Eagles+Essentials' },
  { name: 'Swoop Campus', tagline: 'Wear it · carry it · live it', img: 'https://placehold.co/800x600/00263d/ffffff?text=Swoop+Campus' },
  { name: 'Game Day', tagline: 'Bleacher-tested gear', img: 'https://placehold.co/800x600/034C87/ffffff?text=Game+Day' }
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
        <a v-for="c in collections" :key="c.name" href="/#apparel" class="collection" :aria-label="c.name">
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
