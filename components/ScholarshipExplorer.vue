<script setup lang="ts">
import { SCHOLARSHIPS, TUITION, useScholarships } from '~/composables/useScholarships'

const {
  status, selectedIds, activeCategory, variableAmounts,
  canAdd, toggle, setVariable, amountOf,
  total, coverage, remaining, byCategory, categories,
  reset,
} = useScholarships()

const fmt = (n: number) =>
  '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 })

const selectedScholarships = computed(() =>
  selectedIds.value
    .map((id) => SCHOLARSHIPS.find((s) => s.id === id))
    .filter(Boolean) as typeof SCHOLARSHIPS
)

const catLabel = (cat: string) =>
  categories.find((c) => c.id === cat)?.label ?? cat

const catCount = (cat: string) =>
  selectedIds.value.filter((id) => SCHOLARSHIPS.find((s) => s.id === id)?.category === cat).length

const STACK_LIMITS: Record<string, number> = {
  academic: 1, stackable: Infinity, affiliation: 1, talent: 2, ministry: 2, need: 1,
}

const expandedCard = ref<string | null>(null)
const toggleExpand = (id: string) => {
  expandedCard.value = expandedCard.value === id ? null : id
}

const gateEmail = ref('')
const gateStatus = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const showPackage = ref(false)
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const submitGate = async () => {
  if (!emailRe.test(gateEmail.value)) return
  gateStatus.value = 'loading'
  try {
    await $fetch('/api/lead', {
      method: 'POST',
      body: { email: gateEmail.value, firstName: '', lastName: '', program: '', consent: true, modality: 'Both' }
    })
    showPackage.value = true
    gateStatus.value = 'success'
  } catch {
    showPackage.value = true
    gateStatus.value = 'success'
  }
}

const catSections = [
  { id: 'academic',    label: 'Academic Merit',             hint: 'Choose 1' },
  { id: 'stackable',   label: 'Stackable Extras',           hint: 'Add as many as qualify' },
  { id: 'affiliation', label: 'Affiliations & Partnerships', hint: 'Choose 1' },
  { id: 'talent',      label: 'Talent Awards',              hint: 'Up to 2' },
  { id: 'ministry',    label: 'NU & Ministry Support',      hint: 'Up to 2' },
  { id: 'need',        label: 'Need-Based Aid',              hint: 'Choose 1' },
]

const howToGet = (id: string) => {
  const map: Record<string, string> = {
    presidential: 'Minimum 3.8 GPA, strong leadership record. Apply by Jan 15 for highest consideration. Renewable with 3.0 GPA.',
    provost: 'Minimum 3.5 GPA. Demonstrated community service and leadership. Apply by Feb 1. Renewable with 2.8 GPA.',
    dean: 'Minimum 3.2 GPA. Active in school or community. Apply by Mar 1. Renewable with 2.5 GPA.',
    faculty: 'Minimum 3.0 GPA. Submit one letter of recommendation. Renewable with 2.5 GPA.',
    northwest: 'Minimum 2.8 GPA. Complete the FAFSA. Renewable with satisfactory progress.',
    'alumni': 'Parent or sibling must be a Northwest University graduate. Contact the Registrar to verify.',
    'church-partner': 'Your church must be a registered NU partner church. Ask your pastor to contact NU Admissions.',
    cccu: 'Submit transcript from your current CCCU institution showing good standing.',
    'music': 'Schedule a music audition with the Conservatory. Performance on primary instrument or voice required.',
    theatre: 'Audition with two contrasting monologues or a musical theatre piece. Dance call may be included.',
    art: 'Submit 10-15 piece portfolio via the SlideRoom portal. Range reflects portfolio strength.',
    athletic: 'Must be recruited by an NU coach. NCAA eligibility required. Award varies by sport and division.',
    ministry: 'Enroll in the School of Ministry or declare a ministry-related major. Pastor endorsement required.',
    pastor: 'Your parent must be a full-time pastor or missionary. Submit employment verification letter.',
    mission: 'Participate in an NU short-term mission trip or show documented mission experience.',
    seminary: 'Enroll in the 4+1 Seminary Track or declare a theology/pre-seminary concentration.',
    pell: 'Complete the FAFSA and meet federal Pell eligibility. Award varies by EFC.',
    'nu-need': 'Complete the FAFSA. Award determined by calculated financial need. Maximum varies by year.',
    'visit': 'Schedule an in-person or virtual campus visit with an admissions counselor.',
    'early-app': 'Submit your complete application (essay, transcripts, recommendation) by Nov 1.',
    'dual-credit': 'Submit official college transcripts showing transferable dual-enrollment credit.',
    'church-match': 'Your church contributes to the scholarship fund. Ask your pastor to contact NU about the match program.',
  }
  return map[id] ?? 'Contact the Financial Aid Office for specific requirements.'
}
</script>

