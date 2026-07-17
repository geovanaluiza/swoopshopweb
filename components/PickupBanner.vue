<script setup lang="ts">
import { PICKUP_INFO } from '~/composables/useCheckout'
</script>

<template>
  <section id="pickup" class="pickup-banner">
    <div class="container pickup-inner">
      <div>
        <p class="eyebrow" style="color: var(--nu-tour);">Pickup only</p>
        <h2 class="pickup-title">You pick it up. We make it easy.</h2>
        <p class="pickup-text">
          SwoopShop is on-campus only. We'll text you when your order is ready — usually within one business
          hour during pickup windows. Bring a photo ID to the Merdian Building.
        </p>
      </div>

      <div class="pickup-card">
        <div class="pickup-card-head">
          <span>{{ PICKUP_INFO.name }}</span>
        </div>
        <p style="color: rgba(255,255,255,.7); margin: 0;">{{ PICKUP_INFO.address }}</p>
        <div class="pickup-grid">
          <div v-for="(line, i) in PICKUP_INFO.hours" :key="line">
            <strong>{{ line.split('·')[0] }}</strong>
            <span>{{ line.split('·')[1]?.trim() }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
