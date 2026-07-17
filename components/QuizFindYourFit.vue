<script setup lang="ts">
const emit = defineEmits<{ recommendation: [program: string] }>()

interface QuizOption {
  label: string
  sub: string
  icon: string
  scores: Record<string, number>
}

interface QuizQuestion {
  q: string
  sub: string
  options: QuizOption[]
}

const QUESTIONS: QuizQuestion[] = [
  {
    q: "What makes your heart beat faster?",
    sub: "Pick the one that feels most like you",
    options: [
      { label: "Hands-on labs", sub: "Building things, testing ideas", icon: "🧪", scores: { nursing: 2, 'physician-assistant': 1 } },
      { label: "Deep conversations", sub: "Talking through big ideas", icon: "💬", scores: { business: 2, psychology: 1 } },
      { label: "Creative studio", sub: "Making something from nothing", icon: "🎵", scores: { 'music-production': 2 } },
      { label: "Helping people", sub: "Being there when it matters", icon: "💚", scores: { nursing: 1, psychology: 2 } },
    ]
  },
  {
    q: "Your ideal Sunday morning?",
    sub: "Where do you feel most at peace?",
    options: [
      { label: "Chapel & worship", sub: "Singing, community, reflection", icon: "🙌", scores: { ministry: 2, theology: 1 } },
      { label: "Campus trails", sub: "Coffee, solitude, PNW nature", icon: "🌲", scores: { undecided: 2 } },
      { label: "Creative project", sub: "Music, art, something alive", icon: "🎧", scores: { 'music-production': 2 } },
      { label: "With friends", sub: "Laughing, exploring, connecting", icon: "🤙", scores: { business: 1, psychology: 1 } },
    ]
  },
  {
    q: "Pick a campus vibe",
    sub: "The place you'd spend most time",
    options: [
      { label: "Modern nursing labs", sub: "High-tech simulation center", icon: "🏥", scores: { nursing: 2, 'physician-assistant': 1 } },
      { label: "Recording studio", sub: "Creatio's world-class facility", icon: "🎚️", scores: { 'music-production': 2 } },
      { label: "Athletic field", sub: "NCAA courts, trails, gym", icon: "🏃", scores: { athletics: 2 } },
      { label: "Seminar room", sub: "Great discussions, great debates", icon: "📚", scores: { business: 2, psychology: 1 } },
    ]
  },
  {
    q: "Where do you see yourself in 4 years?",
    sub: "Your north star",
    options: [
      { label: "In scrubs, making rounds", sub: "Hospital, clinic, saving lives", icon: "🩺", scores: { nursing: 3, 'physician-assistant': 1 } },
      { label: "Running a team", sub: "Leading, building, creating impact", icon: "📊", scores: { business: 3 } },
      { label: "On stage or in studio", sub: "Album credit, tours, sessions", icon: "🎤", scores: { 'music-production': 3 } },
      { label: "Making a difference", sub: "Counseling, nonprofit, community", icon: "🌍", scores: { psychology: 3 } },
    ]
  },
  {
    q: "How do you learn best?",
    sub: "Your superpower",
    options: [
      { label: "By doing", sub: "Practice, simulation, hands-on", icon: "✋", scores: { nursing: 2, 'physician-assistant': 1 } },
      { label: "By discussing", sub: "Talking it through, hearing others", icon: "🗣️", scores: { business: 2, psychology: 2 } },
      { label: "By creating", sub: "Making, mixing, producing", icon: "🎨", scores: { 'music-production': 2 } },
      { label: "By figuring it out", sub: "Researching, analyzing, solving", icon: "🔬", scores: { 'computer-science': 2 } },
    ]
  },
]

const PROGRAM_LABELS: Record<string, string> = {
  nursing: 'Nursing (BSN)',
  'physician-assistant': 'Physician Assistant Studies',
  business: 'Business',
  psychology: 'Psychology',
  'music-production': 'Music Production',
  'computer-science': 'Computer Science',
  ministry: 'Ministry / Theology',
  athletics: 'Athletics',
  undecided: 'Undecided — exploring',
  theology: 'Seminary Track',
}

