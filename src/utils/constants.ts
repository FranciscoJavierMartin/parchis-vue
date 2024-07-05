import type {
  IActionsMoveToken,
  IActionsTurn,
  IOptionsGame,
  IPredefinedChatMessages,
  ISocketError,
  ISocketListenActions,
  TDicevalues,
} from '@/interfaces';

/**
 * Board dimmensions
 */
export const BASE_HEIGHT = 732;
export const BASE_WIDTH = 412;
export const SIZE_BOARD = BASE_WIDTH - 22;
export const SIZE_TILE = SIZE_BOARD / 15;
export const DIE_SIZE_TOOLTIP = SIZE_TILE + SIZE_TILE * 0.15;

// Board orientations.
/**
 * RGYB -> Red, green, yellow and blue.
 * BRGY -> Blue, red, green and yellow.
 * YBRG -> Yellow, blue, red and green.
 * GYBR -> Green, yellow, blue and red.
 */
export enum EBoardColors {
  RGYB = 'RGYB',
  BRGY = 'BRGY',
  YBRG = 'YBRG',
  GYBR = 'GYBR',
}

/**
 * Colors used on board
 */
export enum EColors {
  RED = 'RED',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
}

/**
 * Store the color prefixes
 */
export enum ESufixColors {
  R = 'RED',
  B = 'BLUE',
  Y = 'YELLOW',
  G = 'GREEN',
}

/**
 * Players location in board
 */
export enum EPositionGame {
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  TOP_LEFT = 'TOP_LEFT',
  TOP_RIGHT = 'TOP_RIGHT',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
}

export enum EPositionProfiles {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
}

export enum EPositionProfile {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

/**
 * Tile types in board
 */
export enum EtypeTile {
  JAIL = 'JAIL',
  NORMAL = 'NORMAL',
  EXIT = 'EXIT',
  END = 'END',
}

export enum EActionsBoardGame {
  'ROLL_DICE' = 'ROLL_DICE',
  'SELECT_TOKEN' = 'SELECT_TOKEN',
  'OPPONENT_LEAVE' = 'OPPONENT_LEAVE',
  'CHAT_MESSAGE' = 'CHAT_MESSAGE',
  'START_GAME' = 'START_GAME',
  'DONE_DICE' = 'DONE_DICE',
  'DONE_TOKEN_MOVEMENT' = 'DONE_TOKEN_MOVEMENT',
}

export enum ENextStepGame {
  'ROLL_DICE_AGAIN' = 'ROLL_DICE_AGAIN',
  'MOVE_TOKENS_AGAIN' = 'MOVE_TOKENS_AGAIN',
  'NEXT_TURN' = 'NEXT_TURN',
}

export enum ETypeGame {
  'OFFLINE' = 'OFFLINE',
  'ONLINE' = 'ONLINE',
}

/**
 * Z index for tokens
 */
export const BASE_ZINDEX_TOKEN = 1;
export const ZINDEX_TOKEN_SELECT = 7;

/**
 * Default value for actions
 */
export const DEFAULT_VALUE_ACTION_TURN: IActionsTurn = {
  timerActivated: false,
  disabledDice: true,
  diceValue: 0,
  diceList: [],
  diceRollNumber: 0,
  actionsBoardGame: EActionsBoardGame.ROLL_DICE,
  showDice: false,
  isDisabledUI: false,
};

/**
 * Dice value to escape
 */
export const DICE_VALUE_GET_OUT_JAIL: TDicevalues = 6;

/**
 * Maximum of dice launches.
 */
export const MAXIMUM_DICE_PER_TURN = 3;

/**
 * Max amount of tokens to show in a tile
 */
export const MAXIMUM_VISIBLE_TOKENS_PER_CELL = 4;

/**
 * Game chronometer
 */
export const TIME_INTERVAL_CHRONOMETER = 50; // org (50), debug: 10,5,0.5

/**
 * Token movement in miliseconds.
 */
export const TOKEN_MOVEMENT_INTERVAL_VALUE = 200; // org (200), debug 100,50,0.5

/**
 * Dice rolling time
 */
export const ROLL_TIME_VALUE = 0.6; // org (0.6), debug 0.1

/**
 * Delay before send end movement confirmation to socket
 */
export const DELAY_DONE_TOKEN_MOVEMENT_SOCKET = 500;

/**
 * Delay in show game over modal
 */
export const WAIT_SHOW_MODAL_GAME_OVER = 800;

/**
 * Socket port for development mode
 */
export const SOCKET_PORT_DEV = 3000;

/**
 * Initial state for token movement
 */
export const INITIAL_ACTIONS_MOVE_TOKEN: IActionsMoveToken = {
  isRunning: false,
  tokenIndex: 0,
  totalCellsMove: 0,
  cellsCounter: 0,
};

/**
 * Sufixes for ranking positions
 */
export const PREFIX_RANKING = ['st', 'nd', 'rd', 'th'];

/**
 * Room range
 */
export const ROOM_RANGE = 5;

/**
 * API URL for authentication
 */
export const API_URL = '/api/me';

/**
 * API URL for logout
 */
export const API_LOGOUT = '/api/logout';

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

/**
 * Errors in sockets
 */
export const SOCKET_ERROR_MESSAGES: ISocketError = {
  INVALID_ROOM: 'The room is not valid',
  INVALID_COLOR: 'Invalid token color',
  INVALID_USER: 'Invalid user',
  UNAUTHENTICATED: 'User is not authenticated',
  AUTHENTICATED: 'User already authenticated',
};

/**
 * Types messages in chat
 */
export enum TYPES_CHAT_MESSAGES {
  EMOJI = 'EMOJI',
  TEXT = 'TEXT',
}

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

/**
 * Chat predefined messages
 */
export const PREDEFINED_CHAT_MESSAGES: IPredefinedChatMessages = {
  [TYPES_CHAT_MESSAGES.TEXT]: [
    'Hi',
    'Nice move!',
    'Oh no!',
    'Good game!',
    'Best of luck!',
    'Oops...',
    'Thanks!',
    'Bye bye',
    'Play fast',
    'Sorry!',
    'Catch me if you can!',
    'Please do not kill me',
    'Unlucky',
    'Not again!',
    "You're lucky!",
    'I will eat you',
  ].map((value, index) => ({ index, value })),
  [TYPES_CHAT_MESSAGES.EMOJI]: ['😅', '🤬', '😭', '🤯', '🥺', '😩'].map((value, index) => ({
    index,
    value,
  })),
};

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

export const INITIAL_OPTIONS_GAME: IOptionsGame = {
  [EOptionsGame.SOUND]: true,
  [EOptionsGame.MUSIC]: true,
  [EOptionsGame.CHAT]: true,
};
