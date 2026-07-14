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

defineExpose({ form, root })
</script>

<template>
  <aside ref="root" class="card form-card reveal" id="request" aria-labelledby="formTitle">
    <div class="form-card-header">
      <p class="form-eyebrow">Free · No commitment</p>
      <h2 id="formTitle" class="form-title">Get my free info packet</h2>
      <p class="form-sub">Tell us a bit about you. We'll send a tailored packet within 1 business day.</p>
    </div>

    <form id="leadForm" class="lead-form" novalidate @submit.prevent="onSubmit">
      <div class="field-row">
        <div class="field" :class="{ 'has-error': form.errors.firstName }">
          <label for="firstName">First name</label>
          <input
            id="firstName" v-model="form.state.firstName" name="firstName"
            type="text" autocomplete="given-name" required
          />
          <span class="err">{{ form.errors.firstName || '' }}</span>
        </div>
        <div class="field" :class="{ 'has-error': form.errors.lastName }">
          <label for="lastName">Last name</label>
          <input
            id="lastName" v-model="form.state.lastName" name="lastName"
            type="text" autocomplete="family-name" required
          />
          <span class="err">{{ form.errors.lastName || '' }}</span>
        </div>
      </div>

      <div class="field" :class="{ 'has-error': form.errors.email }">
        <label for="email">Email</label>
        <input
          id="email" v-model="form.state.email" name="email"
          type="email" autocomplete="email" required
        />
        <span class="err">{{ form.errors.email || '' }}</span>
      </div>

      <div class="field">
        <label for="phone">Phone <span class="opt">(optional)</span></label>
        <input
          id="phone" v-model="form.state.phone" name="phone"
          type="tel" autocomplete="tel" inputmode="tel" placeholder="(555) 555-5555"
        />
      </div>

      <div class="field" :class="{ 'has-error': form.errors.program }">
        <label for="program">Program of interest</label>
        <select id="program" v-model="form.state.program" name="program" required>
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

      <fieldset class="field">
        <legend>How would you like to study?</legend>
        <div class="radio-row">
          <label class="radio">
            <input v-model="form.state.modality" type="radio" name="modality" value="On Campus" />
            <span>On Campus</span>
          </label>
          <label class="radio">
            <input v-model="form.state.modality" type="radio" name="modality" value="Online" />
            <span>Online</span>
          </label>
          <label class="radio">
            <input v-model="form.state.modality" type="radio" name="modality" value="Both" />
            <span>Both</span>
          </label>
        </div>
      </fieldset>

      <div>
        <label class="check">
          <input v-model="form.state.consent" id="consent" type="checkbox" required />
          <span>I agree to be contacted by Northwest University about admissions. We won't share your info.</span>
        </label>
        <span class="err">{{ form.errors.consent || '' }}</span>
      </div>

      <button
        type="submit"
        class="btn btn-primary btn-block"
        :class="{ 'is-loading': form.status.value === 'loading' }"
        :disabled="form.status.value === 'loading' || form.status.value === 'success'"
      >
        <span class="btn-label">Get My Free Info Packet</span>
        <span class="btn-spinner" aria-hidden="true"></span>
      </button>

      <p class="form-foot">
        Rated <strong>3.9/5</strong> on Niche · <strong>#10 in Washington</strong>
      </p>

      <div
        v-if="form.status.value === 'success'"
        id="formSuccess"
        class="form-success"
        role="status"
        aria-live="polite"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div>
          <strong>You're in.</strong>
          Check your inbox — your tailored info packet is on its way.
        </div>
      </div>
    </form>
  </aside>
</template>
