import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/login', component: () => import('./views/Login.vue') },
  { path: '/', component: () => import('./views/Inicio.vue') },
  { path: '/pecho', component: () => import('./views/Pecho.vue') },
  { path: '/brazo', component: () => import('./views/Brazo.vue') },
  { path: '/pierna', component: () => import('./views/Pierna.vue') },
  { path: '/espalda', component: () => import('./views/Espalda.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = localStorage.getItem('auth')
  if (to.path !== '/login' && !auth) next('/login')
  else next()
})

export default router