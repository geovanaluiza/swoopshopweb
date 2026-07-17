<script setup lang="ts">
import LightboxModal from './LightboxModal.vue'

const GALLERY = [
  { src: '/worship-1.jpg',  alt: 'Students worshipping with hands raised',     caption: 'Worship night' },
  { src: '/worship-2.jpg',  alt: 'Chapel service with student body',            caption: 'Weekly chapel' },
  { src: '/worship-3.jpg',  alt: 'Student singing during worship service',      caption: 'Student worship band' },
  { src: '/worship-4.jpg',  alt: 'Students gathering for worship',             caption: 'Worship gathering' },
  { src: '/worship-5.jpg',  alt: 'Worship night in the chapel',                caption: 'Evening worship' },
  { src: '/worship-6.jpg',  alt: 'Student leading worship',                    caption: 'Leading in worship' },
  { src: '/forest-1.jpg',   alt: 'Student on a mossy log in the campus forest', caption: 'Trails behind campus' },
  { src: '/student-1.jpg',  alt: 'First day of class at NU',                   caption: 'First day of class' },
  { src: '/student-2.jpg',  alt: 'Student on first day',                       caption: 'Ready to learn' },
  { src: '/student-3.jpg',  alt: 'Students at orientation',                  caption: 'New student orientation' },
  { src: '/student-4.jpg',  alt: 'Student smiling on campus',                 caption: 'Studying between classes' },
  { src: '/chapel-1.jpg',   alt: 'Chapel building at sunset',                  caption: 'The chapel at sunset' },
  { src: '/chapel-2.jpg',   alt: 'Inside the chapel',                        caption: 'Inside the chapel' },
  { src: '/life-1.jpg',     alt: 'Church fair on campus',                     caption: 'Church fair' },
  { src: '/life-2.jpg',     alt: 'You Belong Fair on campus',                caption: 'You Belong Fair' },
  { src: '/life-3.jpg',     alt: 'Student leadership fair',                   caption: 'Student Leadership Fair' },
  { src: '/campus-1.jpg',   alt: 'Aerial view of campus in autumn',          caption: 'Campus in autumn' },
  { src: '/campus-2.jpg',   alt: 'Campus buildings and green space',          caption: 'NU campus' },
  { src: '/sports-1.jpg',   alt: 'Eagles student athletes',                  caption: 'NU Eagles athletics' },
  { src: '/sports-2.jpg',   alt: 'Game day at NU',                           caption: 'Game day' },
  { src: '/sports-3.jpg',   alt: 'Athletic facilities',                       caption: 'Athletic facilities' },
  { src: '/sports-4.jpg',   alt: 'Intramural sports',                       caption: 'Intramural sports' },
  { src: '/sports-5.jpg',   alt: 'Student athletes',                         caption: 'Student athletes' },
  { src: '/sports-6.jpg',   alt: 'Athletics at NU',                          caption: 'Eagles compete' },
]

// Bento grid: one large photo left, two stacked right
const BENTO = [
  { src: '/worship-1.jpg',  alt: 'Students worshipping with hands raised during chapel',  caption: 'Worship night',           size: 'large' },
  { src: '/forest-1.jpg',   alt: 'Student on a mossy log deep in the campus forest',   caption: 'Trails behind campus',    size: 'small' },
  { src: '/student-4.jpg',  alt: 'Student smiling on a rainy day outside a building',    caption: 'Studying between classes', size: 'small' },
]

const lightboxOpen = ref(false)
const lightboxStart = ref(0)

const openLightbox = (index: number) => {
  lightboxStart.value = index
  lightboxOpen.value = true
}

// 3D tilt for a photo card
const tiltHandlers: Record<string, (e: MouseEvent) => void> = {}

