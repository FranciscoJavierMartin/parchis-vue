import type { TColors } from '@board/interfaces/board';
import type { ITypeChatMessage } from '@chat/interfaces/chat';
import type { TPlayerRankingPosition } from '@profiles/interfaces/profile';

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