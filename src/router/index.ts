/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/home-view.vue';
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
      component: async () => import('@/views/offline-view.vue'),
    },
    {
      ...ROUTES.ONLINE,
      component: async () => import('@/views/online-view.vue'),
    },
    {
      ...ROUTES.ABOUT,
      component: async () => import('@/views/about-view.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: ROUTES.HOME.path,
    },
  ],
});

export default router;
