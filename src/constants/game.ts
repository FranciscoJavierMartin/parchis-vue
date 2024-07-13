import type { TDiceValues } from '@/interfaces/dice';
import type { IActionsTurn } from '@/interfaces/game';
import type { IActionsMoveToken } from '@/interfaces/token';

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
export const DICE_VALUE_GET_OUT_JAIL: TDiceValues = 6;

/**
 * Maximum of dice launches.
 */
export const MAXIMUM_DICE_PER_TURN = 3;

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
 * Delay in show game over modal
 */
export const WAIT_SHOW_MODAL_GAME_OVER = 800;

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
