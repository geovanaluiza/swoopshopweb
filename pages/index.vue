<script setup lang="ts">
import { useReveal } from '~/composables/useReveal'

const { observe: observeReveal } = useReveal()

onMounted(() => {
  nextTick(() => {
    observeReveal()
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
      <InstagramSection />
      <StoriesSection />
      <MiniCta ctaLabel="Have questions? We'll reply within 1 business day." />
      <FinalCta />
    </main>
    <SiteFooter />
    <StickyMobileCta />
    <ExitIntentPopup />
  </div>
</template>
