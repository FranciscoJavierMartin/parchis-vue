import {
  DICE_VALUE_GET_OUT_JAIL,
  EActionsBoardGame,
  MAXIMUM_DICE_PER_TURN,
} from '@/constants/game';
import type {
  ICoordinate,
  TBoardColors,
  TColors,
  TPositionGame,
  TtypeTile,
} from '@/interfaces/board';
import type { IActionsTurn, TTotalPlayers } from '@/interfaces/game';
import type {
  IListTokens,
  IToken,
  TShowTotalTokens,
  TTokenByPositionType,
} from '@/interfaces/token';
import type { IPlayer } from '@/interfaces/user';
import { getPlayersColors } from '@/helpers/player';
import { EPositionGame, EtypeTile, type ESufixColors } from '@/constants/board';
import { POSITION_ELEMENTS_BOARD, POSITION_TILES } from '@/helpers/positions-board';
import type { IDiceList, TDiceValues } from '@/interfaces/dice';
import { delay } from '@/helpers/debounce';
import { TOKENS_JAIN_AND_OUTSITE } from '@/helpers/states';
import { cloneDeep } from '@/helpers/clone';

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
      // { key: 1, value: 6 },
      // { key: 2, value: 6 },
    ],
    diceRollNumber: 0,
    isDisabledUI: false,
    actionsBoardGame: EActionsBoardGame.ROLL_DICE,
  };
}

