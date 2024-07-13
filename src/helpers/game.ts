import { EActionsBoardGame } from '@/constants/game';
import type {
  ICoordinate,
  TBoardColors,
  TColors,
  TPositionGame,
  TtypeTile,
} from '@/interfaces/board';
import type { IActionsTurn, TTotalPlayers } from '@/interfaces/game';
import type { IListTokens, IToken } from '@/interfaces/token';
import type { IPlayer } from '@/interfaces/user';
import { getPlayersColors } from '@/helpers/player';
import { EPositionGame, EtypeTile, type ESufixColors } from '@/constants/board';
import { POSITION_ELEMENTS_BOARD, POSITION_TILES } from './positions-board';

function validateDisabledDice(indexTurn: number, players: IPlayer[]): boolean {
  const { isOnline, isBot } = players[indexTurn];
  return !!((isBot || isOnline) && !(isOnline && indexTurn === 0));
}

export function getInitialActionsTurnValue(indexTurn: number, players: IPlayer[]): IActionsTurn {
  return {
    timerActivated: true,
    disabledDice: validateDisabledDice(indexTurn, players),
    showDice: true,
    diceValue: 0,
    diceList: [
      { key: 1, value: 6 },
      { key: 2, value: 5 },
    ],
    diceRollNumber: 0,
    isDisabledUI: false,
    actionsBoardGame: EActionsBoardGame.ROLL_DICE,
  };
}

export function getInitialPositionTokens(
  boardColor: TBoardColors,
  totalPlayers: TTotalPlayers,
  players: IPlayer[],
): IListTokens[] {
  const playersColors: ESufixColors[] = getPlayersColors(boardColor, totalPlayers);
  const tokensPosition: EPositionGame[] = getTokensPositionsOnBoard(totalPlayers);
  return players.map<IListTokens>((player, index) => {
    // Current user who is playing online, it is always at position 0.
    const isCurrentOnlineUser: boolean = index === 0;
    const { isBot = false, isOnline = false } = player;
    const canSelectToken = isOnline ? isCurrentOnlineUser : !isBot;
    const color = playersColors[index];
    const positionGame = tokensPosition[index];

    const tokens: IToken[] = getTokensInJail(positionGame, color, canSelectToken);

    return { index, positionGame, tokens };
  });
}

/**
 * Get the token positions at board
 * @param totalPlayers Number of players
 * @returns tokens position
 */
function getTokensPositionsOnBoard(totalPlayers: TTotalPlayers): EPositionGame[] {
  let tokenPositions: EPositionGame[];

  switch (totalPlayers) {
    case 2:
      tokenPositions = [EPositionGame.BOTTOM_LEFT, EPositionGame.TOP_RIGHT];
      break;
    case 3:
      tokenPositions = [EPositionGame.BOTTOM_LEFT, EPositionGame.TOP_LEFT, EPositionGame.TOP_RIGHT];
      break;
    case 4:
      tokenPositions = [
        EPositionGame.BOTTOM_LEFT,
        EPositionGame.TOP_LEFT,
        EPositionGame.TOP_RIGHT,
        EPositionGame.BOTTOM_RIGHT,
      ];
      break;
  }

  return tokenPositions;
}

function getTokensInJail(
  positionGame: TPositionGame,
  color: TColors,
  canSelectToken: boolean,
): IToken[] {
  const tokens: IToken[] = [];

  for (let index = 0; index < 4; index++) {
    const coordinate = getCoordinatesByTileType(EtypeTile.JAIL, positionGame, index);

    tokens.push({
      color,
      coordinate,
      typeTile: EtypeTile.JAIL,
      positionTile: index,
      index,
      diceAvailable: [],
      totalTokens: 1,
      position: 1,
      enableTooltip: false,
      isMoving: false,
      animated: false,
      canSelectToken,
    });
  }

  return tokens;
}

function getCoordinatesByTileType(
  tileType: TtypeTile,
  positionGame: TPositionGame,
  index: number,
): ICoordinate {
  let coordinate: ICoordinate = null as unknown as ICoordinate;

  switch (tileType) {
    case EtypeTile.JAIL:
      coordinate = POSITION_ELEMENTS_BOARD[positionGame].startPositions[index].coordinate;
      break;
    case EtypeTile.NORMAL:
      coordinate = POSITION_TILES[index].coordinate;
      break;
    case EtypeTile.EXIT:
      coordinate = POSITION_ELEMENTS_BOARD[positionGame].exitTiles[index].coordinate;
      break;
    case EtypeTile.END:
      coordinate = POSITION_ELEMENTS_BOARD[positionGame].finalPositions[index].coordinate;
      break;
  }

  return coordinate;
}
