import { LIST_TYPE_TILE } from '@/constants/debug';
import type { IPositionsItems, TPositionGame, TtypeTile } from '@/interfaces/board';
import type { IOptions, TSelects } from '@/interfaces/debug';
import type { IListTokens } from '@/interfaces/token';
import type { IPlayer } from '@/interfaces/user';
import { POSITION_ELEMENTS_BOARD, POSITION_TILES, SAFE_AREAS } from '@/helpers/positions-board';
import { EtypeTile } from '@/constants/board';

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
      ? listTokens[selects.player].tokens.map((v) => ({
          id: v.index,
          label: `Token ${v.index}`,
        }))
      : [];
  const typesOptions: IOptions[] =
    selects.token >= 0
      ? LIST_TYPE_TILE.map((v, index) => ({
          id: index,
          label: v,
        }))
      : [];
  const positionOptions: IOptions[] =
    selects.type >= 0
      ? getDebugPositionsTiles(selects.type, listTokens[selects.player].positionGame)
      : [];

  return {
    player: playerOptions,
    token: tokenOptions,
    type: typesOptions,
    position: positionOptions,
  };
}

function getDebugCoordinates(tileType: TtypeTile, positionGame: TPositionGame): IPositionsItems[] {
  let coordinates: IPositionsItems[] = [];

  switch (tileType) {
    case EtypeTile.JAIL:
      coordinates = POSITION_ELEMENTS_BOARD[positionGame].startPositions;
      break;
    case EtypeTile.NORMAL:
      coordinates = POSITION_TILES;
      break;
    case EtypeTile.EXIT:
      coordinates = POSITION_ELEMENTS_BOARD[positionGame].exitTiles;
      break;
    case EtypeTile.END:
      coordinates = POSITION_ELEMENTS_BOARD[positionGame].finalPositions;
      break;
  }

  return coordinates;
}

export function validateChangeToken(selects: TSelects, listTokens: IListTokens[]): IListTokens[] {
  const tileType = LIST_TYPE_TILE[selects.type] as TtypeTile;
  const copyListTokens: IListTokens[] = JSON.parse(JSON.stringify(listTokens));
  const { positionGame } = copyListTokens[selects.player];

  const coordinates = getDebugCoordinates(tileType, positionGame);
  const { coordinate } = coordinates[selects.position];

  copyListTokens[selects.player].tokens[selects.token].coordinate = coordinate;
  copyListTokens[selects.player].tokens[selects.token].typeTile = tileType;
  copyListTokens[selects.player].tokens[selects.token].positionTile = selects.position;

  return copyListTokens;
}

export function copyToClipboard(text: string = ''): void {
  navigator.clipboard.writeText(text);
}
