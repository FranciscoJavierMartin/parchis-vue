import type { EActionsBoardGame, ENextStepGame } from '@/constants/game';
import type { EOptionsGame, ESounds, SocketErrors } from '@/constants/online';
import type { IUser } from '@/interfaces/user';
import type {
  TActionsBoardGame,
  TTotalPlayers,
  TTypeGame,
  TTypesOnlineGameplay,
} from '@/interfaces/game';
import type { TBoardColors, TColors } from '@/interfaces/board';
import type { TDiceValues } from '@/interfaces/dice';
import type { ISelectTokenValues } from '@/interfaces/token';
import type { ISocketListenChatMessage } from '@/interfaces/chat';

export type TSocketErrors = keyof typeof SocketErrors;
export type ISocketError = Record<TSocketErrors, string>;
export type IEOptionsGame = keyof typeof EOptionsGame;
export type IESounds = keyof typeof ESounds;
export type IENextStepGame = keyof typeof ENextStepGame;

export interface IAuthOptions {
  socialName: string;
  routerURL: string;
}

export interface IAuth {
  isAuth: boolean;
  authOptions: IAuthOptions[];
  user?: IUser;
  serviceError?: boolean;
}

export interface IDataPlayWithFriends {
  type: TTypesOnlineGameplay;
  roomName: string;
  totalPlayers: TTotalPlayers;
  initialColor?: TColors;
}

export interface IDataSocketUser {
  id: string;
  name: string;
}

export interface IDataSocket {
  type: TTypesOnlineGameplay;
  totalPlayers: TTotalPlayers | 0;
  roomName: string;
  initialColor?: TColors;
  playAsGuest: boolean;
  user: IDataSocketUser;
}

/**
 * User data from socket
 */
export interface IUserSocket {
  id: string;
  name: string;
  photo?: string;
  socketID: string;
  color: TColors;
}

/**
 * Room data from socket
 */
export interface IDataRoom {
  initialTurnUserID: string;
  isFull: boolean;
  roomName: string;
  users: IUserSocket[];
  totalPlayers: TTotalPlayers;
}

/**
 * Game component data
 */
export interface IDataOnline {
  totalPlayers: TTotalPlayers;
  initialTurn: number;
  users: IUser[];
  boardColor: TBoardColors;
  roomName: string;
  typeGame: TTypeGame;
  //   socket: Socket;
}

/**
 * Order in what is shown in the UI
 */
export type TDataRoomUserOrder = Record<number, IUserSocket>;

/**
 * Info to render users
 */
export interface IDataRoomSocket {
  isFull: boolean;
  boardColor: TBoardColors;
  totalPlayers: TTotalPlayers;
  orderPlayers: TDataRoomUserOrder;
}

export interface ISocketListenData {
  [EActionsBoardGame.ROLL_DICE]: TDiceValues;
  [EActionsBoardGame.SELECT_TOKEN]: ISelectTokenValues;
  [EActionsBoardGame.OPPONENT_LEAVE]: string;
  [EActionsBoardGame.CHAT_MESSAGE]: ISocketListenChatMessage;
  [EActionsBoardGame.DONE_DICE]: boolean;
  [EActionsBoardGame.DONE_TOKEN_MOVEMENT]: IENextStepGame;
}

/**
 * Socket data
 */
export interface ISocketListenActions {
  change: boolean;
  type: TActionsBoardGame;
  data: ISocketListenData;
}

/**
 * Data from client to socket
 */
export interface ISocketActions {
  type: TActionsBoardGame;
  roomName: string;
  [EActionsBoardGame.ROLL_DICE]: TDiceValues;
  [EActionsBoardGame.SELECT_TOKEN]: ISelectTokenValues;
  [EActionsBoardGame.OPPONENT_LEAVE]: string;
  [EActionsBoardGame.CHAT_MESSAGE]: ISocketListenChatMessage;
  [EActionsBoardGame.DONE_DICE]: boolean;
  [EActionsBoardGame.DONE_TOKEN_MOVEMENT]: IENextStepGame;
}

/**
 * Service worker types
 */
export interface IServiceWorker {
  serviceWorkerInitialized?: boolean;
  serviceWorkerUpdated?: boolean;
  serviceWorkerRegistration?: ServiceWorkerRegistration;
}
