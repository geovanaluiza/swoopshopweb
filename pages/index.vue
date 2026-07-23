<script setup lang="ts">
const { featured } = useProducts()

useHead({
  title: 'SwoopShop · Official Northwest University Store',
  meta: [
    {
      name: 'description',
      content: 'Official Northwest University apparel, headwear, and accessories. Pickup only on campus at the Student Center – Pecota.'
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
            Fall drop · 2026
          </span>
          <h1 class="hero-title">
            <span class="hero-line">Eagles gear up.</span><br />
            <span class="hero-italic">The whole flock does.</span>
          </h1>
          <p class="hero-lede">
            Official NU apparel and headwear — pickup only, right here at the
            Student Center – Pecota. New drops every month.
          </p>
          <div class="hero-actions">
            <a href="#shop" class="btn btn-primary">Shop the new drop</a>
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
              <span>Student Center – Pecota · Mon–Fri 9–5</span>
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
          <span class="marquee-item"><span class="dot"></span>Pickup only · Student Center – Pecota</span>
          <span class="marquee-item"><span class="dot"></span>New drops every month</span>
          <span class="marquee-item"><span class="dot"></span>Fall 2026 collection</span>
          <span class="marquee-item"><span class="dot"></span>Ready in 1 hour</span>
          <span class="marquee-item"><span class="dot"></span>Go Eagles</span>
        </span>
      </div>
    </div>

    <!-- TRUST -->
    <section class="trust">
      <div class="container trust-grid">
        <div class="trust-item"><strong>Pickup only</strong><span>On campus · Student Center – Pecota</span></div>
        <div class="trust-item"><strong>Ready in 1h</strong><span>During pickup windows</span></div>
        <div class="trust-item"><strong>Officially licensed</strong><span>All Northwest University</span></div>
        <div class="trust-item"><strong>30-day returns</strong><span>Bring it back, no questions</span></div>
      </div>
    </section>

    <!-- FEATURED -->
    <section id="shop" class="section">
      <div class="container">
        <header class="section-head">
          <div>
            <p class="eyebrow">Just landed</p>
            <h2 class="section-title">This week's restocks</h2>
          </div>
          <p class="section-sub">Pieces back on the shelf after selling out the first time. Pickup while they last.</p>
        </header>

        <div class="product-grid">
          <ProductCard v-for="p in featured()" :key="p.id" :product="p" />
        </div>
      </div>
    </section>

    <CollectionsGrid />

    <!-- APPAREL -->
    <CategorySection
      id="apparel"
      category="apparel"
      title="Apparel"
      subtitle="Crewnecks, hoodies, tees — every piece is tested on campus before it gets here."
    />

    <!-- HEADWEAR -->
    <CategorySection
      id="headwear"
      category="headwear"
      title="Headwear"
      subtitle="Caps and beanies embroidered with the official NU crest."
    />

    <PickupBanner />

    <NewsletterBand />

    <InstagramGrid />
  </div>
</template>
