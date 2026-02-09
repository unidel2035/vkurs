<template>
  <div class="app-layout">
    <header class="app-header">
      <Menubar :model="menuItems">
        <template #start>
          <div class="app-logo">
            <h1>Верный Курс</h1>
          </div>
        </template>
        <template #end>
          <Button
            :icon="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'"
            @click="themeStore.toggleTheme()"
            text
            rounded
            aria-label="Переключить тему"
          />
        </template>
      </Menubar>
    </header>

    <main class="app-main">
      <slot />
    </main>

    <footer class="app-footer">
      <p>&copy; 2024 Верный Курс. AI-powered профориентация</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'

const router = useRouter()
const themeStore = useThemeStore()
const isDarkMode = computed(() => themeStore.isDarkMode)

const menuItems = [
  {
    label: 'Главная',
    icon: 'pi pi-home',
    command: () => router.push('/')
  },
  {
    label: 'Начать диалог',
    icon: 'pi pi-comments',
    command: () => router.push('/chat')
  },
  {
    label: 'Результаты',
    icon: 'pi pi-chart-bar',
    command: () => router.push('/results')
  },
  {
    label: 'Дорожная карта',
    icon: 'pi pi-map',
    command: () => router.push('/roadmap')
  }
]
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-logo h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  padding: 0 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.app-main {
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

.app-footer {
  padding: 1.5rem;
  text-align: center;
  border-top: 1px solid var(--surface-border);
  color: var(--text-color-secondary);
}

@media (max-width: 768px) {
  .app-main {
    padding: 1rem;
  }

  .app-logo h1 {
    font-size: 1.2rem;
  }
}
</style>
