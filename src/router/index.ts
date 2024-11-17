import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import { disconnectSocket } from '../services/socket';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  // Verifica si es necesario desconectar el socket antes de navegar
  if (from.name) {
    disconnectSocket();
  }
  next();  // Continúa con la navegación
});

export default router
