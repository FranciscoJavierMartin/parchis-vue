/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import { ROUTES } from '@/constants/routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      ...ROUTES.HOME,
      component: HomeView,
    },
    {
      ...ROUTES.OFFLINE,
      component: async () => import('@/views/OfflineView.vue'),
    },
    {
      ...ROUTES.ONLINE,
      component: async () => import('@/views/OnlineView.vue'),
    },
    {
      ...ROUTES.ABOUT,
      component: async () => import('@/views/AboutView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: ROUTES.HOME.path,
    },
  ],
});

export default router;
