<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { ProductVariantColor } from '~/composables/useProducts'

const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))
const { find, formatPrice } = useProducts()
const product = computed(() => find(slug.value))

const size = ref(product.value?.sizes?.[1] ?? product.value?.sizes?.[0] ?? '')
const color = ref<ProductVariantColor | undefined>(product.value?.colors?.[0])
const qty = ref(1)
const added = ref(false)

const { add } = useCart()
const onAdd = () => {
  if (!product.value) return
  const variant = [size.value, color.value?.name].filter(Boolean).join(' · ')

  // Resolve the Shopify variant matching the selected size/color
  const shopifyProduct = product.value as { variants?: { id: string; size?: string; color?: string; available: boolean }[]; variantId?: string }
  let variantId = shopifyProduct.variantId
  if (shopifyProduct.variants?.length) {
    const match = shopifyProduct.variants.find(v =>
      (!v.size || v.size === size.value) &&
      (!v.color || v.color === color.value?.name) &&
      v.available
    ) ?? shopifyProduct.variants.find(v => v.available)
    if (match) variantId = match.id
  }

  add({ ...product.value, variantId }, variant)
  added.value = true
  setTimeout(() => (added.value = false), 1800)
}

useHead(() => ({
  title: product.value ? `${product.value.name} — SwoopShop` : 'Product — SwoopShop'
}))
</script>

<template>
  <div>
    <main v-if="product" class="container product-page">
      <nav class="crumbs">
        <NuxtLink to="/">Shop</NuxtLink>
        <span aria-hidden="true">›</span>
        <a :href="`/#${product.category}`">{{ product.collection }}</a>
        <span aria-hidden="true">›</span>
        <span>{{ product.name }}</span>
      </nav>

      <div class="product-layout">
        <div class="product-gallery">
          <img :src="product.image" :alt="product.imageAlt" />
        </div>

        <div class="detail">
          <p class="collection-label">{{ product.collection }}</p>
          <h1>{{ product.name }}</h1>
          <p class="price-line">
            <span v-if="product.compareAt" class="compare">{{ formatPrice(product.compareAt) }}</span>
            <span :class="{ 'price-sale': product.compareAt }">{{ formatPrice(product.price) }}</span>
          </p>
          <p class="desc">{{ product.description }}</p>

          <div class="option-block" v-if="product.colors && product.colors.length > 1">
            <label>Color · <strong style="color: var(--nu-blue);">{{ color?.name ?? 'Pick a color' }}</strong></label>
            <div class="color-row">
              <button
                v-for="c in product.colors"
                :key="c.id"
                type="button"
                :class="['color-chip', { 'is-active': color?.id === c.id }]"
                :aria-label="c.name"
                @click="color = c"
              >
                <span :style="{ background: c.hex }" />
              </button>
            </div>
          </div>

          <div class="option-block" v-if="product.sizes && product.sizes.length > 1">
            <label>Size</label>
            <div class="size-row">
              <button
                v-for="s in product.sizes"
                :key="s"
                type="button"
                :class="['chip', { 'is-active': size === s }]"
                @click="size = s"
              >
                {{ s }}
              </button>
            </div>
          </div>

          <div class="add-row">
            <div class="btn-qty">
              <button type="button" @click="qty = Math.max(1, qty - 1)" aria-label="Decrease">−</button>
              <span>{{ qty }}</span>
              <button type="button" @click="qty = qty + 1" aria-label="Increase">+</button>
            </div>
            <button class="btn btn-primary" type="button" @click="onAdd">
              {{ added ? 'Added to bag ✓' : 'Add to bag' }}
            </button>
          </div>

          <div class="pickup-note">
            <span class="ico" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s7-7.6 7-13a7 7 0 0 0-14 0c0 5.4 7 13 7 13Z" stroke-linejoin="round" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </span>
            <div>
              <strong>Pickup only</strong>
              Pick up at the Student Center – Pecota, Mon–Fri 9–5. We'll text you when it's ready.
            </div>
          </div>
        </div>
      </div>
    </main>

    <main v-else class="container product-page">
      <div class="empty-cart">
        <h2>Product not found</h2>
        <p>It may have sold out or been removed.</p>
        <NuxtLink to="/" class="btn btn-primary">Back to shop</NuxtLink>
      </div>
    </main>
  </div>
</template>
