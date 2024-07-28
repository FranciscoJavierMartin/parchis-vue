import type { EActionsBoardGame, ETypeGame } from '@/constants/game';
import type { TYPES_ONLINE_GAMEPLAY } from '@/constants/online';
import type { IDiceList, TDiceValues } from '@/interfaces/dice';
import type { IUser } from '@/interfaces/user';
import type { TBoardColors } from '@/interfaces/board';

export type TTotalPlayers = 2 | 3 | 4;
export type TActionsBoardGame = keyof typeof EActionsBoardGame;
export type TTypeGame = keyof typeof ETypeGame;
export type TTypesOnlineGameplay = keyof typeof TYPES_ONLINE_GAMEPLAY;

export interface IActionsTurn {
  timerActivated: boolean;
  disabledDice: boolean;
  showDice: boolean;
  diceValue: 0 | TDiceValues;
  diceList: IDiceList[];
  diceRollNumber: number;
  isDisabledUI: boolean;
  actionsBoardGame?: TActionsBoardGame;
}

export interface IGameOver {
  showModal: boolean;
  gameOver: boolean;
}

export interface DataOfflineGame {
  initialTurn: number;
  users: IUser[];
  totalPlayers: TTotalPlayers;
  boardColor: TBoardColors;
}
