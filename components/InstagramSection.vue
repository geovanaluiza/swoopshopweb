<script setup lang="ts">
onMounted(() => {
  if (window.__bhldScript) return
  window.__bhldScript = true
  const script = document.createElement('script')
  script.type = 'module'
  script.src = 'https://w.behold.so/widget.js'
  document.head.appendChild(script)
})
</script>

<template>
  <section class="insta" aria-label="Follow us on Instagram">
    <div class="container">
      <header class="section-head reveal">
        <p class="eyebrow">Follow @northwestu</p>
        <h2 class="section-title">Life at NU</h2>
      </header>
      <behold-widget feed-id="JpzT1siFSFKGIQTRi5Rt"></behold-widget>
    </div>
  </section>
</template>

<style scoped>
.insta {
  padding: clamp(80px, 10vw, 120px) 0;
  background: var(--nu-wisp);
  text-align: center;
}
.insta .section-head { margin-bottom: clamp(32px, 5vw, 48px); }

/* Behold widget overrides — match design system */
:deep(.behold-widget) {
  --bhld-grid-gap: 12px !important;
  --bhld-card-radius: 12px !important;
  --bhld-grid-cols: 2 !important;
}
:deep(.behold-grid) {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 12px !important;
}
@media (min-width: 640px) {
  :deep(.behold-grid) {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}
@media (min-width: 1024px) {
  :deep(.behold-grid) {
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 16px !important;
  }
}
:deep(.behold-card) {
  border-radius: 12px !important;
  overflow: hidden !important;
  aspect-ratio: 1 / 1 !important;
}
:deep(.behold-card img) {
  object-fit: cover !important;
  width: 100% !important;
  height: 100% !important;
}
</style>
