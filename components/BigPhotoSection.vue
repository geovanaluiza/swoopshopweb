<template>
  <section class="big-photo" aria-hidden="true">
    <iframe
      src="https://www.youtube.com/embed/Ye1KgGUCREs?autoplay=1&mute=1&loop=1&playlist=Ye1KgGUCREs&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3"
      allow="autoplay; encrypted-media"
      allowfullscreen
      title="Northwest University"
    ></iframe>
  </section>
</template>

<style scoped>
.big-photo {
  position: relative;
  width: 100%;
  height: 60vh;
  min-height: 360px;
  max-height: 720px;
  overflow: hidden;
  background: var(--nu-powder);
}
.big-photo iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  pointer-events: none;
}
@media (min-width: 960px) {
  .big-photo { height: 75vh; min-height: 520px; }
}
</style>
