<template>
  <AppLayout>
    <div class="roadmap-view">
      <Card class="roadmap-card">
        <template #header>
          <div class="roadmap-header">
            <h2>Карьерная дорожная карта</h2>
            <p>Персональный план развития к желаемой профессии</p>
          </div>
        </template>
        <template #content>
          <div class="coming-soon">
            <i class="pi pi-map" style="font-size: 4rem; color: #667eea;"></i>
            <h3>Скоро здесь появится дорожная карта</h3>
            <p>После выбора профессии здесь будет отображаться пошаговый план развития с рекомендациями по обучению и стажировкам</p>
          </div>
        </template>
      </Card>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
</script>

<style scoped>
.roadmap-view {
  max-width: 1200px;
  margin: 0 auto;
}

.roadmap-card {
  min-height: 600px;
}

.roadmap-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--surface-border);
}

.roadmap-header h2 {
  margin-bottom: 0.5rem;
}

.roadmap-header p {
  color: var(--text-color-secondary);
}

.coming-soon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.coming-soon h3 {
  margin: 1.5rem 0 1rem;
  font-size: 1.5rem;
}

.coming-soon p {
  color: var(--text-color-secondary);
  max-width: 600px;
}
</style>
