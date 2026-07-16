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
  { src: '/student-3.jpg',  alt: 'Students at orientation',                    caption: 'New student orientation' },
  { src: '/student-4.jpg',  alt: 'Student smiling on campus',                   caption: 'Studying between classes' },
  { src: '/chapel-1.jpg',   alt: 'Chapel building at sunset',                  caption: 'The chapel at sunset' },
  { src: '/chapel-2.jpg',   alt: 'Inside the chapel',                          caption: 'Inside the chapel' },
  { src: '/life-1.jpg',     alt: 'Church fair on campus',                       caption: 'Church fair' },
  { src: '/life-2.jpg',     alt: 'You Belong Fair on campus',                  caption: 'You Belong Fair' },
  { src: '/life-3.jpg',     alt: 'Student leadership fair',                     caption: 'Student Leadership Fair' },
  { src: '/campus-1.jpg',   alt: 'Aerial view of campus in autumn',            caption: 'Campus in autumn' },
  { src: '/campus-2.jpg',   alt: 'Campus buildings and green space',          caption: 'NU campus' },
  { src: '/sports-1.jpg',   alt: 'Eagles student athletes',                    caption: 'NU Eagles athletics' },
  { src: '/sports-2.jpg',   alt: 'Game day at NU',                             caption: 'Game day' },
  { src: '/sports-3.jpg',   alt: 'Athletic facilities',                        caption: 'Athletic facilities' },
  { src: '/sports-4.jpg',   alt: 'Intramural sports',                          caption: 'Intramural sports' },
  { src: '/sports-5.jpg',   alt: 'Student athletes',                            caption: 'Student athletes' },
  { src: '/sports-6.jpg',   alt: 'Athletics at NU',                            caption: 'Eagles compete' },
]

const LIFE_PHOTOS = [
  { src: '/worship-1.jpg',  alt: 'Students worshipping with hands raised during chapel',  caption: 'Worship night' },
  { src: '/forest-1.jpg',   alt: 'Student standing on a mossy log deep in the campus forest', caption: 'Trails behind campus' },
  { src: '/student-4.jpg',  alt: 'Student smiling on a rainy day outside a Northwest University building', caption: 'Studying between classes' },
]

const lightboxOpen = ref(false)
const lightboxStart = ref(0)

const openLightbox = (index: number) => {
  lightboxStart.value = index
  lightboxOpen.value = true
}

const openGallery = () => {
  lightboxStart.value = 0
  lightboxOpen.value = true
}
</script>

<template>
  <section class="life" id="life">
    <div class="container">
      <header class="section-head reveal">
        <h2 class="section-title section-title-light">A 56-acre classroom.</h2>
        <p class="life-sub">From chapel worship to quiet forest trails, campus life happens everywhere here.</p>
        <p class="life-verse" aria-label="Biblical verse">
          <em>"For nothing is impossible with God."</em>
          <span>— Luke 1:37</span>
        </p>
        <a class="life-verse-link" href="https://www.instagram.com/northwestu" target="_blank" rel="noopener">
          See what life looks like at NU →
        </a>
      </header>

      <div class="life-photos">
        <figure
          v-for="(photo, i) in LIFE_PHOTOS"
          :key="photo.src"
          class="lp reveal"
          @click="openLightbox(i)"
          :aria-label="`View photo: ${photo.caption}`"
          role="button"
          tabindex="0"
          @keydown.enter="openLightbox(i)"
          @keydown.space.prevent="openLightbox(i)"
        >
          <div class="lp-media">
            <img :src="photo.src" :alt="photo.alt" :loading="i === 0 ? 'eager' : 'lazy'" />
            <div class="lp-caption" aria-hidden="true">
              <span>{{ photo.caption }}</span>
            </div>
          </div>
        </figure>
      </div>

      <div class="life-cta reveal">
        <button class="life-cta-link" @click="openGallery">
          See more of campus life
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
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
