<script setup lang="ts">
import LeadForm from './LeadForm.vue'
</script>

<template>
  <section class="hero">
    <div class="hero-media" aria-hidden="true">
      <img src="/snow-lake.jpg" alt="" loading="eager" fetchpriority="high" />
      <div class="hero-media-scrim"></div>
    </div>

    <div class="container hero-grid">
      <div class="hero-copy reveal">
        <p class="eyebrow eyebrow-light">Kirkland, WA</p>
        <h1 class="display">
          Find Your Faith.<br />
          <span class="serif-italic">Follow Your Future.</span>
        </h1>
        <p class="lede">
          56 wooded acres, ten minutes from Seattle.
        </p>

        <ul class="hero-points" role="list">
          <li><span class="bullet" aria-hidden="true"></span> 100% of programs include real internships</li>
          <li><span class="bullet" aria-hidden="true"></span> 94% of grads employed or in grad school within 6 months</li>
        </ul>
      </div>

      <LeadForm />
    </div>
  </section>
</template>
