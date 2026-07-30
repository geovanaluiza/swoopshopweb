<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <img src="/swoopshop-mast.png" alt="SwoopShop" class="footer-logo" width="140" height="57" />
          <p>The official storefront of Northwest University.<br />Pickup only · Student Center – Pecota</p>
        </div>

        <div class="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><a href="/">All products</a></li>
            <li><a href="/#apparel">Apparel</a></li>
            <li><a href="/#headwear">Headwear</a></li>
            <li><a href="/#collections">Collections</a></li>
          </ul>
        </div>

        <div class="footer-col footer-contact">
          <h4>Pickup</h4>
          <p><strong>Student Center – Pecota</strong></p>
          <p>5520 108th Ave NE</p>
          <p>Kirkland, WA 98033</p>
          <p style="margin-top: 12px;">Mon–Fri · 9AM–5PM</p>
          <p><a href="mailto:store@northwestu.edu">store@northwestu.edu</a></p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© {{ year }} Northwest University</p>
        <p><a href="#privacy">Privacy</a> · <a href="#terms">Terms</a></p>
      </div>
    </div>
  </footer>
</template>
