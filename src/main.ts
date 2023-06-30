import './assets/main.css'
import './assets/stylus/variables.styl'
import 'element-plus/theme-chalk/index.css'

import ElementPlus from 'element-plus'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)



app.mount('#app')
