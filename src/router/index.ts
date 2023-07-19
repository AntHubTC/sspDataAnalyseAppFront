import { createRouter, createWebHistory } from 'vue-router'

import settings from '@/views/settings.vue'
import workspace from '@/views/workspace.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'settings',
      component: settings
    },
    {
      path: '/workspace',
      name: 'home',
      component: workspace
    }
  ]
})

export default router
