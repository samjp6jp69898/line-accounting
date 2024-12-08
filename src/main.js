import { createApp } from 'vue'
import './style.css'
import store from './store/store'
import App from './App.vue'
import liff from "@line/liff";
import config from './config';
import router from './router'
import ElementPlus from 'element-plus'
import zhTw from "element-plus/dist/locale/zh-cn.mjs";
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './static/css/elementPlus/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

function themeInit() {
    // 透過 tag 找出 html tag
    // 設定 class
    localStorage.getItem('theme') || localStorage.setItem('theme', 'dark')
    document.documentElement.classList.add(localStorage.getItem('theme'))

    
    document.documentElement.setAttribute('theme', localStorage.getItem('theme'))
}

themeInit()

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus, {
    locale: zhTw,
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$config = config
app.config.globalProperties.$liff = liff
app.config.globalProperties.DEBUG = process.env.NODE_ENV === 'development'
app.mount('#app')
