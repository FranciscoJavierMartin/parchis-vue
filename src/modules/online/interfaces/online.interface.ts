import type { IUser } from '@/modules/players/interfaces/user.interface';
import type {
  TActionsBoardGame,
  TTotalPlayers,
  TTypeGame,
  TTypesOnlineGameplay,
} from '@game/interfaces/game.interface';
import type { TBoardColors, TColors } from '@board/interfaces/board.interface';
import type { TDiceValues } from '@dice/interfaces/dice.interface';
import type { ISelectTokenValues } from '@/modules/tokens/interfaces/token.interface';
import type { ISocketListenChatMessage } from '@chat/interfaces/chat.interface';
import type { EOptionsGame } from '@options/interfaces/options.enum';
import type { ESounds } from '@sounds/interfaces/sounds.enum';
import type { EActionsBoardGame, ENextStepGame } from '@game/interfaces/game.enum';

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

/**
 * Online mode
 */
export enum TYPES_ONLINE_GAMEPLAY {
  NONE = 'NONE',
  JOIN_EXISTING_ROOM = 'JOIN_EXISTING_ROOM',
  JOIN_ROOM = 'JOIN_ROOM',
  CREATE_ROOM = 'CREATE_ROOM',
}

/**
 * Errors in room
 */
export enum SocketErrors {
  INVALID_ROOM = 'INVALID_ROOM',
  INVALID_COLOR = 'INVALID_COLOR',
  INVALID_USER = 'INVALID_USER',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  AUTHENTICATED = 'AUTHENTICATED',
}
