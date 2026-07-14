<script setup lang="ts">
// TODO: Replace these 3 placeholder testimonials with real quotes from actual NU students.
// Each quote needs:
//   - Written permission from the student to use their words + photo
//   - Confirmation of their program/year
//   - Approval from Marketing before publishing
const stories = [
  {
    quote: "My professors knew me. My faith group became family. I graduated with two clinical rotations already on my résumé.",
    name: 'Nursing student',
    meta: "Class of '25",
    avatar: '/life-1.jpg',
    photo: '/life-1.jpg',
  },
  {
    quote: "The Creatio studio is why I picked NU. I left with a real credit on a real album.",
    name: 'Music Production major',
    meta: "Class of '24",
    avatar: '/chapel-1.jpg',
    photo: '/chapel-1.jpg',
  },
  {
    quote: "Faith here changed how I lead, how I work, and the kind of person I want to be.",
    name: 'Business major',
    meta: "Class of '25",
    avatar: '/life-3.jpg',
    photo: '/life-3.jpg',
  },
]
</script>

<template>
  <section class="stories" id="stories">
    <div class="container">
      <header class="section-head reveal">
        <h2 class="section-title">In their words.</h2>
      </header>

      <div class="story-grid">
        <article v-for="(s, i) in stories" :key="i" class="story reveal">
          <div class="story-photo">
            <img :src="s.photo" :alt="s.name" loading="lazy" />
          </div>
          <div class="story-body">
            <p class="quote">{{ s.quote }}</p>
            <footer class="by">
              <img class="avatar" :src="s.avatar" alt="" loading="lazy" />
              <div>
                <strong>{{ s.name }}</strong>
                <span>{{ s.meta }}</span>
              </div>
            </footer>
          </div>
        </article>
      </div>

      <p class="review-line">
        Students rate NU <strong>3.9 / 5</strong> on Niche —
        <a href="https://www.niche.com/colleges/northwest-university/" target="_blank" rel="noopener">read verified reviews</a>.
      </p>
    </div>
  </section>
</template>
