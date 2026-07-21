<script setup lang="ts">
import { PICKUP_SLOTS, PICKUP_INFO } from '~/composables/useCheckout'

const { items, subtotal, remove, updateQty } = useCart()
const { formatPrice } = useProducts()
const { state, submit, reset } = useCheckout()

const placed = ref(false)

const submitOrder = () => {
  const f = state.value.form
  if (!f.name || !f.email || !f.phone || !f.slot) return
  submit()
  placed.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const slotLabel = (id: string) => {
  const s = PICKUP_SLOTS.find((x) => x.id === id)
  return s ? `${s.label}day · ${s.time}` : id
}
</script>

<template>
  <main class="container checkout-page">
    <p class="eyebrow">Checkout</p>
    <h1>Pickup details</h1>
    <p style="color: var(--muted-fg); margin-bottom: var(--space-7); max-width: 60ch;">
      SwoopShop is pickup only. We'll send a confirmation text to the number below. No shipping, no payment — pay when you pick up.
    </p>

    <div v-if="!placed" class="checkout-grid">
      <form @submit.prevent="submitOrder">
        <section class="checkout-card">
          <h2><span class="step">1</span> Who's picking up?</h2>
          <div class="field-row two">
            <div class="field">
              <label for="c-name">Full name</label>
              <input id="c-name" v-model="state.form.name" type="text" required placeholder="Jane Eagle" />
            </div>
            <div class="field">
              <label for="c-phone">Phone</label>
              <input id="c-phone" v-model="state.form.phone" type="tel" required placeholder="(425) 555-0123" />
            </div>
          </div>
          <div class="field" style="margin-top: var(--size-4);">
            <label for="c-email">Email</label>
            <input id="c-email" v-model="state.form.email" type="email" required placeholder="jane@northwestu.edu" />
          </div>
        </section>

        <section class="checkout-card">
          <h2><span class="step">2</span> Pick a pickup time</h2>
          <p style="color: var(--muted-fg); margin-bottom: var(--size-4); font-size: var(--font-size-2);">
            Same-day pickup available Mon–Fri until 3 PM. We'll have your bag ready at {{ PICKUP_INFO.name }}.
          </p>
          <div class="slot-grid">
            <button
              v-for="s in PICKUP_SLOTS"
              :key="s.id"
              type="button"
              :class="['slot', { 'is-active': state.form.slot === s.id }]"
              @click="state.form.slot = s.id"
            >
              {{ s.label }}
              <small>{{ s.time }}</small>
            </button>
          </div>
          <div class="field" style="margin-top: var(--size-5);">
            <label for="c-notes">Notes (optional)</label>
            <textarea id="c-notes" v-model="state.form.notes" rows="3" placeholder="Anything we should know? (e.g. 'gift wrap, leave at the desk')" />
          </div>
        </section>

        <button class="btn btn-primary btn-block" type="submit">
          Place pickup order · {{ formatPrice(subtotal) }}
        </button>
      </form>

      <aside>
        <div class="cart-summary" style="position: static;">
          <h2>Your order</h2>
          <ul class="order-list">
            <li v-for="item in items" :key="item.key">
              <img :src="item.image" :alt="item.name" />
              <div>
                <h4>{{ item.name }}</h4>
                <p class="meta">
                  {{ item.variant ?? 'One size' }} · qty {{ item.qty }}
                </p>
                <button
                  type="button"
                  @click="remove(item.key)"
                  style="background: none; border: 0; padding: 0; margin-top: 4px; font-size: var(--font-size-1); color: var(--nu-blue); font-weight: 800; letter-spacing: var(--letter-spacing-4); text-transform: uppercase;"
                >
                  Remove
                </button>
              </div>
              <div class="line">{{ formatPrice(item.price * item.qty) }}</div>
            </li>
          </ul>

          <div class="summary-row"><span>Subtotal</span><strong>{{ formatPrice(subtotal) }}</strong></div>
          <div class="summary-row"><span>Pickup fee</span><strong>Free</strong></div>
          <div class="summary-row total"><span>Total</span><strong>{{ formatPrice(subtotal) }}</strong></div>

          <div class="pickup-info" style="margin: var(--size-5) 0 0;">
            <strong>Pay when you pick up</strong>
            Card or cash accepted at the Student Center – Pecota pickup window.
          </div>
        </div>
      </aside>
    </div>

    <div v-else class="confirmation">
      <span class="check" aria-hidden="true">✓</span>
      <h1>Order confirmed</h1>
      <p style="max-width: 48ch; margin: 0 auto var(--size-5);">
        We'll text <strong style="color: var(--nu-midnight);">{{ state.form.phone }}</strong>
        as soon as your bag is packed. Show your order ID <strong style="color: var(--nu-blue);">{{ state.orderId }}</strong>
        at the {{ PICKUP_INFO.name }} on
        <strong style="color: var(--nu-midnight);">{{ slotLabel(state.form.slot) }}</strong>.
      </p>
      <NuxtLink to="/" class="btn btn-primary">Keep shopping</NuxtLink>
    </div>
  </main>
</template>
