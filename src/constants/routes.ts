import type { IRoutes } from '@/interfaces/routes';

export const ROUTES: IRoutes = {
  HOME: {
    path: '/',
    name: 'home',
  },
  OFFLINE: {
    path: '/offline',
    name: 'offline',
  },
  ONLINE: {
    path: '/online',
    name: 'online',
  },
  ABOUT: {
    path: '/about',
    name: 'about',
  },
};