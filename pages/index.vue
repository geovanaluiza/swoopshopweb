<script setup lang="ts">
import { useReveal } from '~/composables/useReveal'
import { useCountUp } from '~/composables/useCountUp'

const { observe: observeReveal } = useReveal()
const { observe: observeCount } = useCountUp()

onMounted(() => {
  // Wait one tick so all child components have mounted and
  // their `reveal` / `counter` nodes exist in the DOM.
  nextTick(() => {
    observeReveal()
    observeCount()
  })
})
</script>

<template>
  <div>
    <SiteHeader />
    <main>
      <HeroSection />
      <TrustBar />
      <WhySection />
      <BigPhotoSection />
      <LifeSection />
      <StoriesSection />
      <FinalCta />
    </main>
    <SiteFooter />
  </div>
</template>
