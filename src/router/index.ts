import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: () => import('/@/pages/index.vue')
    },
    { path: '/camera', name: 'Camera', component: () => import('/@/pages/camera.vue') }
  ]
})

export default router
