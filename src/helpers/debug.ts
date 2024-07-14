import { LIST_TYPE_TILE } from '@/constants/debug';
import type { TPositionGame, TtypeTile } from '@/interfaces/board';
import type { IOptions, TSelects } from '@/interfaces/debug';
import type { IListTokens } from '@/interfaces/token';
import type { IPlayer } from '@/interfaces/user';
import { POSITION_ELEMENTS_BOARD, POSITION_TILES, SAFE_AREAS } from '@/helpers/positions-board';

function getDebugPositionsTiles(type: number, position: TPositionGame): IOptions[] {
  const tileType = LIST_TYPE_TILE[type] as TtypeTile;
  let positionTilesOptions: IOptions[];

  switch (tileType) {
    case 'JAIL':
      positionTilesOptions = POSITION_ELEMENTS_BOARD[position].startPositions.map((v) => ({
        id: v.index,
        label: v.index,
      }));
      break;
    case 'NORMAL':
      positionTilesOptions = POSITION_TILES.map((v) => ({
        id: v.index,
        label: `${v.index}${SAFE_AREAS.includes(v.index) ? ' - SAFE' : ''}`,
      }));
      break;
    case 'EXIT':
      positionTilesOptions = POSITION_ELEMENTS_BOARD[position].exitTiles.map((v) => ({
        id: v.index,
        label: v.index,
      }));
      break;
    case 'END':
      positionTilesOptions = POSITION_ELEMENTS_BOARD[position].finalPositions.map((v) => ({
        id: v.index,
        label: v.index,
      }));
      break;
  }

  return positionTilesOptions;
}

export function getOptionsSelects(
  selects: TSelects,
  players: IPlayer[],
  listTokens: IListTokens[],
): { player: IOptions[]; token: IOptions[]; type: IOptions[]; position: IOptions[] } {
  const playerOptions: IOptions[] = players.map((v) => ({ id: v.index, label: v.color }));
  const tokenOptions: IOptions[] =
    selects.player >= 0
      ? listTokens[selects.player].tokens.map((v) => ({ id: v.index, label: `Token ${v.index}` }))
      : [];
  const typesOptions: IOptions[] =
    selects.token >= 0
      ? LIST_TYPE_TILE.map((v, index) => ({
          id: index,
          label: v,
        }))
      : [];
  const positionOptions =
    selects.player >= 0
      ? getDebugPositionsTiles(selects.type, listTokens[selects.player].positionGame)
      : [];

  return {
    player: playerOptions,
    token: tokenOptions,
    type: typesOptions,
    position: positionOptions,
  };
}
