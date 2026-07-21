<script setup lang="ts">
const { items, subtotal, remove, updateQty } = useCart()
const { formatPrice } = useProducts()
const { enabled, checkout, checkingOut } = useShopifyCart()
const error = ref('')

const canShopifyCheckout = computed(() =>
  enabled.value && items.value.length > 0 && items.value.every(it => it.variantId)
)

const goToShopifyCheckout = async () => {
  error.value = ''
  try {
    const url = await checkout(
      items.value.map(it => ({ variantId: it.variantId!, qty: it.qty }))
    )
    window.location.href = url
  } catch (e: any) {
    error.value = e?.message ?? 'Could not start checkout. Please try again.'
  }
}
</script>

<template>
  <main class="container cart-page">
    <p class="eyebrow">Your bag</p>
    <h1>{{ items.length === 0 ? 'Your bag is empty' : 'Your bag' }}</h1>
    <p v-if="items.length > 0" style="color: var(--muted-fg); margin-bottom: var(--space-7);">
      {{ items.length }} {{ items.length === 1 ? 'item' : 'items' }} · ready for pickup at the Student Center – Pecota.
    </p>

    <div v-if="items.length === 0" class="empty-cart">
      <h2>Nothing here yet</h2>
      <p>Start exploring — our most-loved drop just restocked.</p>
      <NuxtLink to="/" class="btn btn-primary">Continue shopping →</NuxtLink>
    </div>

    <div v-else class="cart-layout">
      <ul class="cart-list">
        <li v-for="item in items" :key="item.key" class="cart-line">
          <img :src="item.image" :alt="item.name" />
          <div>
            <h3>{{ item.name }}</h3>
            <p v-if="item.variant" class="meta">{{ item.variant }}</p>
            <button class="remove" type="button" @click="remove(item.key)">Remove</button>
          </div>
          <div>
            <div class="qty-control">
              <button type="button" @click="updateQty(item.key, item.qty - 1)" aria-label="Decrease">−</button>
              <span>{{ item.qty }}</span>
              <button type="button" @click="updateQty(item.key, item.qty + 1)" aria-label="Increase">+</button>
            </div>
            <p class="cart-line-total" style="margin-top: 16px; text-align: right;">{{ formatPrice(item.price * item.qty) }}</p>
          </div>
        </li>
      </ul>

      <aside class="cart-summary">
        <h2>Order summary</h2>
        <div class="summary-row"><span>Subtotal</span><strong>{{ formatPrice(subtotal) }}</strong></div>
        <div class="summary-row"><span>Pickup</span><strong>Free</strong></div>
        <div class="summary-row total"><span>Total</span><strong>{{ formatPrice(subtotal) }}</strong></div>

        <div class="pickup-info">
          <strong>Pickup at the Student Center – Pecota</strong>
          5520 108th Ave NE · Kirkland WA 98033<br />
          Mon–Fri · 9:00 AM – 5:00 PM<br />
          Saturday · 10:00 AM – 2:00 PM
        </div>

        <button
          v-if="canShopifyCheckout"
          type="button"
          class="btn btn-primary btn-block btn-checkout"
          :disabled="checkingOut"
          @click="goToShopifyCheckout"
        >
          {{ checkingOut ? 'Preparing checkout…' : 'Checkout — pickup only →' }}
        </button>
        <NuxtLink v-else to="/checkout" class="btn btn-primary btn-block btn-checkout">Continue to pickup details →</NuxtLink>
        <p v-if="error" style="color: #b3261e; font-size: var(--font-size-1); text-align: center; margin-top: 10px;">{{ error }}</p>
        <p style="text-align: center; margin-top: 16px;">
          <NuxtLink to="/" style="color: var(--nu-blue); font-weight: 700; font-size: var(--font-size-2);">Continue shopping</NuxtLink>
        </p>
      </aside>
    </div>
  </main>
</template>
