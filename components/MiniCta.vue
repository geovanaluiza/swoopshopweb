<script setup lang="ts">
const props = defineProps<{ ctaLabel?: string }>()
const email = ref('')
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const submit = async () => {
  if (!emailRe.test(email.value)) return
  status.value = 'loading'
  try {
    await $fetch('/api/lead', {
      method: 'POST',
      body: { email: email.value, program: '', consent: true, firstName: '', lastName: '', modality: 'Both' }
    })
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <div class="mini-cta reveal">
    <div class="mini-cta-inner">
      <p class="mini-cta-label">{{ props.ctaLabel || 'Ready to learn more?' }}</p>
      <form v-if="status !== 'success'" class="mini-form" novalidate @submit.prevent="submit">
        <input
          v-model="email"
          type="email"
          autocomplete="email"
          placeholder="Your email address"
          required
        />
        <button
          type="submit"
          class="btn btn-primary"
          :class="{ 'is-loading': status === 'loading' }"
          :disabled="status === 'loading'"
        >
          <span class="btn-label">{{ props.ctaLabel ? 'Send me info' : 'Get My Free Info Packet' }}</span>
          <span class="btn-spinner" aria-hidden="true"></span>
        </button>
      </form>
      <p v-else class="mini-success">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        You're in — check your inbox!
      </p>
    </div>
  </div>
</template>

<style scoped>
.mini-cta {
  padding: clamp(48px, 6vw, 72px) 0;
  background: var(--nu-wisp);
}
.mini-cta-inner {
  max-width: 560px;
  margin: 0 auto;
  padding: 32px;
  text-align: center;
  background: rgba(255,255,255,.65);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,.7);
  border-radius: var(--border-radius-7);
  box-shadow: 0 8px 32px rgba(0,38,61,.08);
}
.mini-cta-label {
  font-family: var(--font-family-serif);
  font-weight: 700;
  font-size: 1.3rem;
  color: var(--nu-midnight);
  margin-bottom: 16px;
}
.mini-form {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.mini-form input[type=email] {
  flex: 1 1 200px;
  padding: 12px 16px;
  border: 1px solid rgba(255,255,255,.8);
  border-radius: var(--border-radius-4);
  background: rgba(255,255,255,.7);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  font-size: var(--font-size-2);
  color: var(--nu-midnight);
  outline: none;
  transition: border-color .2s ease, box-shadow .2s ease;
}
.mini-form input[type=email]::placeholder { color: var(--nu-navy); opacity: .5; }
.mini-form input[type=email]:focus {
  border-color: var(--nu-blue);
  box-shadow: 0 0 0 3px rgba(0,104,187,.15);
}
.mini-success {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--nu-blue);
  font-weight: 700;
  font-size: var(--font-size-2);
}
</style>