const PROGRAMS_TO_SHOW = ['nursing', 'business', 'music-production', 'psychology', 'computer-science']

const STORIES = [
  { quote: "I came for nursing, stayed for the community. My cohort became family.", name: 'Nursing · Class of \'25', photo: '/life-2.jpg' },
  { quote: "The Creatio studio gave me a credit before I even graduated.", name: 'Music Production · Class of \'24', photo: '/chapel-1.jpg' },
  { quote: "Professors who actually know your name. Every single one.", name: 'Business · Class of \'26', photo: '/student-1.jpg' },
  { quote: "I changed my major twice and never felt lost — they guided me.", name: 'Psychology · Class of \'25', photo: '/life-3.jpg' },
]

const current = ref(0)
const scores = reactive<Record<string, number>>({})
const selected = ref<number | null>(null)
const done = ref(false)
const transitioning = ref(false)

const totalQuestions = QUESTIONS.length

const topPrograms = computed(() => {
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([k]) => k)
})

const recommendation = computed(() => topPrograms.value[0] ?? 'nursing')

const recommendLabel = computed(() => PROGRAM_LABELS[recommendation.value] ?? recommendation.value)

const progressPct = computed(() => ((current.value) / totalQuestions) * 100)

const select = (optIdx: number) => {
  if (transitioning.value) return
  selected.value = optIdx
  const opt = QUESTIONS[current.value].options[optIdx]
  Object.entries(opt.scores).forEach(([prog, pts]) => {
    scores[prog] = (scores[prog] ?? 0) + pts
  })
}

const next = () => {
  if (selected.value === null) return
  transitioning.value = true
  setTimeout(() => {
    if (current.value < totalQuestions - 1) {
      current.value++
      selected.value = null
    } else {
      done.value = true
    }
    transitioning.value = false
  }, 300)
}

const restart = () => {
  current.value = 0
  selected.value = null
  done.value = false
  Object.keys(scores).forEach(k => delete scores[k])
}

const goToForm = () => {
  const label = PROGRAM_LABELS[recommendation.value]
  if (label) emit('recommendation', label)
  const el = document.getElementById('request')
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 70
  window.scrollTo({ top, behavior: 'smooth' })
}
</script>

