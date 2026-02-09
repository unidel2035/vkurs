# План разработки «Верный Курс»

## Обзор фаз разработки

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Фаза 1: Фундамент        │  Фаза 2: AI-ядро          │  Фаза 3: MVP   │
│  ─────────────────────    │  ─────────────────────    │  ──────────    │
│  • Структура проекта      │  • Claude интеграция      │  • Чат UI      │
│  • Integram схемы         │  • Выявление ценностей    │  • Результаты  │
│  • Классификатор          │  • Матчинг профессий      │  • Roadmap     │
│  • Базовый UI             │  • Промпты                │  • hh.ru       │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Фаза 1: Фундамент

### 1.1 Инициализация проекта

**Задачи:**
- [ ] Создать Vue 3 проект с Vite
- [ ] Настроить TypeScript
- [ ] Установить и настроить PrimeVue
- [ ] Настроить Pinia для state management
- [ ] Настроить Vue Router
- [ ] Создать базовый layout приложения

**Команды:**
```bash
bun create vite vkurs-app --template vue-ts
cd vkurs-app
bun add primevue primeicons @primevue/themes
bun add pinia vue-router
bun add -D @types/node sass
```

**Структура PrimeVue:**
```typescript
// main.ts
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark-mode'
    }
  }
});
```

### 1.2 Структура данных в Integram

**Таблицы:**

#### Ценности (Values)
| Поле | Тип | Описание |
|------|-----|----------|
| id | NUMBER | ID ценности |
| name | SHORT | Название |
| description | LONG | Описание |
| icon | SHORT | Иконка |
| keywords | LONG | Ключевые слова для AI |

#### Профессии (Professions)
| Поле | Тип | Описание |
|------|-----|----------|
| id | NUMBER | ID профессии |
| name | SHORT | Название |
| description | LONG | Описание |
| category | REF → Categories | Категория |
| avg_salary_min | NUMBER | Мин. зарплата |
| avg_salary_max | NUMBER | Макс. зарплата |
| demand_level | REF → DemandLevels | Уровень спроса |
| hh_keywords | SHORT | Ключевые слова для hh.ru |

#### Профессия-Ценности (ProfessionValues)
| Поле | Тип | Описание |
|------|-----|----------|
| profession | REF → Professions | Профессия |
| value | REF → Values | Ценность |
| weight | NUMBER | Вес (1-10) |

#### Компетенции (Competencies)
| Поле | Тип | Описание |
|------|-----|----------|
| id | NUMBER | ID компетенции |
| name | SHORT | Название |
| type | REF → CompetencyTypes | Тип (hard/soft) |

#### Профессия-Компетенции (ProfessionCompetencies)
| Поле | Тип | Описание |
|------|-----|----------|
| profession | REF → Professions | Профессия |
| competency | REF → Competencies | Компетенция |
| level | REF → Levels | Требуемый уровень |

#### Пользователи (Users)
| Поле | Тип | Описание |
|------|-----|----------|
| id | NUMBER | ID пользователя |
| name | SHORT | Имя |
| email | SHORT | Email |
| age | NUMBER | Возраст |
| created_at | DATETIME | Дата регистрации |

#### Сессии диалогов (Sessions)
| Поле | Тип | Описание |
|------|-----|----------|
| id | NUMBER | ID сессии |
| user | REF → Users | Пользователь |
| status | REF → SessionStatuses | Статус |
| started_at | DATETIME | Начало |
| completed_at | DATETIME | Завершение |

#### Сообщения (Messages)
| Поле | Тип | Описание |
|------|-----|----------|
| session | REF → Sessions | Сессия (parent) |
| role | REF → Roles | user/assistant |
| content | LONG | Текст сообщения |
| timestamp | DATETIME | Время |

#### Профиль ценностей пользователя (UserValues)
| Поле | Тип | Описание |
|------|-----|----------|
| session | REF → Sessions | Сессия |
| value | REF → Values | Ценность |
| score | NUMBER | Оценка (0-100) |

#### Рекомендации (Recommendations)
| Поле | Тип | Описание |
|------|-----|----------|
| session | REF → Sessions | Сессия |
| profession | REF → Professions | Профессия |
| match_score | NUMBER | % совпадения |
| reasoning | LONG | Обоснование AI |

### 1.3 Классификатор профессий

