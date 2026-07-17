<script setup lang="ts">
const config = useRuntimeConfig()
const formspreeUrl = (config.public as { FORMSPREE_URL?: string }).FORMSPREE_URL ?? ''

const visible = ref(false)
const dismissed = ref(false)
const email = ref('')
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const submit = async () => {
  if (!emailRe.test(email.value)) return
  status.value = 'loading'
  try {
    if (formspreeUrl) {
      await fetch(formspreeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: email.value, firstName: '', lastName: '', program: '', consent: true, modality: 'Both' }),
      })
    } else {
      await $fetch('/api/lead', {
        method: 'POST',
        body: { email: email.value, firstName: '', lastName: '', program: '', consent: true, modality: 'Both' },
      })
    }
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}

const dismiss = () => {
  visible.value = false
  dismissed.value = true
  sessionStorage.setItem('exit-intent-dismissed', '1')
}

onMounted(() => {
  if (sessionStorage.getItem('exit-intent-dismissed')) return

  let triggered = false

  const onMouseMove = (e: MouseEvent) => {
    if (triggered || dismissed.value) return
    if (e.clientY > 80) return
    triggered = true
    visible.value = true
    document.removeEventListener('mousemove', onMouseMove)
  }

  document.addEventListener('mousemove', onMouseMove)

  onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove)
  })
})
</script>

<template>
  <Teleport to="body">
    <Transition name="exit-popup">
      <div v-if="visible" class="exit-overlay" role="dialog" aria-modal="true" aria-labelledby="exitTitle">
        <div class="exit-card">
          <button class="exit-close" @click="dismiss" aria-label="Dismiss">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>

          <div v-if="status === 'success'" class="exit-success" role="status">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>You're in — check your inbox!</p>
          </div>

          <template v-else>
            <p class="exit-eyebrow">Before you go</p>
            <h2 id="exitTitle" class="exit-title">Your free info packet is one click away.</h2>
            <p class="exit-body">
              Get everything you need to make your decision — programs, costs, and campus life, all in one packet.
            </p>

            <form class="exit-form" novalidate @submit.prevent="submit">
              <input
                v-model="email"
                type="email"
                autocomplete="email"
                placeholder="your@email.com"
                required
              />
              <button
                type="submit"
                class="btn btn-gold btn-block"
                :class="{ 'is-loading': status === 'loading' }"
                :disabled="status === 'loading'"
              >
                <span class="btn-label">Send me the free packet</span>
                <span class="btn-spinner" aria-hidden="true"></span>
              </button>
            </form>

            <button class="exit-no" @click="dismiss">No thanks, I'll keep browsing</button>
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.exit-overlay {
  position: fixed;
  inset: 0;
  z-index: 900;
  background: rgba(0, 0, 0, 0.65);
  display: grid;
  place-items: center;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.exit-card {
  position: relative;
  background: #fff;
  border-radius: var(--border-radius-8);
  padding: clamp(28px, 4vw, 44px);
  max-width: 460px;
  width: 100%;
  box-shadow: 0 32px 80px rgba(0, 38, 61, 0.4);
  text-align: center;
}

.exit-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 38, 61, 0.06);
  border: none;
  color: var(--nu-navy);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background .15s ease;
}
.exit-close:hover { background: rgba(0, 38, 61, 0.14); }

.exit-eyebrow {
  font-size: var(--font-size-1);
  font-weight: 700;
  letter-spacing: var(--letter-spacing-8);
  text-transform: uppercase;
  color: var(--nu-blue);
  margin-bottom: 10px;
}
.exit-title {
  font-family: var(--font-family-serif);
  font-weight: 700;
  font-size: clamp(1.3rem, 3vw, 1.7rem);
  color: var(--nu-midnight);
  margin-bottom: 10px;
  line-height: 1.2;
}
.exit-body {
  font-size: var(--font-size-2);
  color: var(--nu-navy);
  opacity: .75;
  line-height: var(--line-height-4);
  margin-bottom: 20px;
}
.exit-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.exit-form input {
  width: 100%;
  padding: 13px 16px;
  border: 1.5px solid rgba(0, 38, 61, 0.15);
  border-radius: var(--border-radius-4);
  font-size: var(--font-size-2);
  color: var(--nu-midnight);
  outline: none;
  transition: border-color .2s ease, box-shadow .2s ease;
  text-align: center;
}
.exit-form input::placeholder { color: var(--nu-navy); opacity: .4; }
.exit-form input:focus {
  border-color: var(--nu-blue);
  box-shadow: 0 0 0 3px rgba(0, 104, 187, .15);
}
.exit-no {
  display: block;
  margin-top: 12px;
  background: none;
  border: none;
  color: var(--nu-navy);
  opacity: .5;
  font-size: var(--font-size-1);
  cursor: pointer;
  transition: opacity .2s ease;
  padding: 4px;
}
.exit-no:hover { opacity: .8; }

.exit-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  color: var(--nu-evergreen);
  font-weight: 700;
  font-size: var(--font-size-3);
}

/* Transitions */
.exit-popup-enter-active,
.exit-popup-leave-active { transition: opacity .25s ease; }
.exit-popup-enter-active .exit-card,
.exit-popup-leave-active .exit-card { transition: transform .25s ease, opacity .25s ease; }
.exit-popup-enter-from,
.exit-popup-leave-to { opacity: 0; }
.exit-popup-enter-from .exit-card { transform: scale(.95) translateY(12px); }
.exit-popup-leave-to .exit-card { transform: scale(.97) translateY(8px); opacity: 0; }
</style>
