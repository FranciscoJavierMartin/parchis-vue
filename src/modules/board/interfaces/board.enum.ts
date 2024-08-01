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
