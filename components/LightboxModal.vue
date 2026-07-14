<script setup lang="ts">
interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

const props = defineProps<{
  images: GalleryImage[]
  modelValue: boolean
  startIndex?: number
}>()

const emit = defineEmits<{
  'update:modelValue': [val: boolean]
}>()

const current = ref(props.startIndex ?? 0)
const dialogRef = ref<HTMLElement | null>(null)
let prevFocus: HTMLElement | null = null

watch(() => props.modelValue, (open) => {
  if (open) {
    current.value = props.startIndex ?? 0
    prevFocus = document.activeElement as HTMLElement
    nextTick(() => {
      dialogRef.value?.querySelector<HTMLElement>('[data-close]')?.focus()
    })
  } else {
    prevFocus?.focus()
  }
})

watch(() => props.startIndex, (i) => { if (i !== undefined) current.value = i })

const close = () => emit('update:modelValue', false)
const prev = () => { current.value = (current.value - 1 + props.images.length) % props.images.length }
const next = () => { current.value = (current.value + 1) % props.images.length }

const onKeydown = (e: KeyboardEvent) => {
  if (!props.modelValue) return
  if (e.key === 'Escape') { e.preventDefault(); close() }
  if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
  if (e.key === 'ArrowRight') { e.preventDefault(); next() }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

const currentImage = computed(() => props.images[current.value])
</script>

<template>
  <Teleport to="body">
    <Transition name="lb-fade">
      <div
        v-if="modelValue"
        class="lb-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Campus photo gallery"
        @click.self="close"
      >
        <div ref="dialogRef" class="lb-dialog">
          <!-- Close -->
          <button class="lb-close" data-close @click="close" aria-label="Close gallery">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>

          <!-- Counter -->
          <div class="lb-counter" aria-live="polite">
            {{ current + 1 }} / {{ images.length }}
          </div>

          <!-- Image -->
          <div class="lb-stage">
            <Transition name="lb-img" mode="out-in">
              <figure :key="current" class="lb-figure">
                <img
                  :src="currentImage.src"
                  :alt="currentImage.alt"
                  class="lb-img"
                />
                <figcaption v-if="currentImage.caption" class="lb-caption">
                  {{ currentImage.caption }}
                </figcaption>
              </figure>
            </Transition>
          </div>

          <!-- Navigation -->
          <button class="lb-nav lb-nav-prev" @click="prev" aria-label="Previous photo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="lb-nav lb-nav-next" @click="next" aria-label="Next photo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- Thumbnails -->
          <div class="lb-thumbs" role="list" aria-label="Gallery thumbnails">
            <button
              v-for="(img, i) in images"
              :key="img.src"
              class="lb-thumb"
              :class="{ 'is-active': i === current }"
              role="listitem"
              :aria-label="img.alt"
              :aria-current="i === current ? 'true' : undefined"
              @click="current = i"
            >
              <img :src="img.src" :alt="img.alt" loading="lazy" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lb-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.88);
  display: grid;
  place-items: center;
  padding: 20px;
}

.lb-dialog {
  position: relative;
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.lb-close {
  position: absolute;
  top: -48px;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.2s ease;
  z-index: 10;
}
.lb-close:hover { background: rgba(255, 255, 255, 0.22); }

.lb-counter {
  color: rgba(255, 255, 255, 0.6);
  font-size: var(--font-size-1);
  letter-spacing: var(--letter-spacing-4);
}

.lb-stage {
  width: 100%;
  max-height: 65vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lb-figure {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.lb-img {
  max-width: 100%;
  max-height: 60vh;
  object-fit: contain;
  border-radius: var(--border-radius-4);
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.5);
}

.lb-caption {
  color: rgba(255, 255, 255, 0.75);
  font-size: var(--font-size-2);
  text-align: center;
}

.lb-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-80%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  z-index: 10;
}
.lb-nav:hover { background: rgba(255, 255, 255, 0.2); transform: translateY(-80%) scale(1.05); }
.lb-nav-prev { left: -60px; }
.lb-nav-next { right: -60px; }

@media (max-width: 700px) {
  .lb-nav-prev { left: 0; }
  .lb-nav-next { right: 0; }
}

.lb-thumbs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 4px;
  max-width: 100%;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.2) transparent;
}

.lb-thumb {
  flex: none;
  width: 56px;
  height: 42px;
  border-radius: var(--border-radius-3);
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  transition: border-color 0.2s ease, opacity 0.2s ease;
  opacity: 0.55;
  padding: 0;
  background: none;
}
.lb-thumb:hover { opacity: 0.85; }
.lb-thumb.is-active { border-color: var(--nu-tour); opacity: 1; }
.lb-thumb img { width: 100%; height: 100%; object-fit: cover; }

/* Transitions */
.lb-fade-enter-active,
.lb-fade-leave-active { transition: opacity 0.25s ease; }
.lb-fade-enter-from,
.lb-fade-leave-to { opacity: 0; }

.lb-img-enter-active,
.lb-img-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.lb-img-enter-from { opacity: 0; transform: scale(0.97); }
.lb-img-leave-to { opacity: 0; transform: scale(1.02); }
</style>
