<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const { count } = useCart()
const scrolled = ref(false)
const mobileNav = ref(false)
const searchOpen = ref(false)
const search = ref('')

const onScroll = () => {
  scrolled.value = window.scrollY > 8
}
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const navLinks = [
  { label: 'Apparel', href: '/#apparel' },
  { label: 'Headwear', href: '/#headwear' },
  { label: 'Accessories', href: '/#accessories' },
  { label: 'Pickup & Hours', href: '/#pickup' },
  { label: 'Collections', href: '/#collections' }
]
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled }">
    <div class="topbar">
      <div class="container topbar-inner">
        <span class="topbar-dot" aria-hidden="true" />
        <span><strong>Pickup only</strong> · Merdian Building · Mon–Fri 9–5</span>
        <a href="/#pickup">See pickup details</a>
      </div>
    </div>

    <div class="container site-header-inner">
      <NuxtLink to="/" class="brand" aria-label="SwoopShop home">
        <span class="brand-mark" aria-hidden="true">SW</span>
        <span class="brand-text">
          <span class="brand-name">SwoopShop</span>
          <span class="brand-sub">Northwest University</span>
        </span>
      </NuxtLink>

      <nav class="site-nav" aria-label="Primary">
        <a v-for="link in navLinks" :key="link.label" :href="link.href">{{ link.label }}</a>
      </nav>

      <div class="header-tools">
        <form class="search" role="search" @submit.prevent>
          <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" stroke-linecap="round" />
          </svg>
          <input v-model="search" type="search" placeholder="Search apparel, headwear…" aria-label="Search products" />
        </form>

        <button class="icon-btn" aria-label="Search" @click="searchOpen = !searchOpen">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" stroke-linecap="round" />
          </svg>
        </button>

        <NuxtLink to="/cart" class="cart-btn" aria-label="Open cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 4h2l2.4 12.3a2 2 0 0 0 2 1.7h8.2a2 2 0 0 0 2-1.6L21 8H6" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="10" cy="21" r="1.4" />
            <circle cx="18" cy="21" r="1.4" />
          </svg>
          <span v-if="count > 0" class="cart-count">{{ count }}</span>
        </NuxtLink>

        <button class="icon-btn mobile-only" aria-label="Toggle menu" @click="mobileNav = !mobileNav">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18M3 12h18M3 18h18" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="mobileNav" class="mobile-nav">
      <a v-for="link in navLinks" :key="link.label" :href="link.href" @click="mobileNav = false">{{ link.label }}</a>
    </div>
  </header>
</template>

<style scoped>
.mobile-only { display: grid; }
@media (min-width: 1120px) { .mobile-only { display: none; } }

@media (max-width: 639px) {
  .site-header-inner {
    grid-template-columns: auto 1fr auto;
  }
  .search { display: none; }
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: var(--size-3) var(--gutter) var(--size-5);
  background: #fff;
  border-top: 1px solid var(--line-faint);
}
.mobile-nav a {
  padding: 12px 0;
  border-bottom: 1px solid var(--line-faint);
  font-weight: 700;
  color: var(--nu-midnight);
  font-size: var(--font-size-3);
}
.mobile-nav a:last-child { border-bottom: 0; }
</style>