const makeTilt = (el: HTMLElement | null, delay: number) => {
  if (!el || import.meta.server) return
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return

  const onMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    el.style.transform = `perspective(800px) rotateY(${dx * 4}deg) rotateX(${-dy * 3}deg) scale(1.02)`
  }
  const onLeave = () => {
    el.style.transform = ''
  }
  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)
  el.style.transition = 'transform 400ms ease'
  tiltHandlers[delay] = onMove

  onUnmounted(() => {
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
  })
}

const largeRef = ref<HTMLElement | null>(null)
const small1Ref = ref<HTMLElement | null>(null)
const small2Ref = ref<HTMLElement | null>(null)

onMounted(() => {
  setTimeout(() => makeTilt(largeRef.value, 0), 0)
  setTimeout(() => makeTilt(small1Ref.value, 80), 80)
  setTimeout(() => makeTilt(small2Ref.value, 160), 160)
})
</script>

<template>
  <section class="life" id="life">
    <div class="container">

      <!-- Header — overlaps the photo grid slightly -->
      <header class="life-header reveal">
        <div class="life-header-inner">
          <div class="life-eyebrow">
            <span class="life-verse" aria-label="Biblical verse">
              <em>"For nothing is impossible with God."</em>
              <span>Luke 1:37</span>
            </span>
          </div>
          <h2 class="life-title">A 56-acre<br /><em>classroom.</em></h2>
        </div>
        <a class="life-ig-link" href="https://www.instagram.com/northwestu" target="_blank" rel="noopener">
          See what life looks like at NU
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </header>

      <!-- Bento grid -->
      <div class="bento">
        <!-- Large photo — left, tall -->
        <figure
          ref="largeRef"
          class="bento-large reveal"
          @click="openLightbox(0)"
          role="button"
          tabindex="0"
          aria-label="Open campus life gallery"
          @keydown.enter="openLightbox(0)"
          @keydown.space.prevent="openLightbox(0)"
        >
          <div class="bento-media">
            <img src="/worship-1.jpg" alt="Students worshipping with hands raised during chapel" loading="eager" />
            <div class="bento-watermark" aria-hidden="true">56</div>
            <div class="bento-overlay">
              <div class="bento-caption">
                <span class="bento-cap-text">Worship night</span>
                <span class="bento-cap-line" aria-hidden="true"></span>
              </div>
            </div>
          </div>
        </figure>

        <!-- Right column — two stacked photos -->
        <div class="bento-right">
          <figure
            ref="small1Ref"
            class="bento-small bento-small-top reveal"
            @click="openLightbox(6)"
            role="button"
            tabindex="0"
            aria-label="Open campus life gallery"
            @keydown.enter="openLightbox(6)"
            @keydown.space.prevent="openLightbox(6)"
          >
            <div class="bento-media">
              <img src="/forest-1.jpg" alt="Student on a mossy log deep in the campus forest" loading="lazy" />
              <div class="bento-overlay">
                <div class="bento-caption">
                  <span class="bento-cap-text">Trails behind campus</span>
                  <span class="bento-cap-line" aria-hidden="true"></span>
                </div>
              </div>
            </div>
          </figure>

          <figure
            ref="small2Ref"
            class="bento-small bento-small-bot reveal"
            @click="openLightbox(10)"
            role="button"
            tabindex="0"
            aria-label="Open campus life gallery"
            @keydown.enter="openLightbox(10)"
            @keydown.space.prevent="openLightbox(10)"
          >
            <div class="bento-media">
              <img src="/student-4.jpg" alt="Student smiling on a rainy day outside a Northwest University building" loading="lazy" />
              <div class="bento-overlay">
                <div class="bento-caption">
                  <span class="bento-cap-text">Studying between classes</span>
                  <span class="bento-cap-line" aria-hidden="true"></span>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </div>

      <!-- CTA -->
      <div class="life-cta reveal">
        <button class="life-open-btn" @click="openLightbox(0)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.5"/>
            <path d="M8 12h8M12 8l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Open full campus gallery
        </button>
      </div>

    </div>

    <LightboxModal
      v-model="lightboxOpen"
      :images="GALLERY"
      :start-index="lightboxStart"
    />
  </section>
</template>
