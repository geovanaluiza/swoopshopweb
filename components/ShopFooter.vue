<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <img src="/swoopshop-mast.jpg" alt="SwoopShop" class="footer-logo" width="140" height="57" />
          <p>The official storefront of Northwest University.<br />Pickup only · Barton 216</p>
        </div>

        <div class="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><a href="/">All products</a></li>
            <li><a href="/#apparel">Apparel</a></li>
            <li><a href="/#headwear">Headwear</a></li>
            <li><a href="/#accessories">Accessories</a></li>
          </ul>
        </div>

        <div class="footer-col footer-contact">
          <h4>Pickup</h4>
          <p><strong>Human R. Office</strong></p>
          <p>Barton Hall 216</p>
          <p>Kirkland, WA</p>
          <p style="margin-top: 12px;"><strong>Monday</strong> · 10AM–2PM</p>
          <p><strong>Friday</strong> · 11:15AM–2PM</p>
          <p style="margin-top: 12px;"><a href="mailto:store@northwestu.edu">store@northwestu.edu</a></p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© {{ year }} Northwest University</p>
        <p><a href="#privacy">Privacy</a> · <a href="#terms">Terms</a></p>
      </div>
    </div>
  </footer>
</template>
