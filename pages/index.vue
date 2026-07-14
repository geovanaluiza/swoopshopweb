<script setup lang="ts">
import { useReveal } from '~/composables/useReveal'
import { useCountUp } from '~/composables/useCountUp'

const { observe: observeReveal } = useReveal()
const { observe: observeCount } = useCountUp()

onMounted(() => {
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
      <MiniCta ctaLabel="Want a quick overview? Get the free info packet." />
      <WhySection />
      <BigPhotoSection />
      <ScholarshipExplorer />
      <LifeSection />
      <StoriesSection />
      <MiniCta ctaLabel="Have questions? We'll reply within 1 business day." />
      <FinalCta />
    </main>
    <SiteFooter />
    <StickyMobileCta />
  </div>
</template>
