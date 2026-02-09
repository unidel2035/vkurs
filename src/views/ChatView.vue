<template>
  <AppLayout>
    <div class="chat-view">
      <Card class="chat-card">
        <template #header>
          <div class="chat-header">
            <h2>Диалог с AI-ассистентом</h2>
            <p>Давай познакомимся и поговорим о твоих интересах и ценностях</p>
          </div>
        </template>
        <template #content>
          <div class="coming-soon">
            <i class="pi pi-comments" style="font-size: 4rem; color: #667eea;"></i>
            <h3>Скоро здесь появится чат</h3>
            <p>В следующей фазе разработки здесь будет интерактивный диалог с AI-ассистентом</p>
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
.chat-view {
  max-width: 900px;
  margin: 0 auto;
}

.chat-card {
  min-height: 600px;
}

.chat-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--surface-border);
}

.chat-header h2 {
  margin-bottom: 0.5rem;
}

.chat-header p {
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
  max-width: 500px;
}
</style>
