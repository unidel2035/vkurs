<template>
  <AppLayout>
    <div class="results-view">
      <Card class="results-card">
        <template #header>
          <div class="results-header">
            <h2>Результаты анализа</h2>
            <p>Твой профиль ценностей и подходящие профессии</p>
          </div>
        </template>
        <template #content>
          <div class="coming-soon">
            <i class="pi pi-chart-bar" style="font-size: 4rem; color: #667eea;"></i>
            <h3>Скоро здесь появятся результаты</h3>
            <p>После прохождения диалога здесь будет отображаться твой профиль ценностей и список подходящих профессий</p>
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
.results-view {
  max-width: 1200px;
  margin: 0 auto;
}

.results-card {
  min-height: 600px;
}

.results-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--surface-border);
}

.results-header h2 {
  margin-bottom: 0.5rem;
}

.results-header p {
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
