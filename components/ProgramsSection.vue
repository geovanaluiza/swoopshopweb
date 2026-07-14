<script setup lang="ts">
import { usePrograms } from '~/composables/usePrograms'

const { activeTab, list } = usePrograms()
const form = useLeadForm()

const tabs: Array<typeof activeTab.value> = ['On Campus', 'Graduate', 'Online']

const onCardClick = (title: string) => {
  form.setProgram(title)
  const target = document.getElementById('request')
  if (target) {
    const top = target.getBoundingClientRect().top + window.scrollY - 70
    window.scrollTo({ top, behavior: 'smooth' })
    setTimeout(() => document.getElementById('firstName')?.focus(), 600)
  }
}
</script>

<template>
  <section class="programs" id="programs">
    <div class="container">
      <header class="section-head reveal">
        <p class="eyebrow">Programs</p>
        <h2 class="section-title">Pick a path. We'll send the details.</h2>
      </header>

      <div class="program-tabs" role="tablist" aria-label="Program modality">
        <button
          v-for="t in tabs"
          :key="t"
          class="tab"
          :class="{ 'is-active': activeTab === t }"
          role="tab"
          :aria-selected="activeTab === t"
          @click="activeTab = t"
        >
          {{ t }}
        </button>
      </div>

      <div class="program-grid">
        <article v-for="p in list" :key="p.title" class="program-card reveal">
          <div
            class="program-media"
            :style="{ backgroundImage: `url(${p.image})` }"
            role="img"
            :aria-label="p.title"
          />
          <div class="program-body">
            <span class="program-meta">{{ p.meta }}</span>
            <h3>{{ p.title }}</h3>
            <p class="program-desc">{{ p.desc }}</p>
            <a
              href="#request"
              class="program-cta"
              @click.prevent="onCardClick(p.title)"
            >
              See this program
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
