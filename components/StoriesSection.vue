<script setup lang="ts">
// TODO: Replace these 3 placeholder testimonials with real quotes from actual NU students.
// Each quote needs:
//   - Written permission from the student to use their words + photo
//   - Confirmation of their program/year
//   - Approval from Marketing before publishing

interface Story {
  quote: string
  name: string
  program: string
  year: string
  avatar: string
  photo: string
}

const stories: Story[] = [
  {
    quote: "My professors knew me. My faith group became family. I graduated with two clinical rotations already on my résumé.",
    name: 'Nursing student',
    program: 'Nursing',
    year: "Class of '25",
    avatar: '/life-1.jpg',
    photo: '/life-1.jpg',
  },
  {
    quote: "The Creatio studio is why I picked NU. I left with a real credit on a real album.",
    name: 'Music Production major',
    program: 'Music Production',
    year: "Class of '24",
    avatar: '/chapel-1.jpg',
    photo: '/chapel-1.jpg',
  },
  {
    quote: "Faith here changed how I lead, how I work, and the kind of person I want to be.",
    name: 'Business major',
    program: 'Business',
    year: "Class of '25",
    avatar: '/life-3.jpg',
    photo: '/life-3.jpg',
  },
]

const PROGRAMS = ['All', 'Nursing', 'Music Production', 'Business', 'Undecided']
const activeFilter = ref('All')

const filtered = computed(() =>
  activeFilter.value === 'All'
    ? stories
    : stories.filter((s) => s.program === activeFilter.value)
)
</script>

<template>
  <section class="stories" id="stories">
    <div class="container">
      <header class="section-head reveal">
        <h2 class="section-title">In their words.</h2>
      </header>

      <!-- Filter tabs -->
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

      <div class="story-grid">
        <TransitionGroup name="story-list">
          <article
            v-for="s in filtered"
            :key="`${s.program}-${s.year}`"
            class="story reveal"
          >
            <div class="story-photo">
              <img :src="s.photo" :alt="s.name" loading="lazy" />
            </div>
            <div class="story-body">
              <p class="quote">"{{ s.quote }}"</p>
              <footer class="by">
                <img class="avatar" :src="s.avatar" alt="" loading="lazy" />
                <div>
                  <strong>{{ s.name }}</strong>
                  <span>{{ s.year }}</span>
                </div>
              </footer>
            </div>
          </article>
        </TransitionGroup>
      </div>

      <p class="review-line">
        Students rate NU <strong>3.9 / 5</strong> on Niche —
        <a href="https://www.niche.com/colleges/northwest-university/" target="_blank" rel="noopener">read verified reviews</a>.
      </p>
    </div>
  </section>
</template>

<style scoped>
.story-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: clamp(28px, 4vw, 40px);
}
.story-tab {
  padding: 8px 18px;
  border-radius: var(--border-radius-10);
  background: rgba(255, 255, 255, .6);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 38, 61, .08);
  color: var(--nu-navy);
  font-weight: 700;
  font-size: var(--font-size-1);
  letter-spacing: var(--letter-spacing-4);
  cursor: pointer;
  transition: all .2s ease;
}
.story-tab:hover { border-color: var(--nu-blue); color: var(--nu-blue); }
.story-tab.is-active { background: var(--nu-midnight); color: #fff; border-color: var(--nu-midnight); }

/* Transition for filter switching */
.story-list-move,
.story-list-enter-active,
.story-list-leave-active { transition: all .3s ease; }
.story-list-enter-from,
.story-list-leave-to { opacity: 0; transform: translateY(12px); }
.story-list-leave-active { position: absolute; }
</style>