**Категории профессий:**
1. IT и технологии
2. Медицина и здравоохранение
3. Финансы и экономика
4. Образование и наука
5. Творчество и медиа
6. Юриспруденция
7. Производство и инженерия
8. Продажи и маркетинг
9. Сервис и гостеприимство
10. Транспорт и логистика
11. Строительство и недвижимость
12. Государственная служба

**Пример классификации профессии:**

```json
{
  "name": "Frontend-разработчик",
  "category": "IT и технологии",
  "values": {
    "интеллектуальное_развитие": 9,
    "творчество": 8,
    "независимость": 7,
    "инновации": 9,
    "материальный_достаток": 8,
    "баланс": 6,
    "практический_результат": 9,
    "командная_работа": 6,
    "карьерный_рост": 7,
    "стабильность": 5,
    "помощь_людям": 4,
    "признание": 5
  },
  "competencies": {
    "hard": ["JavaScript", "HTML/CSS", "React/Vue", "TypeScript"],
    "soft": ["Внимание к деталям", "Решение проблем", "Коммуникация"]
  },
  "salary": { "min": 100000, "max": 400000 },
  "demand": "высокий"
}
```

---

## Фаза 2: AI-ядро

### 2.1 Интеграция Claude API

**Сервис claude.ts:**
```typescript
interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ValueAnalysis {
  values: Record<string, number>;  // value_id -> score (0-100)
  confidence: number;
  reasoning: string;
}

class ClaudeService {
  async chat(messages: ClaudeMessage[], systemPrompt: string): Promise<string>;
  async analyzeValues(conversation: ClaudeMessage[]): Promise<ValueAnalysis>;
  async matchProfessions(values: ValueAnalysis): Promise<ProfessionMatch[]>;
}
```

### 2.2 Промпт для выявления ценностей

**Системный промпт:**
```
Ты — профориентатор-психолог проекта «Верный Курс». Твоя задача — через
дружелюбный диалог выявить ключевые жизненные ценности собеседника.

ПРАВИЛА ДИАЛОГА:
1. Задавай открытые вопросы о жизни, мечтах, интересах
2. Не упоминай напрямую список ценностей
3. Веди разговор естественно, как друг
4. Делай выводы на основе ответов, не спрашивай напрямую
5. После 8-12 обменов реплик сформируй профиль ценностей

ЦЕННОСТИ ДЛЯ АНАЛИЗА:
- material_wealth: финансовое благополучие
- career_growth: статус и продвижение
- creativity: творческое самовыражение
- helping_others: помощь людям
- stability: стабильность и предсказуемость
- independence: свобода и автономность
- recognition: признание и уважение
- balance: баланс работы и жизни
- intellectual: интеллектуальное развитие
- teamwork: командная работа
- innovation: инновации и прогресс
- practical_result: осязаемые результаты

ФОРМАТ АНАЛИЗА (в конце диалога):
{
  "ready": true,
  "values": { "value_id": score_0_100, ... },
  "top_5": ["value1", "value2", ...],
  "reasoning": "объяснение выводов"
}
```

### 2.3 Алгоритм матчинга профессий

```typescript
function matchProfessions(
  userValues: Record<string, number>,
  professions: Profession[]
): ProfessionMatch[] {
  return professions
    .map(profession => {
      // Взвешенное совпадение
      let totalWeight = 0;
      let matchScore = 0;

      for (const [valueId, profWeight] of Object.entries(profession.values)) {
        const userScore = userValues[valueId] || 0;
        totalWeight += profWeight;
        matchScore += (userScore / 100) * profWeight;
      }

      const percentage = Math.round((matchScore / totalWeight) * 100);

      return {
        profession,
        matchScore: percentage,
        strengths: findStrengths(userValues, profession.values),
        gaps: findGaps(userValues, profession.values)
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10);
}
```

### 2.4 Промпт для генерации рекомендаций

```
На основе профиля ценностей пользователя и подобранной профессии:

ПРОФИЛЬ ЦЕННОСТЕЙ:
{user_values}

ПРОФЕССИЯ:
{profession_data}

Сгенерируй:
1. Персонализированное описание почему эта профессия подходит
2. Какие аспекты профессии особенно резонируют с ценностями
3. Возможные сложности с учётом профиля
4. Рекомендации по развитию
```

---

## Фаза 3: MVP

### 3.1 Компоненты чата

**ChatView.vue:**
```vue
<template>
  <div class="chat-container">
    <ChatHeader :session="session" />
    <ChatMessages :messages="messages" :typing="isTyping" />
    <ChatInput
      v-model="input"
      @send="sendMessage"
      :disabled="isTyping"
    />
  </div>
</template>
```

