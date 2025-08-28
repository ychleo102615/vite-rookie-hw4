import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPanel from '@/components/LoginPanel.vue'
import RegisterPanel from '@/components/RegisterPanel.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: HomeView,
      component: () => import('../views/AuthView.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: LoginPanel,
        },
        {
          path: 'register',
          name: 'register',
          component: RegisterPanel,
        },
      ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
