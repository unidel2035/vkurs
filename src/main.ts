import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import './style.css'
import App from './App.vue'
import router from './router'

// PrimeVue components
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Avatar from 'primevue/avatar'
import ProgressSpinner from 'primevue/progressspinner'
import DataView from 'primevue/dataview'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import Tag from 'primevue/tag'
import ProgressBar from 'primevue/progressbar'
import Timeline from 'primevue/timeline'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark-mode',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      }
    }
  }
})

// Register PrimeVue components globally
app.component('Button', Button)
app.component('Card', Card)
app.component('InputText', InputText)
app.component('Textarea', Textarea)
app.component('Avatar', Avatar)
app.component('ProgressSpinner', ProgressSpinner)
app.component('DataView', DataView)
app.component('Accordion', Accordion)
app.component('AccordionPanel', AccordionPanel)
app.component('Tag', Tag)
app.component('ProgressBar', ProgressBar)
app.component('Timeline', Timeline)
app.component('Menu', Menu)
app.component('Menubar', Menubar)

app.mount('#app')