// If you replace the normal returned value, you can use a value to start from a state.
export function getInitialPositionTokens(
  boardColor: TBoardColors,
  totalPlayers: TTotalPlayers,
  players: IPlayer[],
): IListTokens[] {
  const playersColors: ESufixColors[] = getPlayersColors(boardColor, totalPlayers);
  const tokensPosition: EPositionGame[] = getTokensPositionsOnBoard(totalPlayers);
  //TODO: Uncomment
  // return players.map<IListTokens>((player, index) => {
  //   // Current user who is playing online, it is always at position 0.
  //   const isCurrentOnlineUser: boolean = index === 0;
  //   const { isBot = false, isOnline = false } = player;
  //   const canSelectToken = isOnline ? isCurrentOnlineUser : !isBot;
  //   const color = playersColors[index];
  //   const positionGame = tokensPosition[index];

  //   const tokens: IToken[] = getTokensInJail(positionGame, color, canSelectToken);

  //   return { index, positionGame, tokens };
  // });

  return TOKENS_JAIN_AND_OUTSITE;
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

function validateThreeConsecutiveRolls(diceList: IDiceList[]): boolean {
  let isConsecutiveDice: boolean = false;

  if (diceList.length === MAXIMUM_DICE_PER_TURN) {
    const firstDice: TDiceValues = diceList[0].value;
    isConsecutiveDice = diceList.every((v) => v.value === firstDice);
  }

  return isConsecutiveDice;
}

async function validateNextTurn(
  currentTurn: number,
  players: IPlayer[],
  actionsTurn: IActionsTurn,
  addLastDice: boolean = false,
  addDelayNextTurn: boolean = false,
): Promise<{ actionsTurn: IActionsTurn; nextTurn: number }> {
  let newActionTurn: IActionsTurn = JSON.parse(JSON.stringify(actionsTurn));
  let nextTurn = currentTurn;

  if (addLastDice) {
    const value = newActionTurn.diceValue as TDiceValues;
    newActionTurn.diceList.push({ key: Math.random(), value });
    newActionTurn.disabledDice = true;
    newActionTurn.timerActivated = false;
  }

  if (addDelayNextTurn) {
    await delay(250);
  }

  // Iterate in an infinite loop until one player is ready to play
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-constant-condition
  while (true) {
    nextTurn = (nextTurn + 1) % players.length;

    const { finished, isOffline } = players[nextTurn];

    if (!finished && !isOffline) {
      newActionTurn = getInitialActionsTurnValue(nextTurn, players);
      break;
    }
  }

  return { actionsTurn: newActionTurn, nextTurn };
}

function getTokensValueByCellType(listTokens: IListTokens): TTokenByPositionType {
  return Object.keys(EtypeTile)
    .map((type) => ({
      [type]: listTokens.tokens.filter((token) => token.typeTile === type),
    }))
    .reduce<TTokenByPositionType>(
      (acc, value) => ({ ...acc, ...value }),
      // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
      {} as TTokenByPositionType,
    );
}

function getUniquePositionTokenCell(tokens: IToken[]): Record<number, number> {
  return tokens.reduce<Record<number, number>>((acc, { positionTile, index }) => {
    if (!((acc[positionTile] ?? -1) >= 0)) {
      acc[positionTile] = index;
    }

    return acc;
  }, {});
}

function validateMovementTokenWithValueDice(
  currentTurn: number,
  diceValue: TDiceValues,
  listTokens: IListTokens[],
  positionGame: TPositionGame,
  positionTile: number,
): boolean {
  const { exitTileIndex } = POSITION_ELEMENTS_BOARD[positionGame];
  // TODO: Remove this linter exception
  // eslint-disable-next-line prefer-const
  let isValid: boolean = true;
  console.log(exitTileIndex);
  return isValid;
}

function validateDiceForTokenMovement(
  currentTurn: number,
  listTokens: IListTokens[],
  diceList: IDiceList[],
): {
  canMoveTokens: boolean;
  copyListTokens: IListTokens[];
} {
  const copyListTokens = cloneDeep(listTokens);
  const { positionGame } = copyListTokens[currentTurn];
  const { JAIL, NORMAL, EXIT } = getTokensValueByCellType(copyListTokens[currentTurn]);
  const indexSixAvailable = diceList.findIndex((v) => v.value === DICE_VALUE_GET_OUT_JAIL);

  if (JAIL.length && indexSixAvailable >= 0) {
    JAIL.forEach(({ index }) => {
      copyListTokens[currentTurn].tokens[index].diceAvailable = [diceList[indexSixAvailable]];
    });
  }

  // TODO: Replace with some
  const totalTokensCanMove = copyListTokens[currentTurn].tokens.filter(
    (v) => v.diceAvailable.length,
  );
  const canMoveTokens: boolean = totalTokensCanMove.length !== 0;

  [NORMAL, EXIT].forEach((tokensEvaluate, evaluatedIndex) => {
    if (tokensEvaluate.length) {
      const positionAndToken = getUniquePositionTokenCell(tokensEvaluate);

      Object.values(positionAndToken).forEach((positionTile) => {
        const diceEvaluated: { diceValue: TDiceValues; isValid: boolean }[] = [];

        const diceAvailable: IDiceList[] = [];

        diceList.forEach(({ value: diceValue }) => {
          const evaluated = diceEvaluated.find((v) => v.diceValue === diceValue);
          let isValid: boolean = evaluated?.isValid ?? false;

          if (!evaluated) {
            if (evaluatedIndex === 0) {
              isValid = validateMovementTokenWithValueDice(
                currentTurn,
                diceValue,
                listTokens,
                positionGame,
                positionTile,
              );
            }
          }
        });
      });
    }
  });

  return { canMoveTokens, copyListTokens };
}

export async function validateDicesForTokens(
  actionsTurn: IActionsTurn,
  currentTurn: number,
  listTokens: IListTokens[],
  players: IPlayer[],
  totalTokens: TShowTotalTokens,
): Promise<{ actionsTurn: IActionsTurn; listTokens: IListTokens[]; nextTurn: number }> {
  let nextTurn: number = currentTurn;
  let newListTokens: IListTokens[] = listTokens;
  let copyActionsTurn: IActionsTurn = JSON.parse(JSON.stringify(actionsTurn));
  const diceValue: TDiceValues = JSON.parse(JSON.stringify(copyActionsTurn.diceValue));
  copyActionsTurn.diceList.push({ key: Math.random(), value: diceValue });

  const newTotalDicesAvailable = copyActionsTurn.diceList.length;
  const isThreeRolls = validateThreeConsecutiveRolls(copyActionsTurn.diceList);

  if (isThreeRolls) {
    const nextTurnValidated = await validateNextTurn(currentTurn, players, actionsTurn, true, true);
    copyActionsTurn = nextTurnValidated.actionsTurn;
    nextTurn = nextTurnValidated.nextTurn;
  } else {
    const { JAIL, NORMAL } = getTokensValueByCellType(listTokens[currentTurn]);
    const totalTokensNormalJailCells = JAIL.length + NORMAL.length;

    if (
      diceValue === DICE_VALUE_GET_OUT_JAIL &&
      newTotalDicesAvailable < MAXIMUM_DICE_PER_TURN &&
      totalTokensNormalJailCells > 0
    ) {
      copyActionsTurn.timerActivated = true;
      copyActionsTurn.disabledDice = validateDisabledDice(currentTurn, players);
      copyActionsTurn.actionsBoardGame = EActionsBoardGame.ROLL_DICE;
    } else {
      const { canMoveTokens, copyListTokens } = validateDiceForTokenMovement(
        currentTurn,
        listTokens,
        copyActionsTurn.diceList,
      );

      if (canMoveTokens) {
        copyActionsTurn.timerActivated = true;
        copyActionsTurn.disabledDice = true;
        copyActionsTurn.showDice = false;
        copyActionsTurn.actionsBoardGame = EActionsBoardGame.SELECT_TOKEN;

        newListTokens = copyListTokens;
      }
    }
  }

  return {
    actionsTurn: copyActionsTurn,
    listTokens: newListTokens,
    nextTurn,
  };
}
