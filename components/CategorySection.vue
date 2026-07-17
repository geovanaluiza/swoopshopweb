<script setup lang="ts">
import type { ProductCategory } from '~/composables/useProducts'
import { CATEGORY_LABEL } from '~/composables/useProducts'
import { PICKUP_INFO } from '~/composables/useCheckout'

const props = defineProps<{
  category: ProductCategory
  id?: string
  title?: string
  subtitle?: string
}>()

const { list } = useProducts()
</script>

<template>
  <section :id="id ?? category" class="section">
    <div class="container">
      <header class="section-head">
        <div>
          <p class="eyebrow">Shop by category</p>
          <h2 class="section-title">{{ title ?? CATEGORY_LABEL[category] }}</h2>
        </div>
        <p class="section-sub">{{ subtitle ?? `The latest ${CATEGORY_LABEL[category].toLowerCase()} from SwoopShop.` }}</p>
      </header>

      <div class="product-grid">
        <ProductCard v-for="p in list(category)" :key="p.id" :product="p" />
      </div>
    </div>
  </section>
</template>
