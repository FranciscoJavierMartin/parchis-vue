import {
  EXIT_TILES_VALUES,
  FINAL_POSITIONS_VALUES,
  POINTS,
} from '@board/constants/positions-board.constants';
import { SIZE_TILE } from '@board/constants/sizes.constants';
import type {
  IPoint,
  IPositionsItems,
  TLocationBoardElements,
} from '@board/interfaces/board.interface';

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
function getStartPositions(baseX: number, baseY: number): IPositionsItems[] {
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

/**
 * Safe tiles index
 */
export const SAFE_AREAS: number[] = [0, 8, 13, 21, 26, 34, 39, 47];

export const POSITION_TILES: IPositionsItems[] = POINTS.flatMap((point) => {
  return calculatePosition(point);
});

export const TOTAL_TILES: number = POSITION_TILES.length;

export const TOTAL_EXIT_TILES: number = 6;

/**
 * Store the board positions, depending on player location
 */
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
