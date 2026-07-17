<script setup lang="ts">
interface CampusMoment {
  id: string
  type: 'photo' | 'video'
  src: string
  thumb?: string
  caption: string
  tag: string
  aspect?: string
}

const MOMENTS: CampusMoment[] = [
  { id: 'm1', type: 'photo', src: '/life-1.jpg', caption: 'Morning labs, real equipment — not simulations.', tag: 'Nursing', aspect: '3/4' },
  { id: 'm2', type: 'video', src: 'https://www.youtube.com/embed/Ye1KgGUCREs?autoplay=0&mute=1', thumb: '/snow-lake.jpg', caption: 'She found her voice — and her first credit.', tag: 'Music Production' },
  { id: 'm3', type: 'photo', src: '/chapel-1.jpg', caption: 'Worship that fills the room. And changes it.', tag: 'Faith', aspect: '4/3' },
  { id: 'm4', type: 'photo', src: '/life-2.jpg', caption: '56 acres. Ten minutes from Seattle. All yours.', tag: 'Campus', aspect: '1/1' },
  { id: 'm5', type: 'photo', src: '/life-3.jpg', caption: 'Cohort that became family. Clinicals that became careers.', tag: 'Nursing' },
  { id: 'm6', type: 'video', src: 'https://www.youtube.com/embed/Ye1KgGUCREs?autoplay=0&mute=1', thumb: '/snow-lake.jpg', caption: 'Business plan written in a weekend. Launched by spring.', tag: 'Business' },
  { id: 'm7', type: 'photo', src: '/student-1.jpg', caption: 'Professors who know your name. Every single one.', tag: 'Faculty', aspect: '3/4' },
]

const feedEl = ref<HTMLElement | null>(null)
let autoScroll = 0
let isPaused = false

onMounted(() => {
  if (!feedEl.value) return
  feedEl.value.addEventListener('mouseenter', () => { isPaused = true })
  feedEl.value.addEventListener('mouseleave', () => { isPaused = false })

  const scroll = () => {
    if (!isPaused && feedEl.value) {
      feedEl.value.scrollLeft += 1
      if (feedEl.value.scrollLeft >= feedEl.value.scrollWidth - feedEl.value.clientWidth) {
        feedEl.value.scrollLeft = 0
      }
    }
    autoScroll = requestAnimationFrame(scroll)
  }
  autoScroll = requestAnimationFrame(scroll)

  onUnmounted(() => cancelAnimationFrame(autoScroll))
})

const PROGRAMS = ['All', 'Nursing', 'Business', 'Music Production', 'Faith', 'Campus']
const activeFilter = ref('All')

const filtered = computed(() =>
  activeFilter.value === 'All'
    ? MOMENTS
    : MOMENTS.filter(m => m.tag === activeFilter.value)
)
</script>

<template>
  <section class="stories" id="stories">
    <div class="container">
      <header class="section-head reveal">
        <h2 class="section-title">Real moments.</h2>
        <p class="section-sub" style="color: var(--text-secondary); margin-top: 10px; font-size: var(--font-size-3);">
          Scroll through campus life — past and present.
        </p>
      </header>

      <div class="story-filter" role="tablist" aria-label="Filter by program">
        <button
          v-for="p in PROGRAMS"
          :key="p"
          class="story-tab"
          :class="{ 'is-active': activeFilter === p }"
          role="tab"
          :aria-selected="activeFilter === p"
          @click="activeFilter = p"
        >
          {{ p }}
        </button>
      </div>
    </div>

    <!-- Horizontal auto-scroll feed -->
    <div class="moments-feed" ref="feedEl" aria-label="Campus moments feed">
      <div class="moments-track">
        <div
          v-for="m in filtered"
          :key="m.id"
          class="moment tilt-card"
        >
          <div class="moment-media">
            <img
              v-if="m.type === 'photo'"
              :src="m.src"
              :alt="m.caption"
              loading="lazy"
            />
            <div v-else class="moment-video">
              <img :src="m.thumb" :alt="m.caption" loading="lazy" />
              <button class="play-btn" :aria-label="`Play video: ${m.caption}`" @click.stop>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="moment-body">
            <span class="moment-tag">{{ m.tag }}</span>
            <p class="moment-caption">{{ m.caption }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Video modal for play button -->
  </section>
</template>

<style scoped>
.stories {
  padding: clamp(80px, 10vw, 120px) 0;
  background: var(--bg-base);
  overflow: hidden;
}

.story-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: clamp(28px, 4vw, 40px);
}
.story-tab {
  padding: 8px 18px;
  border-radius: var(--border-radius-10);
  background: rgba(255,255,255,.06);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-mid);
  color: var(--text-secondary);
  font-weight: 700;
  font-size: var(--font-size-1);
  letter-spacing: var(--letter-spacing-4);
  cursor: pointer;
  transition: all .2s ease;
}
.story-tab:hover { border-color: rgba(251,217,69,.4); color: var(--text-primary); }
.story-tab.is-active { background: var(--accent-gold); color: var(--nu-midnight); border-color: var(--accent-gold); }

/* Horizontal feed */
.moments-feed {
  display: flex;
  overflow-x: auto;
  scroll-behavior: auto;
  scrollbar-width: none;
  gap: 16px;
  padding: 8px clamp(24px, 5vw, 80px) clamp(24px, 4vw, 48px);
  cursor: grab;
}
.moments-feed::-webkit-scrollbar { display: none; }
.moments-feed:active { cursor: grabbing; }

.moments-track {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  flex-shrink: 0;
}

.moment {
  flex-shrink: 0;
  width: clamp(220px, 28vw, 300px);
  background: var(--bg-glass);
  border: 1px solid var(--border-mid);
  border-radius: var(--border-radius-7);
  overflow: hidden;
  transition: border-color .25s ease, box-shadow .25s ease;
}
.moment:hover {
  border-color: rgba(251,217,69,.3);
  box-shadow: 0 8px 32px rgba(0,0,0,.4), var(--glow-gold);
}

.moment-media {
  position: relative;
  overflow: hidden;
}
.moment-media img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  display: block;
  transition: transform .4s ease;
}
.moment:hover .moment-media img { transform: scale(1.04); }

.moment-video {
  position: relative;
}
.moment-video img {
  aspect-ratio: 16/9;
}
.play-btn {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,23,41,.5);
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background .2s ease;
}
.play-btn svg { filter: drop-shadow(0 2px 8px rgba(0,0,0,.5)); }
.play-btn:hover { background: rgba(251,217,69,.3); color: var(--accent-gold); }

.moment-body {
  padding: 14px 16px;
}
.moment-tag {
  display: inline-block;
  font-size: .65rem;
  font-weight: 700;
  letter-spacing: var(--letter-spacing-8);
  text-transform: uppercase;
  color: var(--accent-gold);
  margin-bottom: 6px;
}
.moment-caption {
  font-size: var(--font-size-2);
  color: var(--text-secondary);
  line-height: var(--line-height-4);
}

@media (prefers-reduced-motion: reduce) {
  .moments-feed { overflow-x: auto; }
  .moment:hover .moment-media img { transform: none; }
  .play-btn { pointer-events: none; }
}
</style>
