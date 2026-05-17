import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { getToken } from '@/utils/token'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginPage.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'home',
    redirect: '/apply',
    meta: { requiresAuth: false }
  },
  {
    path: '/apply',
    name: 'apply',
    component: () => import('@/views/visitor/ApplyPage.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/components/layout/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/admin/DashboardPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'apply-list',
        name: 'apply-list',
        component: () => import('@/views/admin/ApplyListPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'visit-record',
        name: 'visit-record',
        component: () => import('@/views/admin/VisitRecordPage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const token = getToken()

  if (requiresAuth && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/admin')
  } else {
    next()
  }
})

export default router
