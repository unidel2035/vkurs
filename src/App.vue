<template>
  <div :class="{ 'dark-mode': isDarkMode }">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isDarkMode = computed(() => themeStore.isDarkMode)
</script>

<style scoped>
</style>
