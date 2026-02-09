<template>
  <AppLayout>
    <div class="home-view">
      <section class="hero">
        <h1 class="hero-title">Найди профессию, которая соответствует твоим ценностям</h1>
        <p class="hero-subtitle">
          AI-powered чат-бот для профориентации молодых людей. Узнай, какие профессии
          подходят именно тебе на основе твоих жизненных ценностей.
        </p>
        <Button
          label="Начать диалог"
          icon="pi pi-arrow-right"
          size="large"
          @click="router.push('/chat')"
        />
      </section>

      <section class="features">
        <h2>Как это работает</h2>
        <div class="features-grid">
          <Card v-for="(feature, index) in features" :key="index" class="feature-card">
            <template #header>
              <div class="feature-icon">
                <i :class="feature.icon"></i>
              </div>
            </template>
            <template #title>{{ feature.title }}</template>
            <template #content>
              <p>{{ feature.description }}</p>
            </template>
          </Card>
        </div>
      </section>

      <section class="values">
        <h2>12 ключевых ценностей</h2>
        <p class="section-subtitle">
          Мы анализируем профессии по 12 жизненным ценностям
        </p>
        <div class="values-grid">
          <div v-for="value in values" :key="value.name" class="value-item">
            <i :class="value.icon"></i>
            <h3>{{ value.name }}</h3>
            <p>{{ value.description }}</p>
          </div>
        </div>
      </section>

      <section class="cta">
        <Card class="cta-card">
          <template #content>
            <h2>Готов начать?</h2>
            <p>Пройди диалог с AI-ассистентом и узнай, какие профессии тебе подходят</p>
            <Button
              label="Начать диалог"
              icon="pi pi-comments"
              size="large"
              @click="router.push('/chat')"
            />
          </template>
        </Card>
      </section>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'

const router = useRouter()

const features = [
  {
    icon: 'pi pi-comments',
    title: 'Диалог о ценностях',
    description: 'AI-ассистент в формате естественного разговора определяет твои жизненные приоритеты'
  },
  {
    icon: 'pi pi-chart-bar',
    title: 'Анализ профиля',
    description: 'Система анализирует твои ответы и создаёт профиль ценностей'
  },
  {
    icon: 'pi pi-search',
    title: 'Подбор профессий',
    description: 'Получи список профессий с процентом совпадения с твоими ценностями'
  },
  {
    icon: 'pi pi-briefcase',
    title: 'Поиск вакансий',
    description: 'Найди актуальные вакансии по выбранной профессии на hh.ru'
  },
  {
    icon: 'pi pi-book',
    title: 'Рекомендации по обучению',
    description: 'Получи подборку курсов и стажировок для развития нужных компетенций'
  },
  {
    icon: 'pi pi-map',
    title: 'План развития',
    description: 'Пошаговая дорожная карта к желаемой профессии'
  }
]

const values = [
  { name: 'Материальный достаток', icon: 'pi pi-dollar', description: 'Высокий доход, финансовая стабильность' },
  { name: 'Карьерный рост', icon: 'pi pi-chart-line', description: 'Продвижение, статус, влияние' },
  { name: 'Творчество', icon: 'pi pi-palette', description: 'Креативность, самовыражение' },
  { name: 'Помощь людям', icon: 'pi pi-heart', description: 'Социальная значимость, альтруизм' },
  { name: 'Стабильность', icon: 'pi pi-shield', description: 'Предсказуемость, надёжность' },
  { name: 'Независимость', icon: 'pi pi-compass', description: 'Автономность, свобода решений' },
  { name: 'Признание', icon: 'pi pi-star', description: 'Уважение, известность' },
  { name: 'Баланс', icon: 'pi pi-balance-scale', description: 'Гармония работы и личной жизни' },
  { name: 'Интеллектуальное развитие', icon: 'pi pi-graduation-cap', description: 'Обучение, сложные задачи' },
  { name: 'Командная работа', icon: 'pi pi-users', description: 'Сотрудничество, коллектив' },
  { name: 'Инновации', icon: 'pi pi-bolt', description: 'Новые технологии, прогресс' },
  { name: 'Практический результат', icon: 'pi pi-check-circle', description: 'Осязаемые достижения' }
]
</script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 4rem 2rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-color-secondary);
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.features {
  padding: 4rem 0;
}

.features h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
}

.feature-icon {
  font-size: 3rem;
  color: #667eea;
  padding: 2rem;
}

.values {
  padding: 4rem 0;
  background: var(--surface-ground);
  margin: 4rem -2rem;
  padding: 4rem 2rem;
}

.values h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.section-subtitle {
  text-align: center;
  color: var(--text-color-secondary);
  margin-bottom: 3rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.value-item {
  text-align: center;
  padding: 1.5rem;
}

.value-item i {
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.value-item h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.value-item p {
  color: var(--text-color-secondary);
  font-size: 0.9rem;
}

.cta {
  padding: 4rem 0;
}

.cta-card {
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.cta-card h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: white;
}

.cta-card p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .features h2,
  .values h2 {
    font-size: 1.75rem;
  }
}
</style>
