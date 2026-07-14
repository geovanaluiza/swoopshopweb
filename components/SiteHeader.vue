<script setup lang="ts">
const { attach } = useStickyHeader()
const route = useRoute()

onMounted(() => {
  attach('#siteHeader')
})

// Smooth-scroll with sticky-header offset
const onNavClick = (e: MouseEvent, id: string) => {
  const el = document.querySelector(id)
  if (!el) return
  e.preventDefault()
  const top = el.getBoundingClientRect().top + window.scrollY - 70
  window.scrollTo({ top, behavior: 'smooth' })
}
</script>

<template>
  <header id="siteHeader" class="site-header">
    <div class="container header-inner">
      <NuxtLink to="/" class="brand" aria-label="Northwest University home">
        <span class="brand-mark" aria-hidden="true">NU</span>
        <span class="brand-name">Northwest University</span>
      </NuxtLink>
      <nav class="primary-nav" aria-label="Primary">
        <a href="#programs" @click="(e) => onNavClick(e, '#programs')">Programs</a>
        <a href="#why" @click="(e) => onNavClick(e, '#why')">Why NU</a>
        <a href="#life" @click="(e) => onNavClick(e, '#life')">Campus Life</a>
        <a href="#stories" @click="(e) => onNavClick(e, '#stories')">Stories</a>
      </nav>
      <a href="#request" class="btn btn-gold btn-sm header-cta" @click="(e) => onNavClick(e, '#request')">
        Request Info
      </a>
    </div>
  </header>
</template>
