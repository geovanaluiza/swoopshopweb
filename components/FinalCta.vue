<script setup lang="ts">
const email = ref('')
const program = ref('')
const submitted = ref(false)
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const onSubmit = () => {
  if (!emailRe.test(email.value) || !program.value) return
  /* TODO: wire to /api/lead */
  submitted.value = true
  email.value = ''
  program.value = ''
}
</script>

<template>
  <section class="final-cta" id="final-cta">
    <div class="container final-grid">
      <div class="final-copy reveal">
        <h2 class="section-title">One packet. Zero pressure.</h2>
      </div>

      <form id="leadFormMini" class="mini-form reveal" novalidate @submit.prevent="onSubmit">
        <label class="sr-only" for="m_email">Email</label>
        <input id="m_email" v-model="email" name="email" type="email" autocomplete="email" placeholder="you@email.com" required />

        <label class="sr-only" for="m_program">Program</label>
        <select id="m_program" v-model="program" name="program" required>
          <option value="" disabled>Program of interest</option>
          <option>Nursing (BSN)</option>
          <option>Computer Science</option>
          <option>Business</option>
          <option>Music Production</option>
          <option>Psychology</option>
          <option>Physician Assistant Studies</option>
          <option>Undecided</option>
        </select>

        <button type="submit" class="btn btn-tour">Send my packet</button>
        <p v-if="submitted" class="mini-success">Thanks — check your inbox shortly.</p>
      </form>
    </div>
  </section>
</template>
