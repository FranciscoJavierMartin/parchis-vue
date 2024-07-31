import type { IEOptionsGame, IESounds } from '@/modules/online/interfaces/online.interface';

/**
 * Game options
 */
export type TOptionsGame = Record<IEOptionsGame, boolean>;
export type TPlaySoundFunction = (type: IESounds) => void;

/**
 * Game options
 */
export enum EOptionsGame {
  SOUND = 'SOUND',
  MUSIC = 'MUSIC',
  CHAT = 'CHAT',
}

export enum ESounds {
  ROLL_DICE = 'ROLL_DICE',
  TOKEN_MOVE = 'TOKEN_MOVE',
  GET_SIX = 'GET_SIX',
  SAFE_ZONE = 'SAFE_ZONE',
  TOKEN_JAIL = 'TOKEN_JAIL',
  CHAT = 'CHAT',
  USER_OFFLINE = 'USER_OFFLINE',
  USER_ONLINE = 'USER_ONLINE',
  GAMER_OVER = 'GAMER_OVER',
  CLICK = 'CLICK',
}
