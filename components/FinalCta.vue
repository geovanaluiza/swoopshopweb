<script setup lang="ts">
const config = useRuntimeConfig()
const formspreeUrl = (config.public as { FORMSPREE_URL?: string }).FORMSPREE_URL ?? ''

const email = ref('')
const program = ref('')
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const onSubmit = async () => {
  if (!emailRe.test(email.value) || !program.value) return
  status.value = 'loading'
  try {
    if (formspreeUrl) {
      await fetch(formspreeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: email.value, program: program.value, firstName: '', lastName: '', consent: true, modality: 'Both' }),
      })
    } else {
      await $fetch('/api/lead', {
        method: 'POST',
        body: { email: email.value, program: program.value, firstName: '', lastName: '', consent: true, modality: 'Both' },
      })
    }
    status.value = 'success'
    email.value = ''
    program.value = ''
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section class="final-cta" id="final-cta">
    <div class="container final-grid">
      <div class="final-copy reveal">
        <h2 class="section-title">One packet. Zero pressure.</h2>
      </div>

      <div class="reveal">
        <div v-if="status === 'success'" class="final-success" role="status">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p>You're in — check your inbox shortly.</p>
        </div>

        <form v-else class="mini-form" novalidate @submit.prevent="onSubmit">
          <div>
            <label class="final-label" for="m_email">Email address</label>
            <input
              id="m_email"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              placeholder="you@email.com"
              required
            />
          </div>

          <div>
            <label class="final-label" for="m_program">Program of interest</label>
            <select id="m_program" v-model="program" name="program" required>
              <option value="" disabled>Choose a program</option>
              <option>Nursing (BSN)</option>
              <option>Computer Science</option>
              <option>Business</option>
              <option>Music Production</option>
              <option>Psychology</option>
              <option>Physician Assistant Studies</option>
              <option>Undecided</option>
            </select>
          </div>

          <button
            type="submit"
            class="btn btn-tour btn-block"
            :class="{ 'is-loading': status === 'loading' }"
            :disabled="status === 'loading'"
          >
            <span class="btn-label">Send my packet</span>
            <span class="btn-spinner" aria-hidden="true"></span>
          </button>

          <p class="final-trust">
            Free · No obligation · 1-day reply
          </p>
          <p class="final-verse" aria-label="Biblical verse">
            <em>"Pois para Deus nada é impossível."</em><br />
            <span>— Lucas 1:37</span>
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.final-success {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: rgba(68, 186, 130, .15);
  border: 1px solid rgba(68, 186, 130, .3);
  border-radius: var(--border-radius-6);
  color: #7dd9b2;
  font-size: var(--font-size-2);
  font-weight: 700;
}
.final-label {
  display: block;
  font-size: var(--font-size-1);
  font-weight: 700;
  color: rgba(255,255,255,.7);
  letter-spacing: var(--letter-spacing-4);
  text-transform: uppercase;
  margin-bottom: 8px;
}
.final-trust {
  text-align: center;
  font-size: var(--font-size-1);
  color: rgba(255,255,255,.5);
  letter-spacing: var(--letter-spacing-4);
  text-transform: uppercase;
}
.final-verse {
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,.1);
  font-size: var(--font-size-2);
  color: rgba(255,255,255,.45);
  line-height: var(--line-height-4);
}
.final-verse em {
  font-style: italic;
  color: rgba(255,255,255,.65);
}
.final-verse span {
  font-size: var(--font-size-1);
  letter-spacing: var(--letter-spacing-4);
  opacity: .7;
}
</style>
