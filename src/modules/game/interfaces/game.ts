import type { EActionsBoardGame, ETypeGame } from '@/modules/game/constants/game';
import type { TYPES_ONLINE_GAMEPLAY } from '@/modules/online/constants/online';
import type { IDiceList, TDiceValues } from '@/modules/dice/interfaces/dice';
import type { IUser } from '@/modules/players/interfaces/user';
import type { TBoardColors } from '@/modules/board/interfaces/board';

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
