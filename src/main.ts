import './assets/main.css'
import './assets/stylus/variables.styl'
// import 'element-plus/theme-chalk/index.css'
import 'element-plus/dist/index.css'; 

import contextmenu from 'vue3-contextmenu'
import 'vue3-contextmenu/dist/vue3-contextmenu.css'

import service from './commons/request'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'

import { createApp, type Directive } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
// import * as directives from './tool/directives';

const app = createApp(App)
// 循环注册指令
// Object.keys(directives).forEach(key => {
//     app.directive(key, (directives as { [key: string ]: Directive })[key]);
// });
// axios
app.provide('$axios', service)
// import { ref, reactive, inject, onMounted} from "vue";
// const $axios = inject("$axios");

app.use(createPinia()).use(router).use(ElementPlus).use(contextmenu)

// 事件总线 》使用参考：https://blog.csdn.net/qq_52013792/article/details/125803290
// app.config.globalProperties.$mittBus = mitt() //相当于Vue2中的:Vue.prototype.$bus = bus
// 最后使用的式bus.js

// 全局注册element得图标
for (let iconName in Icons) {
    app.component(iconName, Icons[iconName as keyof typeof Icons])
}

app.mount('#app')
