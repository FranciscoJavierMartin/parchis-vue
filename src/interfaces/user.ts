import type { TColors } from '@/interfaces/board';
import type { ITypeChatMessage } from '@/interfaces/chat';
import type { TPlayerRankingPosition } from '@/interfaces/profile';

export interface IUser {
  id: string;
  name: string;
  isBot?: boolean;
  isOnline?: boolean;
  photo?: string;
  socketID?: string;
}

export interface IPlayer extends IUser {
  isOffline: boolean;
  index: number;
  finished: boolean;
  ranking: TPlayerRankingPosition;
  color: TColors;
  isMuted?: boolean;
  chatMessage?: string;
  typeMessage?: ITypeChatMessage;
  counterMessage: number;
}
