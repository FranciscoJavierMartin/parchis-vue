import { SIZE_TILE } from '@/constants/sizes';
import type { IPoint, TExitTilesValues, TFinalPositionsValues } from '@/interfaces/board';

/**
 * Store the walkthrought
 */
export const POINTS: IPoint[] = [
  {
    x: 6,
    y: 13,
    increaseX: 0,
    increaseY: -1,
    total: 5,
    indexBase: 0,
  },
  {
    x: 5,
    y: 8,
    increaseX: -1,
    increaseY: 0,
    total: 6,
    indexBase: 5,
  },
  {
    x: 0,
    y: 7,
    increaseX: 0,
    increaseY: -1,
    total: 2,
    indexBase: 11,
  },
  {
    x: 1,
    y: 6,
    increaseX: 1,
    increaseY: 0,
    total: 5,
    indexBase: 13,
  },
  {
    x: 6,
    y: 5,
    increaseX: 0,
    increaseY: -1,
    total: 6,
    indexBase: 18,
  },
  {
    x: 7,
    y: 0,
    increaseX: 1,
    increaseY: 0,
    total: 2,
    indexBase: 24,
  },
  {
    x: 8,
    y: 1,
    increaseX: 0,
    increaseY: 1,
    total: 5,
    indexBase: 26,
  },
  {
    x: 9,
    y: 6,
    increaseX: 1,
    increaseY: 0,
    total: 6,
    indexBase: 31,
  },
  {
    x: 14,
    y: 7,
    increaseX: 0,
    increaseY: 1,
    total: 2,
    indexBase: 37,
  },
  {
    x: 13,
    y: 8,
    increaseX: -1,
    increaseY: 0,
    total: 5,
    indexBase: 39,
  },
  {
    x: 8,
    y: 9,
    increaseX: 0,
    increaseY: 1,
    total: 6,
    indexBase: 44,
  },
  {
    x: 7,
    y: 14,
    increaseX: -1,
    increaseY: 0,
    total: 2,
    indexBase: 50,
  },
];

/*
 * Store the values of position where they are in the final tile.
 */
export const FINAL_POSITIONS_VALUES: TFinalPositionsValues = {
  BOTTOM_LEFT: [
    {
      index: 0,
      coordinate: {
        x: Math.round(SIZE_TILE * 7 - SIZE_TILE / 1.8),
        y: Math.round(SIZE_TILE * 8 + SIZE_TILE / 8),
      },
    },
    {
      index: 1,
      coordinate: {
        x: Math.round(SIZE_TILE * 7),
        y: Math.round(SIZE_TILE * 8 + SIZE_TILE / 8),
      },
    },
    {
      index: 2,
      coordinate: {
        x: Math.round(SIZE_TILE * 7 + SIZE_TILE / 1.8),
        y: Math.round(SIZE_TILE * 8 + SIZE_TILE / 8),
      },
    },
    {
      index: 3,
      coordinate: {
        x: Math.round(SIZE_TILE * 7),
        y: Math.round(SIZE_TILE * 8 - SIZE_TILE / 2.3),
      },
    },
  ],
  TOP_LEFT: [
    {
      index: 0,
      coordinate: {
        x: Math.round(SIZE_TILE * 6 - SIZE_TILE / 8),
        y: Math.round(SIZE_TILE * 7 - SIZE_TILE / 1.8),
      },
    },
    {
      index: 1,
      coordinate: {
        x: Math.round(SIZE_TILE * 6 - SIZE_TILE / 8),
        y: Math.round(SIZE_TILE * 7),
      },
    },
    {
      index: 2,
      coordinate: {
        x: Math.round(SIZE_TILE * 6 - SIZE_TILE / 8),
        y: Math.round(SIZE_TILE * 7 + SIZE_TILE / 1.8),
      },
    },
    {
      index: 3,
      coordinate: {
        x: Math.round(SIZE_TILE * 6 + SIZE_TILE / 2.3),
        y: Math.round(SIZE_TILE * 7),
      },
    },
  ],
  TOP_RIGHT: [
    {
      index: 0,
      coordinate: {
        x: Math.round(SIZE_TILE * 7 + SIZE_TILE / 1.8),
        y: Math.round(SIZE_TILE * 6 - SIZE_TILE / 8),
      },
    },
    {
      index: 1,
      coordinate: {
        x: Math.round(SIZE_TILE * 7),
        y: Math.round(SIZE_TILE * 6 - SIZE_TILE / 8),
      },
    },
    {
      index: 2,
      coordinate: {
        x: Math.round(SIZE_TILE * 7 - SIZE_TILE / 1.8),
        y: Math.round(SIZE_TILE * 6 - SIZE_TILE / 8),
      },
    },
    {
      index: 3,
      coordinate: {
        x: Math.round(SIZE_TILE * 7),
        y: Math.round(SIZE_TILE * 6 + SIZE_TILE / 2.3),
      },
    },
  ],
  BOTTOM_RIGHT: [
    {
      index: 0,
      coordinate: {
        x: Math.round(SIZE_TILE * 8 + SIZE_TILE / 8),
        y: Math.round(SIZE_TILE * 7 + SIZE_TILE / 1.8),
      },
    },
    {
      index: 1,
      coordinate: {
        x: Math.round(SIZE_TILE * 8 + SIZE_TILE / 8),
        y: Math.round(SIZE_TILE * 7),
      },
    },
    {
      index: 2,
      coordinate: {
        x: Math.round(SIZE_TILE * 8 + SIZE_TILE / 8),
        y: Math.round(SIZE_TILE * 7 - SIZE_TILE / 1.8),
      },
    },
    {
      index: 3,
      coordinate: {
        x: Math.round(SIZE_TILE * 8 - SIZE_TILE / 2.3),
        y: Math.round(SIZE_TILE * 7),
      },
    },
  ],
};

/**
 * Store the values to calculate the position of starting tiles
 */
export const EXIT_TILES_VALUES: TExitTilesValues = {
  BOTTOM_LEFT: {
    x: 7,
    y: 13,
    increaseX: 0,
    increaseY: -1,
    total: 5,
    indexBase: 0,
  },
  TOP_LEFT: {
    x: 1,
    y: 7,
    increaseX: 1,
    increaseY: 0,
    total: 5,
    indexBase: 0,
  },
  TOP_RIGHT: {
    x: 7,
    y: 1,
    increaseX: 0,
    increaseY: 1,
    total: 5,
    indexBase: 0,
  },
  BOTTOM_RIGHT: {
    x: 13,
    y: 7,
    increaseX: -1,
    increaseY: 0,
    total: 5,
    indexBase: 0,
  },
};
