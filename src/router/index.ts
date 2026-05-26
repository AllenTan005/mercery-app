import { createRouter, createWebHistory } from 'vue-router'
import AccountListView from '@/views/AccountListView.vue'
import LoginView from '@/views/LoginView.vue'

const SESSION_EMAIL_KEY = 'loginEmail'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/accounts',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        guestOnly: true,
      },
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: AccountListView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to) => {
  const loginEmail = sessionStorage.getItem(SESSION_EMAIL_KEY)

  if (to.meta.requiresAuth && !loginEmail) {
    return { name: 'login' }
  }

  if (to.meta.guestOnly && loginEmail) {
    return { name: 'accounts' }
  }

  return true
})

export { SESSION_EMAIL_KEY }
export default router
