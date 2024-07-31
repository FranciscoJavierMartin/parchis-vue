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
