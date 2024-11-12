import { createRouter, createWebHistory } from 'vue-router'
import chatLeyoutView from '../views/chatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'chat',
      component: chatLeyoutView
    }
  ]
})

export default router