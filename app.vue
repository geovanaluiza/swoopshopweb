<script setup lang="ts">
import { useMicroInteractions } from '~/composables/useMicroInteractions'

const { init } = useMicroInteractions()
onMounted(() => init())
</script>

<template>
  <NuxtPage />
</template>
