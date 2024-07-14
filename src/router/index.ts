/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import OfflineView from '@/views/OfflineView.vue';
import OnlineView from '@/views/OnlineView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/offline',
      name: 'offline',
      component: OfflineView,
    },
    {
      path: '/online',
      name: 'online',
      component: OnlineView,
    },
    {
      path: '/about',
      name: 'about',
      component: async () => import('@/views/AboutView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});

export default router;
