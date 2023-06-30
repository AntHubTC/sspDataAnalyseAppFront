import './assets/main.css'
import './assets/stylus/variables.styl'
import 'element-plus/theme-chalk/index.css'

import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

// 全局注册element得图片
for (let iconName in Icons) {
    app.component(iconName, Icons[iconName as keyof typeof Icons])
}

app.mount('#app')
