<script setup lang="ts">
const form = useLeadForm()
const root = ref<HTMLElement | null>(null)

const onSubmit = async () => {
  const ok = await form.submit()
  if (ok && root.value) {
    const success = root.value.querySelector('#formSuccess') as HTMLElement | null
    success?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>

<template>
  <aside ref="root" class="card form-card reveal" id="request" aria-labelledby="formTitle">
    <div class="form-card-header">
      <div class="form-trust">
        <span class="trust-chip">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Free
        </span>
        <span class="trust-chip">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          No obligation
        </span>
        <span class="trust-chip">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          1-day reply
        </span>
      </div>
      <h2 id="formTitle" class="form-title">Get my info packet</h2>
    </div>

    <div v-if="form.status.value === 'error'" class="form-error" role="alert">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div>
        <strong>Something went wrong.</strong>
        Please try again or email us directly.
      </div>
    </div>

    <div v-if="form.status.value === 'success'" id="formSuccess" class="form-success" role="status" aria-live="polite">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <div>
        <strong>You're in.</strong>
        Check your inbox — your tailored info packet is on its way.
      </div>
    </div>

    <form v-else id="leadForm" class="lead-form" novalidate @submit.prevent="form.step.value === 1 ? form.nextStep() : onSubmit()">
      <template v-if="form.step.value === 1">
        <div class="field-row">
          <div class="field" :class="{ 'has-error': form.errors.firstName }">
            <label for="firstName">First name</label>
            <input
              id="firstName" v-model="form.state.firstName" name="firstName"
              type="text" autocomplete="given-name" required placeholder="Maya"
              @blur="form.validateStep(1)"
            />
            <span class="err">{{ form.errors.firstName || '' }}</span>
          </div>
          <div class="field" :class="{ 'has-error': form.errors.lastName }">
            <label for="lastName">Last name</label>
            <input
              id="lastName" v-model="form.state.lastName" name="lastName"
              type="text" autocomplete="family-name" required placeholder="Thompson"
              @blur="form.validateStep(1)"
            />
            <span class="err">{{ form.errors.lastName || '' }}</span>
          </div>
        </div>

        <div class="field" :class="{ 'has-error': form.errors.email }">
          <label for="email">Email</label>
          <input
            id="email" v-model="form.state.email" name="email"
            type="email" autocomplete="email" required placeholder="maya@gmail.com"
            @blur="form.validateStep(1)"
          />
          <span class="err">{{ form.errors.email || '' }}</span>
        </div>

        <div class="field" :class="{ 'has-error': form.errors.program }">
          <label for="program">Program of interest</label>
          <select id="program" v-model="form.state.program" name="program" required @blur="form.validateStep(1)">
            <option value="" disabled>Choose a program</option>
            <option>Nursing (BSN)</option>
            <option>Computer Science</option>
            <option>Business</option>
            <option>Music Production</option>
            <option>Psychology</option>
            <option>Physician Assistant Studies</option>
            <option>Undecided — help me explore</option>
          </select>
          <span class="err">{{ form.errors.program || '' }}</span>
        </div>

        <div>
          <label class="check">
            <input v-model="form.state.consent" id="consent" type="checkbox" required />
            <span>I agree to be contacted by Northwest University about admissions. We'll never sell your information.</span>
          </label>
          <span class="err">{{ form.errors.consent || '' }}</span>
        </div>

        <button type="submit" class="btn btn-primary btn-block">
          <span class="btn-label">Continue →</span>
        </button>
      </template>

      <template v-else>
        <div class="field" :class="{ 'has-error': form.errors.phone }">
          <label for="phone">Phone <span class="opt">(optional)</span></label>
          <input
            id="phone" v-model="form.state.phone" name="phone"
            type="tel" autocomplete="tel" inputmode="tel" placeholder="(555) 555-5555"
          />
        </div>

        <fieldset class="field">
          <legend>How would you like to study?</legend>
          <div class="radio-row" role="group">
            <label class="radio" :class="{ 'is-active': form.state.modality === 'On Campus' }">
              <input v-model="form.state.modality" type="radio" name="modality" value="On Campus" />
              <span>On Campus</span>
            </label>
            <label class="radio" :class="{ 'is-active': form.state.modality === 'Online' }">
              <input v-model="form.state.modality" type="radio" name="modality" value="Online" />
              <span>Online</span>
            </label>
            <label class="radio" :class="{ 'is-active': form.state.modality === 'Both' }">
              <input v-model="form.state.modality" type="radio" name="modality" value="Both" />
              <span>Both</span>
            </label>
          </div>
        </fieldset>

        <div class="step-actions">
          <button type="button" class="btn btn-ghost-dark btn-sm" @click="form.prevStep()">
            ← Back
          </button>
          <button
            type="submit"
            class="btn btn-primary btn-block"
            :class="{ 'is-loading': form.status.value === 'loading' }"
            :disabled="form.status.value === 'loading'"
          >
            <span class="btn-label">Get My Free Info Packet</span>
            <span class="btn-spinner" aria-hidden="true"></span>
          </button>
        </div>
      </template>

      <p class="form-foot">
        Rated <strong>3.9/5</strong> on Niche · <strong>#10 in Washington</strong>
      </p>
    </form>
  </aside>
</template>

<style scoped>
.step-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}
.step-actions .btn-block { flex: 1; }
</style>
