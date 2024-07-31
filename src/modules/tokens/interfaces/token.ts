import type {
  ICoordinate,
  TColors,
  TPositionGame,
  TtypeTile,
} from '@/modules/board/interfaces/board';
import type { IDiceList } from '@/modules/dice/interfaces/dice';

/**
 * totalTokens: How many tokens are in the current tile, by default is 1.
 * position: Determine where the token is shown. It's only applied when
 * totalToken is greater than one.
 * positionTile is the cell number in board.
 */
export interface IToken {
  color: TColors;
  coordinate: ICoordinate;
  typeTile: TtypeTile;
  positionTile: number;
  index: number;
  diceAvailable: IDiceList[];
  canSelectToken: boolean;
  totalTokens: number;
  position: number;
  enableTooltip: boolean;
  isMoving: boolean;
  animated: boolean;
}

export interface IListTokens {
  index: number;
  positionGame: TPositionGame;
  tokens: IToken[];
}

export type TTokenByPositionType = Record<TtypeTile, IToken[]>;

export interface IActionsMoveToken {
  isRunning: boolean;
  tokenIndex: number;
  totalCellsMove: number;
  cellsCounter: number;
}

export type TShowTotalTokens = Record<number, number>;

export interface ISelectTokenValues {
  diceIndex: number;
  tokenIndex: number;
}
