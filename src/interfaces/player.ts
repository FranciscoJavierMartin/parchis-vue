import type { TColors } from '@/interfaces/board';

export interface IPlayerOffline {
  id: string;
  index: number;
  name: string;
  color: TColors;
  disabled: boolean;
  isBot?: boolean;
  isOnline?: boolean;
  photo?: string;
  socketID?: string;
}
