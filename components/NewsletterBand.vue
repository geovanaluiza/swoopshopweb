<script setup lang="ts">
import { PICKUP_INFO } from '~/composables/useCheckout'

const email = ref('')
const submitted = ref(false)
const onSubmit = () => {
  if (!email.value.includes('@')) return
  submitted.value = true
  email.value = ''
}
</script>

<template>
  <section class="section newsletter">
    <div class="container newsletter-inner">
      <div>
        <p class="eyebrow">Join the flock</p>
        <h2 style="margin-top: 12px;">10% off your first pickup order.</h2>
        <p style="color: var(--muted-fg); margin-top: 12px; max-width: 52ch;">
          New drops, restocks, and exclusive student-only deals — delivered twice a month.
        </p>
      </div>
      <form @submit.prevent="onSubmit">
        <label for="news-email" class="sr-only">Email address</label>
        <input
          id="news-email"
          v-model="email"
          type="email"
          required
          placeholder="you@email.com"
        />
        <button type="submit" class="btn btn-primary">
          {{ submitted ? 'Welcome aboard ✦' : 'Get my code' }}
        </button>
      </form>
    </div>
  </section>
</template>
