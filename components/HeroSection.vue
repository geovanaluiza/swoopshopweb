<script setup lang="ts">
import LeadForm from './LeadForm.vue'

const heroEl = ref<HTMLElement | null>(null)
const scrollY = ref(0)
const prefersReduced = ref(false)

onMounted(() => {
  prefersReduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced.value) return

  const onScroll = () => {
    if (!heroEl.value) return
    const rect = heroEl.value.getBoundingClientRect()
    if (rect.bottom < 0 || rect.top > window.innerHeight) return
    scrollY.value = window.scrollY
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>

<template>
  <section class="hero" ref="heroEl">
    <div class="hero-parallax" aria-hidden="true">
      <img
        src="/snow-lake.jpg"
        alt=""
        loading="eager"
        fetchpriority="high"
        class="hero-bg"
        :style="prefersReduced ? '' : `transform: translateY(${scrollY * 0.35}px)`"
      />
      <div class="hero-scrim"></div>
    </div>

    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow eyebrow-light reveal-hero">Kirkland, WA</p>

        <h1 class="display" aria-label="Find Your Faith. Follow Your Future.">
          <span class="reveal-line">
            <span class="reveal-word">Find</span>
            <span class="reveal-word">Your</span>
            <span class="reveal-word">Faith.</span>
          </span>
          <span class="reveal-line serif-italic">
            <span class="reveal-word">Follow</span>
            <span class="reveal-word">Your</span>
            <span class="reveal-word">Future.</span>
          </span>
        </h1>

        <p class="lede reveal-hero">
          56 wooded acres, ten minutes from Seattle.
        </p>

        <ul class="hero-points reveal-hero" role="list">
          <li>
            <span class="bullet" aria-hidden="true"></span>
            <span>100% of programs include real internships</span>
          </li>
          <li>
            <span class="bullet" aria-hidden="true"></span>
            <span>94% of grads employed or in grad school within 6 months</span>
          </li>
        </ul>
      </div>

      <LeadForm />
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  padding: clamp(100px, 12vw, 140px) 0 clamp(80px, 10vw, 100px);
  background: var(--bg-base);
  isolation: isolate;
  display: flex;
  align-items: center;
}

.hero-parallax {
  position: absolute;
  inset: -20% 0;
  z-index: -1;
}
.hero-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  will-change: transform;
  transition: transform 0ms linear;
}
.hero-scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(160deg, rgba(0,23,41,.88) 0%, rgba(0,23,41,.55) 50%, rgba(0,23,41,.75) 100%),
    linear-gradient(to bottom, rgba(0,23,41,.3) 0%, transparent 30%);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(40px, 6vw, 72px);
  align-items: center;
  position: relative;
  z-index: 1;
}
@media (min-width: 900px) {
  .hero-grid { grid-template-columns: 1.15fr 1fr; gap: clamp(60px, 8vw, 100px); }
}

/* Headline word-by-word assembly */
.reveal-line {
  display: block;
}
.reveal-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(30px);
  animation: word-in 0.55s cubic-bezier(.22,1,.36,1) forwards;
  will-change: transform, opacity;
}
.reveal-line:nth-child(2) .reveal-word { animation-delay: 0.45s; }
.reveal-word:nth-child(1) { animation-delay: 0.15s; }
.reveal-word:nth-child(2) { animation-delay: 0.28s; }
.reveal-word:nth-child(3) { animation-delay: 0.41s; }
.reveal-line:nth-child(2) .reveal-word:nth-child(1) { animation-delay: 0.55s; }
.reveal-line:nth-child(2) .reveal-word:nth-child(2) { animation-delay: 0.68s; }
.reveal-line:nth-child(2) .reveal-word:nth-child(3) { animation-delay: 0.81s; }

@keyframes word-in {
  to { opacity: 1; transform: translateY(0); }
}

.display {
  font-family: var(--font-family-serif);
  font-weight: 700;
  font-size: clamp(2.4rem, 6vw, 4.8rem);
  letter-spacing: var(--letter-spacing-3);
  line-height: 1.0;
  color: #fff;
  margin-bottom: 20px;
  text-shadow: 0 4px 32px rgba(0,23,41,.5);
}
.serif-italic { font-style: italic; font-weight: 400; color: var(--accent-gold); }
.serif-italic .reveal-word { color: var(--accent-gold); text-shadow: 0 0 40px rgba(251,217,69,.35); }

.eyebrow {
  font-size: var(--font-size-1);
  letter-spacing: var(--letter-spacing-8);
  text-transform: uppercase;
  color: var(--accent-gold);
  font-weight: 700;
  margin-bottom: 14px;
}
.eyebrow-light { color: rgba(251,217,69,.7); }

.lede {
  font-size: clamp(1.1rem, 1.5vw, 1.35rem);
  color: rgba(255,255,255,.88);
  line-height: var(--line-height-4);
  max-width: 36ch;
  margin-bottom: 24px;
  text-shadow: 0 1px 16px rgba(0,23,41,.4);
}

.hero-points {
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: rgba(255,255,255,.92);
  font-size: var(--font-size-2);
  font-weight: 500;
  list-style: none;
  padding: 0;
  margin: 0;
}
.hero-points li {
  display: flex;
  align-items: center;
  gap: 12px;
}
.hero-points span { text-shadow: 0 1px 12px rgba(0,23,41,.4); }
.bullet {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-gold);
  box-shadow: 0 0 0 4px rgba(251,217,69,.2);
  flex: none;
}

/* Staggered reveals on scroll */
.reveal-hero {
  opacity: 0;
  transform: translateY(20px);
}
.reveal-hero.is-visible {
  animation: fade-up 0.6s cubic-bezier(.22,1,.36,1) forwards;
}
.eyebrow.reveal-hero { animation-delay: 0.1s; }
.lede.reveal-hero { animation-delay: 0.25s; }
.hero-points.reveal-hero { animation-delay: 0.38s; }

@keyframes fade-up {
  to { opacity: 1; transform: translateY(0); }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .reveal-word {
    opacity: 1;
    transform: none;
    animation: none;
  }
  .reveal-hero {
    opacity: 1;
    transform: none;
    animation: none;
  }
  .hero-bg { transform: none !important; }
}
</style>