<template>
  <section class="sch" id="sch">
    <div class="container">

      <!-- Header -->
      <header class="sch-head reveal">
        <div class="sch-financial-aid">
          <a href="https://www.northwestu.edu/financial-aid" target="_blank" rel="noopener">
            Financial Aid Office
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <span class="sch-year">2027–28 Academic Year</span>
        </div>
        <p class="eyebrow">Scholarships</p>
        <h2 class="section-title">Build Your Scholarship Package</h2>
        <p class="sch-sub">
          Welcome to Northwest University's Scholarship Explorer! Let's discover every scholarship
          you qualify for and make your NU dream a reality.
        </p>
      </header>

      <!-- Trust strip -->
      <ul class="sch-strip reveal" role="list">
        <li>
          <span class="strip-num">Up to 100%</span>
          <span class="strip-label">Tuition Coverage</span>
        </li>
        <li>
          <span class="strip-num">Stack</span>
          <span class="strip-label">Together</span>
        </li>
        <li>
          <span class="strip-num">Renewable</span>
          <span class="strip-label">4 Years</span>
        </li>
      </ul>

      <!-- How this works -->
      <div class="sch-how reveal">
        <h3>How This Works</h3>
        <p class="sch-tuition">Estimated Annual Tuition: <strong>{{ fmt(TUITION) }}</strong></p>
        <ol class="sch-steps" role="list">
          <li>
            <span class="step-n">1</span>
            <div>
              <strong>Choose Your Status</strong>
              <span>First-year or Transfer student</span>
            </div>
          </li>
          <li>
            <span class="step-n">2</span>
            <div>
              <strong>Browse &amp; Add Scholarships</strong>
              <span>Click any you qualify for</span>
            </div>
          </li>
          <li>
            <span class="step-n">3</span>
            <div>
              <strong>See Your Savings</strong>
              <span>Real-time cost calculation</span>
            </div>
          </li>
        </ol>
      </div>

      <!-- Status picker -->
      <div v-if="!status" class="sch-status reveal">
        <p class="sch-status-title">First, tell us about yourself</p>
        <div class="status-grid">
          <button class="status-card" @click="status = 'first-year'">
            <span class="status-emoji" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 12v5c3 3 9 3 12 0v-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <strong>First-Year Student</strong>
            <span>Starting college for the first time? This is you!</span>
          </button>
          <button class="status-card" @click="status = 'transfer'">
            <span class="status-emoji" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <strong>Transfer Student</strong>
            <span>Transferring from another college? We've got options for you!</span>
          </button>
        </div>
      </div>

      <!-- After status is chosen: scholarship browser -->
      <div v-else class="sch-body">

        <!-- Mobile: email gate banner -->
        <div v-if="!showPackage" class="sch-gate-banner reveal">
          <div class="gate-banner-copy">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <p>Select scholarships above, then enter your email to unlock your personalized estimate.</p>
          </div>
          <form v-if="gateStatus !== 'success'" class="gate-banner-form" novalidate @submit.prevent="submitGate">
            <input
              v-model="gateEmail"
              type="email"
              autocomplete="email"
              placeholder="your@email.com"
              required
            />
            <button type="submit" class="btn btn-primary" :class="{ 'is-loading': gateStatus === 'loading' }" :disabled="gateStatus === 'loading'">
              <span class="btn-label">See My Estimate</span>
              <span class="btn-spinner" aria-hidden="true"></span>
            </button>
          </form>
          <p v-else class="gate-banner-success">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Check your inbox — here's your estimate!
          </p>
        </div>

        <!-- Sticky package sidebar (desktop right column — always visible once unlocked) -->
        <aside class="sch-pkg">
          <header>
            <h3>Your Scholarship Package</h3>
            <span v-if="showPackage" class="pkg-count">{{ selectedScholarships.length }} selected</span>
          </header>

          <!-- Package locked state -->
          <div v-if="!showPackage" class="pkg-lock">
            <div class="pkg-lock-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="1.5"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </div>
            <p class="pkg-lock-copy">
              Enter your email to unlock your personalized scholarship estimate — we'll also send you the full breakdown.
            </p>
            <form v-if="gateStatus !== 'success'" novalidate @submit.prevent="submitGate">
              <input
                v-model="gateEmail"
                type="email"
                autocomplete="email"
                placeholder="your@email.com"
                required
                class="pkg-lock-input"
              />
              <button type="submit" class="btn btn-primary btn-block" :class="{ 'is-loading': gateStatus === 'loading' }" :disabled="gateStatus === 'loading'">
                <span class="btn-label">See My Estimate</span>
                <span class="btn-spinner" aria-hidden="true"></span>
              </button>
            </form>
            <p v-else class="pkg-lock-success">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Check your inbox!
            </p>
            <p class="pkg-lock-note">Free · No obligation · We'll never share your info</p>
          </div>

          <!-- Package revealed -->
          <template v-else>
            <div class="pkg-bar">
              <div class="pkg-bar-track">
                <div class="pkg-bar-fill" :style="{ width: coverage + '%' }"></div>
              </div>
              <div class="pkg-bar-meta">
                <span>{{ coverage }}% covered</span>
                <span>{{ fmt(remaining) }} remaining / yr</span>
              </div>
            </div>

            <ul v-if="selectedScholarships.length" class="pkg-list" role="list">
              <li v-for="s in selectedScholarships" :key="s.id">
                <div>
                  <strong>{{ s.title }}</strong>
                  <span class="pkg-cat">{{ catLabel(s.category) }}</span>
                </div>
                <div class="pkg-right">
                  <span class="pkg-amt">{{ fmt(amountOf(s)) }}</span>
                  <button class="pkg-remove" type="button" @click="toggle(s)" :aria-label="`Remove ${s.title}`">×</button>
                </div>
              </li>
            </ul>
            <p v-else class="pkg-empty">
              No scholarships selected yet.<br />
              Click any scholarship card to add it.
            </p>

            <button v-if="selectedIds.length" class="pkg-reset" type="button" @click="reset">Reset package</button>
          </template>
        </aside>

        <!-- Category tabs -->
        <div class="cat-tabs" role="tablist" aria-label="Scholarship category">
          <button
            v-for="c in categories"
            :key="c.id"
            class="cat-tab"
            :class="{ 'is-active': activeCategory === c.id }"
            role="tab"
            :aria-selected="activeCategory === c.id"
            @click="activeCategory = c.id"
          >
            {{ c.label }}
          </button>
        </div>

        <!-- Category sections -->
        <div v-for="section in catSections" :key="section.id" class="cat-section">
          <div v-if="activeCategory === 'all' || activeCategory === section.id" class="cat-section-head">
            <div class="cat-section-title">
              <span>{{ section.label }}</span>
              <span class="cat-section-hint">{{ section.hint }}</span>
            </div>
            <span class="cat-section-count">{{ catCount(section.id) }}/{{ STACK_LIMITS[section.id] === Infinity ? '∞' : STACK_LIMITS[section.id] }}</span>
          </div>

          <div v-if="activeCategory === 'all' || activeCategory === section.id" class="sch-grid">
            <article
              v-for="s in byCategory[section.id as keyof typeof byCategory]"
              :key="s.id"
              class="sch-card"
              :class="{
                'is-selected': selectedIds.includes(s.id),
                'is-disabled': !canAdd(s) && !selectedIds.includes(s.id),
              }"
              @click="canAdd(s) && toggle(s)"
              role="button"
              tabindex="0"
              @keydown.enter="canAdd(s) && toggle(s)"
              @keydown.space.prevent="canAdd(s) && toggle(s)"
            >
              <div v-if="s.flag" class="sch-flag">{{ s.flag }}</div>

              <header class="sch-card-head">
                <span class="cat-pill" :class="`cat-${s.category}`">{{ catLabel(s.category) }}</span>
                <span class="sch-amt">{{ fmt(amountOf(s)) }}<span class="sch-amt-unit">/yr</span></span>
              </header>

              <h4>{{ s.title }}</h4>
              <p class="sch-blurb">{{ s.blurb }}</p>

              <!-- Variable slider (when selected) -->
              <div v-if="s.variable && selectedIds.includes(s.id)" class="sch-var" @click.stop>
                <label>
                  <span>Adjustable ({{ s.variable.unit }})</span>
                  <input
                    type="range"
                    :min="s.variable.min"
                    :max="s.variable.max"
                    step="100"
                    :value="variableAmounts[s.id] ?? s.variable.defaultValue"
                    @input="setVariable(s.id, +($event.target as HTMLInputElement).value)"
                  />
                  <output>{{ fmt(variableAmounts[s.id] ?? s.variable.defaultValue) }}</output>
                </label>
              </div>

              <!-- How to get this -->
              <div class="sch-how-to">
                <button
                  type="button"
                  class="how-to-toggle"
                  @click.stop="toggleExpand(s.id)"
                >
                  {{ expandedCard === s.id ? 'Hide details' : 'How to get this' }}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" :style="{ transform: expandedCard === s.id ? 'rotate(180deg)' : '' }"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
                <div v-if="expandedCard === s.id" class="how-to-content">
                  {{ howToGet(s.id) }}
                </div>
              </div>

              <footer class="sch-card-foot">
                <span class="renew">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  {{ s.renewable }}
                </span>
                <span class="add">{{ selectedIds.includes(s.id) ? '✓ Added' : '+ Add' }}</span>
              </footer>
            </article>
          </div>
        </div>
      </div>

      <!-- Footnotes -->
      <div v-if="status" class="sch-notes reveal">
        <h4>Important Notes</h4>
        <ul role="list">
          <li>
            <strong>Stacking Rules:</strong> You may select ONE academic scholarship, ONE affiliation,
            up to TWO talent awards, up to TWO ministry support scholarships, and ONE need-based award.
            Stackable extras can be added on top of everything!
          </li>
          <li><strong>Campus Living:</strong> NU scholarship offers of 75% or more are contingent on living on campus.</li>
          <li>
            <strong>Variable Amounts:</strong> Some scholarships have ranges based on audition results,
            financial need, or program specifics. Use the slider to estimate your award.
          </li>
          <li>
            <strong>This is an estimate:</strong> Final scholarship amounts are determined by the
            Financial Aid Office based on your application and supporting documents.
          </li>
          <li>Questions? Contact the <a href="https://www.northwestu.edu/financial-aid" target="_blank" rel="noopener">Financial Aid Office</a> for personalized assistance.</li>
        </ul>
        <p class="sch-footer-line">
          Northwest University &middot; 2027&ndash;28 Academic Year &middot; Estimated Tuition: {{ fmt(TUITION) }}/year
        </p>
      </div>

    </div>
  </section>
</template>
