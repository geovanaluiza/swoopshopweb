<script setup lang="ts">
const show = ref(false)

onMounted(() => {
  const sentinel = document.querySelector('.hero') as HTMLElement | null
  if (!sentinel) return
  const obs = new IntersectionObserver(
    ([e]) => { show.value = !e.isIntersecting },
    { threshold: 0 }
  )
  obs.observe(sentinel)
  onUnmounted(() => obs.disconnect())
})
</script>

<template>
  <Transition name="sticky-slide">
    <a v-if="show" href="#request" class="sticky-cta" aria-label="Get my free info packet">
      Get My Free Info Packet
    </a>
  </Transition>
</template>

<style scoped>
.sticky-cta {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  display: block;
  text-align: center;
  padding: 16px;
  background: var(--bg-base);
  color: #fff;
  font-weight: 700;
  font-size: var(--font-size-2);
  letter-spacing: var(--letter-spacing-4);
  text-decoration: none;
  box-shadow: 0 -4px 24px rgba(0,0,0,.4);
  border-top: 1px solid var(--border-subtle);
}
.sticky-slide-enter-active,
.sticky-slide-leave-active { transition: transform .3s ease; }
.sticky-slide-enter-from,
.sticky-slide-leave-to { transform: translateY(100%); }
</style>
