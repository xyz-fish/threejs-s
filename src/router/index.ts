import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: () => import('/@/pages/index.vue')
    }
  ]
})

export default router
