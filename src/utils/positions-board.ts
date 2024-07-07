import type {
  IPoint,
  IPositionsItems,
  TExitTilesValues,
  TFinalPositionsValues,
  TLocationBoardElements,
} from '@/interfaces';
import { SIZE_TILE } from './constants';

/**
 * Store the walkthrought
 */
const POINTS: IPoint[] = [
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
    total: 6,
    indexBase: 31,
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
const FINAL_POSITIONS_VALUES: TFinalPositionsValues = {
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
const EXIT_TILES_VALUES: TExitTilesValues = {
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

function calculatePosition(point: IPoint): IPositionsItems[] {
  const position: IPositionsItems[] = [];

  const { x, y, increaseX, increaseY, total, indexBase } = point;

  for (let i = 0; i < total; i++) {
    const index = indexBase + i;
    const baseX = x + increaseX * i;
    const baseY = y + increaseY * i;

    const coordinate = {
      x: SIZE_TILE * baseX,
      y: SIZE_TILE * baseY,
    };

    position.push({ index, coordinate });
  }

  return position;
}

/**
 * Calculate starting position (tokens in jail)
 * @param baseX
 * @param baseY
 * @returns
 */
export function getStartPositions(baseX: number, baseY: number): IPositionsItems[] {
  const position: IPositionsItems[] = [];
  const center = SIZE_TILE / 2;

  // It's 4 because there are four tokens per player
  for (let i = 0; i < 4; i++) {
    const increaseX = i >= 2 ? 2 : 0;
    const increaseY = i % 2 !== 0 ? 2 : 0;

    const x = SIZE_TILE * (baseX + increaseX) - center;
    const y = SIZE_TILE * (baseY + increaseY) - center;

    position.push({
      index: i,
      coordinate: { x, y },
    });
  }

  return position;
}

export const POSITION_TILES:IPositionsItems[] = POINTS.flatMap((point) => {
  return calculatePosition(point);
});

export const POSITION_ELEMENTS_BOARD: TLocationBoardElements = {
  BOTTOM_LEFT: {
    exitTileIndex: 50,
    exitTiles: calculatePosition(EXIT_TILES_VALUES.BOTTOM_LEFT),
    finalPositions: FINAL_POSITIONS_VALUES.BOTTOM_LEFT,
    startPositions: getStartPositions(2, 11),
    startTileIndex: 0,
  },
  TOP_LEFT: {
    exitTileIndex: 11,
    exitTiles: calculatePosition(EXIT_TILES_VALUES.TOP_LEFT),
    finalPositions: FINAL_POSITIONS_VALUES.TOP_LEFT,
    startPositions: getStartPositions(2, 2),
    startTileIndex: 13,
  },
  TOP_RIGHT: {
    exitTileIndex: 24,
    exitTiles: calculatePosition(EXIT_TILES_VALUES.TOP_RIGHT),
    finalPositions: FINAL_POSITIONS_VALUES.TOP_RIGHT,
    startPositions: getStartPositions(11, 2),
    startTileIndex: 26,
  },
  BOTTOM_RIGHT: {
    exitTileIndex: 37,
    exitTiles: calculatePosition(EXIT_TILES_VALUES.BOTTOM_RIGHT),
    finalPositions: FINAL_POSITIONS_VALUES.BOTTOM_RIGHT,
    startPositions: getStartPositions(11, 11),
    startTileIndex: 39,
  },
};
