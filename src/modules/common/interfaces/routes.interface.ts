export type TRoutesName = 'home' | 'offline' | 'online' | 'about';

export interface IRoutes {
  HOME: {
    name: TRoutesName;
    path: string;
  };
  OFFLINE: {
    name: TRoutesName;
    path: string;
  };
  ONLINE: {
    name: TRoutesName;
    path: string;
  };
  ABOUT: {
    name: TRoutesName;
    path: string;
  };
}