<template>
  <section class="quiz" id="quiz">
    <div class="container quiz-container">

      <!-- Pre-quiz: hook -->
      <div v-if="current === 0 && !done" class="quiz-intro reveal">
        <p class="quiz-eyebrow">Not sure where to start?</p>
        <h2 class="quiz-headline">Find your fit<br /><em>in 30 seconds.</em></h2>
        <p class="quiz-sub">Answer 5 quick questions — get a personalized program recommendation and your free info packet.</p>
        <button class="btn btn-gold quiz-start-btn" @click="select(-1); next()">
          <span class="btn-label">Let's find your program →</span>
        </button>
        <p class="quiz-micro">Takes about 30 seconds · No signup required</p>
      </div>

      <!-- Quiz in progress -->
      <div v-else-if="!done" class="quiz-body">

        <!-- Progress bar -->
        <div class="quiz-progress" role="progressbar" :aria-valuenow="current + 1" :aria-valuemin="1" :aria-valuemax="totalQuestions">
          <div
            v-for="i in totalQuestions"
            :key="i"
            class="prog-seg"
            :class="{ 'is-done': i <= current, 'is-active': i === current + 1 }"
          ></div>
        </div>

        <!-- Question -->
        <Transition name="quiz-q" mode="out-in">
          <div :key="current" class="quiz-question">
            <p class="quiz-q-count">{{ current + 1 }} / {{ totalQuestions }}</p>
            <h3 class="quiz-q-text">{{ QUESTIONS[current].q }}</h3>
            <p class="quiz-q-sub">{{ QUESTIONS[current].sub }}</p>

            <div class="quiz-options">
              <button
                v-for="(opt, i) in QUESTIONS[current].options"
                :key="i"
                class="quiz-opt"
                :class="{ 'is-selected': selected === i }"
                @click="select(i)"
              >
                <span class="opt-icon" aria-hidden="true">{{ opt.icon }}</span>
                <span class="opt-label">{{ opt.label }}</span>
                <span class="opt-sub">{{ opt.sub }}</span>
              </button>
            </div>

            <button
              v-if="selected !== null"
              class="btn btn-gold quiz-next-btn"
              :class="{ 'is-loading': transitioning }"
              @click="next"
            >
              <span class="btn-label">{{ current < totalQuestions - 1 ? 'Next question →' : 'See my results →' }}</span>
              <span class="btn-spinner" aria-hidden="true"></span>
            </button>
          </div>
        </Transition>
      </div>

      <!-- Results -->
      <div v-else class="quiz-result reveal">
        <p class="quiz-result-eyebrow">Your match:</p>
        <h2 class="quiz-result-title">{{ recommendLabel }}</h2>

        <div class="quiz-program-tags">
          <span
            v-for="prog in topPrograms"
            :key="prog"
            class="prog-tag"
            :class="{ 'is-top': prog === recommendation }"
          >
            {{ PROGRAM_LABELS[prog] ?? prog }}
          </span>
        </div>

        <!-- Social proof mosaic -->
        <div class="quiz-mosaic">
          <div
            v-for="(s, i) in STORIES"
            :key="i"
            class="mosaic-card"
          >
            <img :src="s.photo" :alt="s.name" loading="lazy" />
            <p class="mosaic-quote">"{{ s.quote }}"</p>
            <span class="mosaic-name">{{ s.name }}</span>
          </div>
        </div>

        <div class="quiz-result-actions">
          <button class="btn btn-gold btn-block" @click="goToForm">
            <span class="btn-label">Get info on {{ recommendLabel }} →</span>
          </button>
          <button class="quiz-retake" @click="restart">Take quiz again</button>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.quiz {
  padding: clamp(80px, 10vw, 120px) 0;
  background: var(--bg-base);
  overflow: hidden;
}
.quiz-container {
  max-width: 680px;
}

/* Intro */
.quiz-intro { text-align: center; }
.quiz-eyebrow {
  font-size: var(--font-size-1);
  font-weight: 700;
  letter-spacing: var(--letter-spacing-8);
  text-transform: uppercase;
  color: var(--accent-gold);
  margin-bottom: 14px;
}
.quiz-headline {
  font-family: var(--font-family-serif);
  font-weight: 700;
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  color: var(--text-primary);
  line-height: 1.08;
  letter-spacing: var(--letter-spacing-3);
  margin-bottom: 16px;
}
.quiz-headline em { font-style: italic; color: var(--accent-gold); }
.quiz-sub {
  font-size: var(--font-size-3);
  color: var(--text-secondary);
  line-height: var(--line-height-4);
  max-width: 42ch;
  margin: 0 auto 28px;
}
.quiz-start-btn {
  font-size: var(--font-size-3);
  padding: 16px 32px;
  box-shadow: var(--glow-gold);
}
.quiz-micro {
  margin-top: 12px;
  font-size: var(--font-size-1);
  color: var(--text-muted);
  letter-spacing: var(--letter-spacing-4);
}

/* Progress bar — segmented like Instagram Stories */
.quiz-progress {
  display: flex;
  gap: 6px;
  margin-bottom: clamp(32px, 5vw, 48px);
}
.prog-seg {
  flex: 1;
  height: 4px;
  border-radius: 999px;
  background: rgba(255,255,255,.12);
  transition: background .3s ease;
}
.prog-seg.is-done { background: var(--accent-gold); }
.prog-seg.is-active { background: rgba(251,217,69,.4); }

