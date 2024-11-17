import { createApp } from 'vue'
import './style.css'
import store from './store/store'
import App from './App.vue'

function themeInit() {
    localStorage.getItem('theme') || localStorage.setItem('theme', 'dark')
    document.documentElement.setAttribute('theme', localStorage.getItem('theme'))
}

themeInit()

const app = createApp(App)
app.use(store)
app.mount('#app')