**Компоненты PrimeVue:**
- `Card` — карточки сообщений
- `InputText` / `Textarea` — ввод
- `Button` — отправка
- `ProgressSpinner` — индикатор печати
- `Avatar` — аватары бота и пользователя

### 3.2 Отображение результатов

**ResultsView.vue:**
```vue
<template>
  <div class="results">
    <ValuesChart :values="userValues" />
    <ProfessionList :professions="matches" @select="openDetails" />
    <ProfessionDetails
      v-if="selected"
      :profession="selected"
      :userValues="userValues"
    />
  </div>
</template>
```

**Компоненты:**
- `Chart` (PrimeVue) — радарная диаграмма ценностей
- `DataView` — список профессий
- `Accordion` — детали профессии
- `Tag` — теги компетенций
- `ProgressBar` — % совпадения

### 3.3 Интеграция hh.ru

**HeadHunterService:**
```typescript
interface Vacancy {
  id: string;
  name: string;
  employer: string;
  salary: { from?: number; to?: number; currency: string };
  area: string;
  url: string;
  requirements: string;
}

class HeadHunterService {
  async searchVacancies(keywords: string, area?: string): Promise<Vacancy[]>;
  async getVacancyDetails(id: string): Promise<VacancyDetails>;
}
```

**API Endpoints:**
- `GET /vacancies?text={keywords}&area={region}`
- `GET /vacancies/{id}`

### 3.4 Карьерная дорожная карта

**RoadmapView.vue:**
```vue
<template>
  <div class="roadmap">
    <Timeline :value="steps" align="alternate">
      <template #content="slotProps">
        <RoadmapStep :step="slotProps.item" />
      </template>
    </Timeline>
  </div>
</template>
```

**Этапы дорожной карты:**
1. Текущая точка (навыки, опыт)
2. Необходимые компетенции
3. Рекомендуемые курсы/обучение
4. Стажировки и практика
5. Начальные позиции
6. Целевая профессия

---

## Фаза 4: Расширение

### 4.1 Дополнительные функции
- [ ] Авторизация пользователей
- [ ] История сессий
- [ ] Сохранение и экспорт результатов
- [ ] Сравнение профессий
- [ ] Поиск образовательных программ
- [ ] Интеграция с Skillbox, Нетология и др.

### 4.2 Аналитика
- [ ] Статистика по ценностям
- [ ] Популярные профессии
- [ ] Воронка конверсии
- [ ] A/B тесты промптов

### 4.3 Мобильная версия
- [ ] Адаптивный дизайн
- [ ] PWA
- [ ] Push-уведомления

---

## Технические требования

### Окружение разработки
```
Node.js: 18+
Bun: 1.0+
Vue: 3.4+
TypeScript: 5.0+
PrimeVue: 4.0+
```

### Переменные окружения
```env
# Integram
VITE_INTEGRAM_URL=https://app.integram.io
VITE_INTEGRAM_DB=vkurs
VITE_INTEGRAM_TOKEN=xxx

# Claude API
VITE_CLAUDE_API_KEY=xxx
VITE_CLAUDE_MODEL=claude-3-5-sonnet-20241022

# HeadHunter API
VITE_HH_API_URL=https://api.hh.ru
VITE_HH_CLIENT_ID=xxx
VITE_HH_CLIENT_SECRET=xxx
```

### Безопасность
- API ключи только через backend-proxy
- CORS настройка для Integram
- Rate limiting для Claude API
- Валидация пользовательского ввода

---

## Метрики успеха

| Метрика | Цель MVP |
|---------|----------|
| Completion rate диалога | > 70% |
| Среднее время сессии | 10-15 мин |
| Удовлетворённость рекомендациями | > 4/5 |
| Переход к вакансиям | > 50% |
| Возврат пользователей | > 30% |

---

## Риски и митигация

| Риск | Вероятность | Влияние | Митигация |
|------|-------------|---------|-----------|
| Claude API downtime | Низкая | Высокое | Fallback на базовый опросник |
| hh.ru API ограничения | Средняя | Среднее | Кэширование, graceful degradation |
| Неточное определение ценностей | Средняя | Высокое | Итеративное улучшение промптов |
| Малая база профессий | Низкая | Среднее | Постепенное расширение |

---

## Контакты

**Репозиторий:** https://github.com/unidel2035/vkurs

**Технологии:**
- Frontend: Vue 3 + PrimeVue
- Backend: Integram
- AI: Claude API
- Интеграции: hh.ru API
