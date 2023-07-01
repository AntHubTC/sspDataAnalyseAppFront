import './assets/main.css'
import './assets/stylus/variables.styl'
import 'element-plus/theme-chalk/index.css'

import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

// 事件总线 》使用参考：https://blog.csdn.net/qq_52013792/article/details/125803290
const bus = mitt()
app.config.globalProperties.$bus = bus //相当于Vue2中的:Vue.prototype.$bus = bus

// 全局注册element得图片
for (let iconName in Icons) {
    app.component(iconName, Icons[iconName as keyof typeof Icons])
}

app.mount('#app')