/* Question */
.quiz-q-count {
  font-size: var(--font-size-1);
  font-weight: 700;
  letter-spacing: var(--letter-spacing-8);
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 12px;
}
.quiz-q-text {
  font-family: var(--font-family-serif);
  font-weight: 700;
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  color: var(--text-primary);
  line-height: 1.15;
  margin-bottom: 8px;
}
.quiz-q-sub {
  font-size: var(--font-size-2);
  color: var(--text-secondary);
  margin-bottom: 28px;
}

/* Option cards */
.quiz-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}
.quiz-opt {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 18px 16px;
  border-radius: var(--border-radius-7);
  background: var(--bg-glass);
  border: 1.5px solid var(--border-mid);
  text-align: left;
  cursor: pointer;
  transition: border-color .2s ease, background .2s ease, transform .2s ease, box-shadow .2s ease;
}
.quiz-opt:hover {
  border-color: rgba(251,217,69,.5);
  background: rgba(251,217,69,.06);
  transform: translateY(-2px);
}
.quiz-opt.is-selected {
  border-color: var(--accent-gold);
  background: rgba(251,217,69,.1);
  box-shadow: var(--glow-gold);
}
.opt-icon {
  font-size: 1.6rem;
  line-height: 1;
}
.opt-label {
  font-size: var(--font-size-3);
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: var(--letter-spacing-4);
}
.opt-sub {
  font-size: var(--font-size-1);
  color: var(--text-muted);
  line-height: var(--line-height-4);
}

.quiz-next-btn { margin-top: 8px; }

@media (max-width: 480px) {
  .quiz-options { grid-template-columns: 1fr; }
}

/* Transitions */
.quiz-q-enter-active,
.quiz-q-leave-active { transition: opacity .25s ease, transform .25s ease; }
.quiz-q-enter-from { opacity: 0; transform: translateX(20px); }
.quiz-q-leave-to { opacity: 0; transform: translateX(-20px); }

/* Results */
.quiz-result { text-align: center; }
.quiz-result-eyebrow {
  font-size: var(--font-size-1);
  font-weight: 700;
  letter-spacing: var(--letter-spacing-8);
  text-transform: uppercase;
  color: var(--accent-gold);
  margin-bottom: 8px;
}
.quiz-result-title {
  font-family: var(--font-family-serif);
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 3.2rem);
  color: var(--text-primary);
  letter-spacing: var(--letter-spacing-3);
  margin-bottom: 20px;
}
.quiz-program-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 32px;
}
.prog-tag {
  padding: 6px 16px;
  border-radius: var(--border-radius-10);
  background: rgba(255,255,255,.06);
  border: 1px solid var(--border-mid);
  color: var(--text-secondary);
  font-size: var(--font-size-1);
  font-weight: 600;
  letter-spacing: var(--letter-spacing-4);
}
.prog-tag.is-top {
  background: rgba(251,217,69,.12);
  border-color: rgba(251,217,69,.3);
  color: var(--accent-gold);
}

/* Mosaic social proof */
.quiz-mosaic {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 28px;
  text-align: left;
}
.mosaic-card {
  background: var(--bg-glass);
  border: 1px solid var(--border-mid);
  border-radius: var(--border-radius-7);
  overflow: hidden;
}
.mosaic-card img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}
.mosaic-quote {
  padding: 12px 14px 6px;
  font-size: var(--font-size-2);
  color: var(--text-secondary);
  line-height: var(--line-height-4);
  font-style: italic;
}
.mosaic-name {
  display: block;
  padding: 4px 14px 12px;
  font-size: .7rem;
  font-weight: 700;
  letter-spacing: var(--letter-spacing-6);
  color: var(--text-muted);
  text-transform: uppercase;
}

.quiz-result-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}
.quiz-retake {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: var(--font-size-1);
  cursor: pointer;
  transition: color .2s ease;
  padding: 4px;
}
.quiz-retake:hover { color: var(--text-secondary); }

@media (prefers-reduced-motion: reduce) {
  .quiz-q-enter-active,
  .quiz-q-leave-active { transition: opacity .15s ease; }
}
</style>
