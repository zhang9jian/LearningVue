import { createApp } from 'vue'
import App from './App.vue'
import router  from './router'
import './api/mock.ts'
import api from './api/api.ts'
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
/* 引入createPinia，用于创建pinia */
import { createPinia } from 'pinia'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.globalProperties.$api=api

/* 创建pinia */
const pinia = createPinia()

app.use(router).use(pinia)
app.mount('#app')
