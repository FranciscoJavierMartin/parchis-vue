import type {
  EBoardColors,
  EColors,
  EPositionGame,
  ESufixColors,
  EtypeTile,
} from '@/modules/board/constants/board';

export type TBoardColors = keyof typeof EBoardColors;
export type TColors = keyof typeof EColors;
export type TSufixColors = keyof typeof ESufixColors;
export type TPositionGame = keyof typeof EPositionGame;
export type TtypeTile = keyof typeof EtypeTile;

export interface ICoordinate {
  x: number;
  y: number;
}

export interface IPositionsItems {
  index: number;
  coordinate: ICoordinate;
}

export interface IPoint {
  x: number;
  y: number;
  increaseX: number;
  increaseY: number;
  total: number;
  indexBase: number;
}

export type TFinalPositionsValues = Record<TPositionGame, IPositionsItems[]>;
export type TExitTilesValues = Record<TPositionGame, IPoint>;

export interface IPositionGame {
  exitTileIndex: number;
  exitTiles: IPositionsItems[];
  finalPositions: IPositionsItems[];
  startPositions: IPositionsItems[];
  startTileIndex: number;
}

export type TLocationBoardElements = Record<TPositionGame, IPositionGame>;
