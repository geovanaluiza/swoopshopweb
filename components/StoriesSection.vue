<script setup lang="ts">
/* TODO: testimonials — replace these placeholder quotes with real,
   attributed student testimonials from current NU marketing
   collateral (name, class year, program). */
const stories = [
  {
    quote: "I came for the nursing program. I stayed because my professors knew me, my faith group became family, and I graduated with two clinical rotations already on my resume.",
    name: 'Nursing student',
    meta: "Class of '25 · placeholder",
    avatar: '/student-1.jpg',
  },
  {
    quote: "The Creatio studio is the reason I picked NU over a bigger music school. I left with a real credit on a real album and a producer I still work with.",
    name: 'Music Production major',
    meta: "Class of '24 · placeholder",
    avatar: '/student-2.jpg',
  },
  {
    quote: "Faith here isn't a box to check. It changed how I lead, how I work, and honestly what kind of person I want to be after I graduate.",
    name: 'Business major',
    meta: "Class of '25 · placeholder",
    avatar: '/student-3.jpg',
  },
]
</script>

<template>
  <section class="stories" id="stories">
    <div class="container">
      <header class="section-head reveal">
        <p class="eyebrow">In their words</p>
        <h2 class="section-title">What students say after the fact.</h2>
        <p class="section-sub">
          Placeholder quotes — replace with real, attributed student testimonials from current NU marketing collateral.
        </p>
      </header>

      <div class="story-grid">
        <article v-for="(s, i) in stories" :key="i" class="story reveal">
          <p class="quote">{{ s.quote }}</p>
          <footer class="by">
            <img class="avatar" :src="s.avatar" alt="" loading="lazy" />
            <div>
              <strong>{{ s.name }}</strong>
              <span>{{ s.meta }}</span>
            </div>
          </footer>
        </article>
      </div>

      <p class="review-line">
        Students rate NU <strong>3.9 / 5</strong> on Niche — read hundreds of verified reviews at
        <a href="https://www.niche.com/colleges/northwest-university/" target="_blank" rel="noopener">niche.com</a>.
      </p>
    </div>
  </section>
</template>
