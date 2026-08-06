<script setup lang="ts">
import type { Product } from '~/composables/useProducts'

defineProps<{ product: Product }>()
</script>

<template>
  <NuxtLink :to="`/product/${product.slug}`" class="product-card" :aria-label="product.name">
    <div class="product-media">
      <img :src="product.image" :alt="product.imageAlt" loading="lazy" />
      <span v-if="product.badge" :class="['badge', `badge-${product.badge.toLowerCase().replace(' ', '')}`]">
        {{ product.badge }}
      </span>
      <span class="quick-add">View details →</span>
    </div>
    <div class="product-body">
      <p class="product-collection">{{ product.collection }}</p>
      <h3 class="product-title">{{ product.name }}</h3>
      <div class="product-swatches" v-if="product.colors && product.colors.length">
        <span
          v-for="c in product.colors.slice(0, 4)"
          :key="c.id"
          class="swatch"
          :style="{ background: c.hex }"
          :title="c.name"
        />
      </div>
    </div>
  </NuxtLink>
</template>
