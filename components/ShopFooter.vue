<script setup lang="ts">
const year = new Date().getFullYear()

const shop = [
  { label: 'Shop All', href: '/' },
  { label: 'Apparel', href: '/#apparel' },
  { label: 'Headwear', href: '/#headwear' },
  { label: 'Accessories', href: '/#accessories' },
  { label: 'Collections', href: '/#collections' }
]

const help = [
  { label: 'Pickup & Hours', href: '/#pickup' },
  { label: 'Order Help', href: 'mailto:store@northwestu.edu' },
  { label: 'Returns', href: '#returns' },
  { label: 'Size Guide', href: '#sizing' },
  { label: 'Contact us', href: 'mailto:store@northwestu.edu' }
]

const contact = {
  address: 'Merdian Building, 5520 108th Ave NE, Kirkland WA 98033',
  phone: '(425) 555-0142',
  email: 'store@northwestu.edu',
  hours: [
    'Mon–Fri · 9:00 AM – 5:00 PM',
    'Saturday · 10:00 AM – 2:00 PM',
    'Sunday · Closed'
  ]
}

const social = [
  { label: 'Instagram', href: 'https://instagram.com', short: 'IG' },
  { label: 'Facebook',  href: 'https://facebook.com',  short: 'FB' },
  { label: 'TikTok',    href: 'https://tiktok.com',    short: 'TT' },
  { label: 'YouTube',   href: 'https://youtube.com',   short: 'YT' }
]
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="brand">
            <span class="brand-mark" aria-hidden="true">SW</span>
            <span class="brand-text">
              <span class="brand-name">SwoopShop</span>
              <span class="brand-sub">Northwest University</span>
            </span>
          </div>
          <p>The official storefront of Northwest University. Pickup only, right here on campus.</p>
          <ul class="footer-social" aria-label="Social media">
            <li v-for="s in social" :key="s.label">
              <a :href="s.href" :aria-label="s.label">{{ s.short }}</a>
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Shop</h4>
          <ul>
            <li v-for="l in shop" :key="l.label"><a :href="l.href">{{ l.label }}</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Help</h4>
          <ul>
            <li v-for="l in help" :key="l.label"><a :href="l.href">{{ l.label }}</a></li>
          </ul>
        </div>

        <div class="footer-col footer-contact">
          <h4>Store & Pickup</h4>
          <p><strong>{{ contact.address }}</strong></p>
          <p v-for="line in contact.hours" :key="line">{{ line }}</p>
          <p style="margin-top: 12px;">
            <a :href="`mailto:${contact.email}`">{{ contact.email }}</a><br />
            <a :href="`tel:${contact.phone.replace(/[^0-9+]/g, '')}`">{{ contact.phone }}</a>
          </p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© {{ year }} Northwest University · Operated by the Office of University Marketing</p>
        <p>
          <a href="#privacy">Privacy</a> · <a href="#terms">Terms</a> · <a href="#accessibility">Accessibility</a>
        </p>
      </div>
    </div>
  </footer>
</template>
