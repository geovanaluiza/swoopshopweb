<script setup lang="ts">
const { featured } = useProducts()

useHead({
  title: 'SwoopShop · Official Northwest University Store',
  meta: [
    {
      name: 'description',
      content:
        'Official Northwest University apparel and headwear. Pickup only at Human R. Office — Barton 216.'
    }
  ]
})
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="hero">
      <div class="container container--hero hero-inner">
        <div>
          <span class="hero-eyebrow">
            <span class="topbar-dot" style="background: var(--nu-blue);" />
            Northwest University
          </span>
          <h1 class="hero-title">
            <span class="hero-line">Eagles gear up.</span><br />
            <span class="hero-italic">The whole flock does.</span>
          </h1>
          <p class="hero-lede">
            Official NU apparel and headwear. Pickup only at the Human R. Office,
            Barton Hall 216.
          </p>
          <div class="hero-actions">
            <a href="#shop" class="btn btn-primary">Shop now</a>
            <a href="#pickup" class="btn btn-ghost">Pickup hours →</a>
          </div>
          <div class="hero-pickup">
            <span class="hero-pickup-dot" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s7-7.6 7-13a7 7 0 0 0-14 0c0 5.4 7 13 7 13Z" stroke-linejoin="round" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </span>
            <div>
              <strong>Pickup only</strong>
              <span>Monday 10AM–2PM · Friday 11:15AM–2PM</span>
            </div>
          </div>
        </div>

        <div class="hero-visual" aria-hidden="true">
          <div class="hero-stack">
            <div class="hero-tile hero-tile-lg">
              <img src="/shop/WW_2025_Day1-2683.jpg" alt="" class="hero-photo" />
            </div>
            <div class="hero-tile-right">
              <div class="hero-tile hero-tile-sm">
                <img src="/shop/WW_2025_Day1-2660.jpg" alt="" class="hero-photo" />
              </div>
              <div class="hero-tile hero-tile-sm hero-tile-rotated">
                <img src="/shop/WW_2025_Day1-1121.jpg" alt="" class="hero-photo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MARQUEE -->
    <div class="marquee" aria-hidden="true">
      <div class="marquee-track">
        <span v-for="i in 2" :key="i" style="display: contents;">
          <span class="marquee-item"><span class="dot"></span>Official NU Store</span>
          <span class="marquee-item"><span class="dot"></span>Pickup only · Barton 216</span>
          <span class="marquee-item"><span class="dot"></span>Go Eagles</span>
        </span>
      </div>
    </div>

    <!-- TRUST -->
    <section class="trust">
      <div class="container trust-grid">
        <div class="trust-item"><strong>Pickup only</strong><span>Monday 10AM–2PM · Friday 11:15AM–2PM</span></div>
        <div class="trust-item"><strong>Human R. Office</strong><span>Barton Hall 216 · Kirkland, WA</span></div>
      </div>
    </section>

    <!-- FEATURED -->
    <section id="shop" class="section section--blue">
      <div class="container">
        <header class="section-head">
          <div>
            <p class="eyebrow">Just landed</p>
            <h2 class="section-title">New arrivals</h2>
          </div>
          <p class="section-sub">Official NU apparel and headwear. Pickup at Barton 216.</p>
        </header>

        <div class="product-grid">
          <ProductCard v-for="p in featured()" :key="p.id" :product="p" />
        </div>
      </div>
    </section>

    <!-- APPAREL -->
    <CategorySection
      id="apparel"
      class="section--yellow"
      category="apparel"
      title="Apparel"
      subtitle="Crewnecks, hoodies, and tees — officially licensed for Northwest University."
    />

    <!-- HEADWEAR -->
    <CategorySection
      id="headwear"
      class="section--blue"
      category="headwear"
      title="Headwear"
      subtitle="Caps and beanies embroidered with the official NU crest."
    />

    <!-- PICKUP INFO -->
    <section id="pickup" class="section section--yellow">
      <div class="container" style="text-align: center; padding: var(--space-9) 0;">
        <p class="eyebrow">Pickup</p>
        <h2 class="section-title" style="margin-bottom: var(--space-5);">Human R. Office — Barton 216</h2>
        <p style="font-size: var(--font-size-5); color: var(--nu-midnight); margin-bottom: var(--space-5);">
          <strong>Monday</strong> · 10:00 AM – 2:00 PM<br />
          <strong>Friday</strong> · 11:15 AM – 2:00 PM
        </p>
        <p style="font-size: var(--font-size-3); color: rgba(0,23,41,.7);">
          Questions? Email <a href="mailto:store@northwestu.edu" style="color: var(--nu-navy); font-weight: 700;">store@northwestu.edu</a>
        </p>
      </div>
    </section>
  </div>
</template>
