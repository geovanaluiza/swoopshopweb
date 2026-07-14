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
        <img class="brand-mark" src="/nu-shield.png" alt="" />
        <div>
          <strong>Northwest University</strong>
          <p>5520 108th Ave NE, Kirkland, WA 98033</p>
        </div>
      </div>
      <nav class="foot-nav" aria-label="Footer">
        <a href="https://www.northwestu.edu/admissions" target="_blank" rel="noopener">Admissions</a>
        <a href="https://www.northwestu.edu/financial-aid" target="_blank" rel="noopener">Financial Aid</a>
        <a href="https://nueagles.com" target="_blank" rel="noopener">Athletics</a>
        <a href="https://www.northwestu.edu/about/locations" target="_blank" rel="noopener">Campus Map</a>
        <a href="https://www.northwestu.edu/privacy" target="_blank" rel="noopener">Privacy</a>
        <!-- TODO: confirm correct Title IX page URL before publishing -->
        <a href="https://www.northwestu.edu/about/consumer-information" target="_blank" rel="noopener">Title IX</a>
      </nav>
      <div class="foot-social" aria-label="Social media">
        <a href="https://www.instagram.com/northwestu" target="_blank" rel="noopener" aria-label="Instagram">IG</a>
        <a href="https://www.facebook.com/northwestu" target="_blank" rel="noopener" aria-label="Facebook">FB</a>
        <a href="https://www.youtube.com/northwestuniversity" target="_blank" rel="noopener" aria-label="YouTube">YT</a>
      </div>
    </div>
    <p class="foot-legal">© {{ year }} Northwest University. All rights reserved.</p>
  </footer>

</template>
