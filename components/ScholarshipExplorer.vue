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
</script>

<template>
  <section class="sch" id="sch">
    <div class="container">
      <!-- Header -->
      <header class="sch-head reveal">
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
              <strong>Browse & Add Scholarships</strong>
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
            <span class="status-emoji" aria-hidden="true">🎓</span>
            <strong>First-Year Student</strong>
            <span>Starting college for the first time? This is you!</span>
          </button>
          <button class="status-card" @click="status = 'transfer'">
            <span class="status-emoji" aria-hidden="true">🔁</span>
            <strong>Transfer Student</strong>
            <span>Transferring from another college? We've got options for you!</span>
          </button>
        </div>
      </div>

      <!-- After status is chosen -->
      <div v-else class="sch-body">
        <!-- Category filters -->
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

        <!-- Scholarship cards -->
        <div class="sch-grid">
          <article
            v-for="s in SCHOLARSHIPS.filter((s) => activeCategory === 'all' || s.category === activeCategory)"
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
              <span class="cat-pill cat-{{ s.category }}">{{ s.category }}</span>
              <span class="sch-amt">{{ fmt(amountOf(s)) }}<span class="sch-amt-unit">/yr</span></span>
            </header>

            <h4>{{ s.title }}</h4>
            <p>{{ s.blurb }}</p>

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

            <footer class="sch-card-foot">
              <span class="renew">{{ s.renewable }}</span>
              <span class="add">{{ selectedIds.includes(s.id) ? '✓ Added' : '+ Add' }}</span>
            </footer>
          </article>
        </div>

        <!-- Sticky package summary (desktop) -->
        <aside class="sch-pkg">
          <header>
            <h3>Your Scholarship Package</h3>
            <span v-if="showPackage" class="pkg-count">{{ selectedScholarships.length }} selected</span>
          </header>

          <!-- Email gate -->
          <div v-if="!showPackage" class="pkg-gate">
            <p class="pkg-gate-copy">
              Enter your email to unlock your personalized scholarship estimate — we'll also send you the full breakdown.
            </p>
            <form v-if="gateStatus !== 'success'" class="pkg-gate-form" novalidate @submit.prevent="submitGate">
              <input
                v-model="gateEmail"
                type="email"
                autocomplete="email"
                placeholder="your@email.com"
                required
              />
              <button
                type="submit"
                class="btn btn-primary btn-block"
                :class="{ 'is-loading': gateStatus === 'loading' }"
                :disabled="gateStatus === 'loading'"
              >
                <span class="btn-label">See My Estimate</span>
                <span class="btn-spinner" aria-hidden="true"></span>
              </button>
            </form>
            <p v-else class="pkg-gate-success">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Check your inbox — here's your estimate!
            </p>
            <p class="pkg-gate-note">Free · No obligation · We'll never share your info</p>
          </div>

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
                  <span class="pkg-cat">{{ s.category }}</span>
                </div>
                <div class="pkg-right">
                  <span class="pkg-amt">{{ fmt(amountOf(s)) }}</span>
                  <button class="pkg-remove" type="button" @click="toggle(s)" aria-label="Remove">×</button>
                </div>
              </li>
            </ul>
            <p v-else class="pkg-empty">
              No scholarships selected yet.<br />
              Browse the options and add scholarships you qualify for!<br />
              <span class="pkg-tip">Tip: Click any scholarship card to add it</span>
            </p>

            <button v-if="selectedIds.length" class="pkg-reset" type="button" @click="reset">Reset package</button>
          </template>
        </aside>
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
          <li><strong>Questions?</strong> Contact the Financial Aid Office for personalized assistance.</li>
        </ul>
        <p class="sch-footer-line">
          Northwest University · 2027–28 Academic Year · Estimated Tuition: {{ fmt(TUITION) }}/year
        </p>
      </div>
    </div>
  </section>
</template>
