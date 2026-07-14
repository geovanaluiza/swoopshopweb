<script setup lang="ts">
import LeadForm from './LeadForm.vue'
</script>

<template>
  <section class="hero">
    <div class="hero-media" aria-hidden="true">
      <img src="/hero-1.jpg" alt="" loading="eager" fetchpriority="high" />
      <div class="hero-media-scrim"></div>
    </div>

    <div class="container hero-grid">
      <div class="hero-copy reveal">
        <p class="eyebrow eyebrow-light">Northwest University · Kirkland, WA</p>
        <h1 class="display">
          Find Your Faith.<br />
          <span class="serif-italic">Follow Your Future.</span>
        </h1>
        <p class="lede">
          A Christ-centered community on 56 wooded acres, ten minutes from Seattle.
          Every program includes a real internship. Every student is known by name.
        </p>

        <ul class="hero-points" role="list">
          <li><span class="bullet" aria-hidden="true"></span> 100% of programs include hands-on internships</li>
          <li><span class="bullet" aria-hidden="true"></span> 94% of grads employed or in grad school within 6 months</li>
          <li><span class="bullet" aria-hidden="true"></span> 90% say their faith grew at NU</li>
        </ul>

        <a href="#programs" class="link-arrow link-arrow-light">
          Explore programs
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>

      <LeadForm />
    </div>
  </section>
</template>
