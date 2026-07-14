<script setup lang="ts">
const year = new Date().getFullYear()
const onNavClick = (e: MouseEvent, id: string) => {
  const el = document.querySelector(id)
  if (!el) return
  e.preventDefault()
  const top = el.getBoundingClientRect().top + window.scrollY - 70
  window.scrollTo({ top, behavior: 'smooth' })
}
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="foot-brand">
        <span class="brand-mark" aria-hidden="true">NU</span>
        <div>
          <strong>Northwest University</strong>
          <p>5520 108th Ave NE, Kirkland, WA 98033</p>
        </div>
      </div>
      <nav class="foot-nav" aria-label="Footer">
        <a href="#">Admissions</a>
        <a href="#">Financial Aid</a>
        <a href="#">Athletics</a>
        <a href="#">Campus Map</a>
        <a href="#">Privacy</a>
        <a href="#">Title IX</a>
      </nav>
      <div class="foot-social" aria-label="Social media">
        <a href="#" aria-label="Instagram">IG</a>
        <a href="#" aria-label="Facebook">FB</a>
        <a href="#" aria-label="YouTube">YT</a>
      </div>
    </div>
    <p class="foot-legal">© {{ year }} Northwest University. All rights reserved.</p>
  </footer>

  <a href="#request" class="mobile-sticky" aria-label="Request info" @click="(e) => onNavClick(e, '#request')">
    Request Info
  </a>
</template>
