import { createApp } from 'vue'
import App from './App.vue'
import './theme.css'
import ResumeForm from './components/ResumeForm'

const app = createApp(App)

app.component('resume-form', ResumeForm)

app.mount('#app')
