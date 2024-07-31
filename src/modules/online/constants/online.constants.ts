import { EActionsBoardGame, ENextStepGame } from '@game/constants/game';
import { TYPES_CHAT_MESSAGES } from '@chat/constants/chat';
import type { ISocketListenActions } from '@online/interfaces/online';
import type { TOptionsGame } from '@sounds/interfaces/sounds';

/**
 * Delay before send end movement confirmation to socket
 */
export const DELAY_DONE_TOKEN_MOVEMENT_SOCKET = 500;

/**
 * Socket port for development mode
 */
export const SOCKET_PORT_DEV = 3000;

/**
 * API URL for authentication
 */
export const API_URL = '/api/me';

/**
 * API URL for logout
 */
export const API_LOGOUT = '/api/logout';

/**
 * Initial state for socket events
 */
export const INITIAL_SOCKET_LISTEN_ACTIONS: ISocketListenActions = {
  change: false,
  type: EActionsBoardGame.ROLL_DICE,
  data: {
    [EActionsBoardGame.ROLL_DICE]: 1,
    [EActionsBoardGame.SELECT_TOKEN]: {
      diceIndex: -1,
      tokenIndex: -1,
    },
    [EActionsBoardGame.OPPONENT_LEAVE]: '',
    [EActionsBoardGame.CHAT_MESSAGE]: {
      userID: '',
      type: TYPES_CHAT_MESSAGES.EMOJI,
      messageIndex: 0,
    },
    [EActionsBoardGame.DONE_DICE]: false,
    [EActionsBoardGame.DONE_TOKEN_MOVEMENT]: ENextStepGame.NEXT_TURN,
  },
};

export const INITIAL_OPTIONS_GAME: TOptionsGame = {
  [EOptionsGame.SOUND]: true,
  [EOptionsGame.MUSIC]: true,
  [EOptionsGame.CHAT]: true,
};
