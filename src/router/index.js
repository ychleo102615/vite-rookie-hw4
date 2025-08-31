import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogInPanel from '@/components/LogInPanel.vue'
import RegisterPanel from '@/components/RegisterPanel.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
      children: [
        // {
        //   path: '',
        //   name: 'auth-redirect',
        //   redirect: { name: 'login' },
        // },
        {
          path: '',
          name: 'login',
          component: LogInPanel,
        },
        {
          path: 'register',
          name: 'register',
          component: RegisterPanel,
        },
      ],
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/TodoView.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
