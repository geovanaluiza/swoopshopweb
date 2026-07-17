<script setup lang="ts">
import { useReveal } from '~/composables/useReveal'

const { observe: observeReveal } = useReveal()

onMounted(() => {
  nextTick(() => {
    observeReveal()
  })
})

const onRecommendation = (program: string) => {
  const form = document.getElementById('leadForm') as HTMLFormElement | null
  if (!form) return
  const programEl = form.querySelector<HTMLSelectElement>('#program')
  if (programEl) programEl.value = program
}
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
      <QuizFindYourFit @recommendation="onRecommendation" />
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
