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
  IActionsMoveToken,
  IListTokens,
  ISelectTokenValues,
  IToken,
  TShowTotalTokens,
  TTokenByPositionType,
} from '@/interfaces/token';
import type { IPlayer } from '@/interfaces/user';
import { getPlayersColors } from '@/helpers/player';
import {
  EPositionGame,
  EtypeTile,
  MAXIMUM_VISIBLE_TOKENS_PER_CELL,
  type ESufixColors,
} from '@/constants/board';
import {
  POSITION_ELEMENTS_BOARD,
  POSITION_TILES,
  SAFE_AREAS,
  TOTAL_EXIT_TILES,
  TOTAL_TILES,
} from '@/helpers/positions-board';
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

function validateIncrementTokenMovement(positionTile: number): number {
  return positionTile + 1 >= TOTAL_TILES ? 0 : positionTile + 1;
}

function getTotalTokensInNormalCell(
  positionTile: number,
  listTokens: IListTokens[],
): {
  total: number;
  distribution: Record<number, number[]>;
} {
  return listTokens.reduce<{
    total: number;
    distribution: Record<number, number[]>;
  }>(
    (acc, { tokens }, index: number) => {
      const tokensInNormalCell = tokens.filter((t) => t.typeTile === EtypeTile.NORMAL);
      const { total: newTotal, tokensByPosition } = getTotalTokensInCell(
        positionTile,
        tokensInNormalCell,
      );

      if (newTotal) {
        acc.total++;
        acc.distribution[index] = tokensByPosition;
      }

      return acc;
    },
    { total: 0, distribution: {} },
  );
}

function getTotalTokensInCell(
  positionTile: number,
  tokens: IToken[],
): {
  total: number;
  tokensByPosition: number[];
} {
  const tokensByPosition = tokens
    .filter((v) => v.positionTile === positionTile)
    .map((v) => v.index);
  const total = tokensByPosition.length;

  return { total, tokensByPosition };
}

function isSafeArea(positionTile: number): boolean {
  return SAFE_AREAS.includes(positionTile);
}

function validateMovementTokenWithValueDice(
  currentTurn: number,
  diceValue: TDiceValues,
  listTokens: IListTokens[],
  positionGame: TPositionGame,
  positionTile: number,
): boolean {
  const { exitTileIndex } = POSITION_ELEMENTS_BOARD[positionGame];
  let isValid: boolean = true;
  let newPositionTile = positionTile;

  for (let i = 0; i < diceValue; i++) {
    if (newPositionTile !== exitTileIndex) {
      newPositionTile = validateIncrementTokenMovement(newPositionTile);
      if (i === diceValue - 1) {
        const totalTokensInCell = getTotalTokensInNormalCell(newPositionTile, listTokens);

        if (totalTokensInCell.total >= 2 && !isSafeArea(newPositionTile)) {
          const tokensSameTurn = totalTokensInCell.distribution[currentTurn] ?? [];
          if (tokensSameTurn.length) {
            isValid = false;
          }
        }
      }
    } else {
      const remainingCells = diceValue - i;

      if (remainingCells <= 0 || remainingCells > TOTAL_EXIT_TILES) {
        isValid = false;
      }
    }
  }
  return isValid;
}

function getDiceIndexSelected(diceList: IDiceList[], diceKey: number): number {
  return diceList.findIndex((v) => v.key === diceKey);
}

function validateDiceForTokenMovement(
  currentTurn: number,
  listTokens: IListTokens[],
  diceList: IDiceList[],
): {
  canMoveTokens: boolean;
  copyListTokens: IListTokens[];
  moveAutomatically: boolean;
  tokenIndex: number;
  diceIndex: number;
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

  [NORMAL, EXIT].forEach((tokensEvaluate, evaluatedIndex) => {
    if (tokensEvaluate.length) {
      const positionAndToken = getUniquePositionTokenCell(tokensEvaluate);

      Object.keys(positionAndToken)
        .map((positionTile) => +positionTile)
        .forEach((positionTile) => {
          const diceEvaluated: { diceValue: TDiceValues; isValid: boolean }[] = [];

          const diceAvailable: IDiceList[] = [];

          diceList.forEach((dice) => {
            const evaluated = diceEvaluated.find((v) => v.diceValue === dice.value);
            let isValid: boolean = evaluated?.isValid ?? false;

            if (!evaluated) {
              if (evaluatedIndex === 0) {
                isValid = validateMovementTokenWithValueDice(
                  currentTurn,
                  dice.value,
                  listTokens,
                  positionGame,
                  positionTile,
                );
              } else {
                const remainingCells = TOTAL_EXIT_TILES - positionTile - 1;
                isValid = dice.value <= remainingCells;
              }

              diceEvaluated.push({ diceValue: dice.value, isValid });
            }

            if (isValid) {
              diceAvailable.push(dice);
            }

            if (diceAvailable.length) {
              let finalDiceAvailable = diceAvailable;

              if (finalDiceAvailable.length >= 2) {
                // TODO: Refactor to extract common logic
                const firstDice = finalDiceAvailable[0];
                const isSameDice = finalDiceAvailable.every((v) => v.value === firstDice.value);

                if (isSameDice) {
                  finalDiceAvailable = [firstDice];
                }
              }

              const indexToken = positionAndToken[positionTile];
              copyListTokens[currentTurn].tokens[indexToken].diceAvailable = finalDiceAvailable;
            }
          });
        });
    }
  });

  const totalTokensCanMove = copyListTokens[currentTurn].tokens.filter(
    (v) => v.diceAvailable.length,
  );

  let moveAutomatically: boolean = false;
  let tokenIndex: number = 0;
  let diceIndex: number = 0;

  const canMoveTokens: boolean = totalTokensCanMove.length !== 0;

  if (totalTokensCanMove.length === 1) {
    const token = totalTokensCanMove[0];
    const diceAvailable = token.diceAvailable;
    tokenIndex = token.index;

    if (diceAvailable.length === 1) {
      moveAutomatically = true;
      diceIndex = getDiceIndexSelected(diceList, diceAvailable[0].key);
    }

    if (diceAvailable.length >= 2) {
      copyListTokens[currentTurn].tokens[token.index].enableTooltip = true;
    }
  }

  return { canMoveTokens, copyListTokens, moveAutomatically, tokenIndex, diceIndex };
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
      const { canMoveTokens, copyListTokens, moveAutomatically, tokenIndex, diceIndex } =
        validateDiceForTokenMovement(currentTurn, listTokens, copyActionsTurn.diceList);

      if (moveAutomatically) {
        // TODO: Return
      } else if (canMoveTokens) {
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

function validateTokenDistributionCell(
  token: IToken,
  listTokens: IListTokens[],
  currentTurn: number,
  totalTokens: TShowTotalTokens,
  removeTokenFromCell: boolean = true,
): { listTokens: IListTokens[]; totalTokens: TShowTotalTokens } {
  const copyListTokens = cloneDeep(listTokens);
  const copyTotalTokens: TShowTotalTokens = cloneDeep(totalTokens);
  // TODO: Check condition
  const positionTile = token.positionTile || 0;
  const totalTokensToBeRemoved = removeTokenFromCell ? 1 : 0;

  if (token.typeTile === EtypeTile.NORMAL) {
    const totalTokensInCell = getTotalTokensInNormalCell(positionTile, copyListTokens);

    if (totalTokensInCell.total >= 2) {
      const totalTokensRemain = totalTokensInCell.total - totalTokensToBeRemoved;
      let position: number = 1;

      //TODO: REFACTOR
      Object.keys(totalTokensInCell.distribution)
        .map((playerIndex) => +playerIndex)
        .forEach((playerIndex) => {
          totalTokensInCell.distribution[playerIndex].forEach((index) => {
            const evaluatedIndex: boolean = removeTokenFromCell
              ? playerIndex === currentTurn
                ? index !== token.index
                : true
              : true;

            if (evaluatedIndex) {
              copyListTokens[playerIndex].tokens[index].totalTokens = totalTokensRemain;
              copyListTokens[playerIndex].tokens[index].position = position;
              position++;
            }
          });
        });

      if (totalTokensInCell.total > MAXIMUM_VISIBLE_TOKENS_PER_CELL) {
        if (totalTokensRemain > MAXIMUM_VISIBLE_TOKENS_PER_CELL) {
          copyTotalTokens[positionTile] = totalTokensRemain;
        } else if (copyTotalTokens[positionTile]) {
          delete copyTotalTokens[positionTile];
        }
      }
    }
  }

  if (token.typeTile === EtypeTile.EXIT) {
    const { EXIT } = getTokensValueByCellType(copyListTokens[currentTurn]);
    const totalTokensInCell = getTotalTokensInCell(positionTile, EXIT);

    if (totalTokensInCell.total >= 2) {
      const totalTokensRemain = totalTokensInCell.total - totalTokensToBeRemoved;
      let position: number = 1;

      totalTokensInCell.tokensByPosition.forEach((index) => {
        if (index !== token.index || !removeTokenFromCell) {
          copyListTokens[currentTurn].tokens[index].totalTokens = totalTokensRemain;
          copyListTokens[currentTurn].tokens[index].position = position;
          position++;
        }
      });
    }
  }

  return {
    listTokens: copyListTokens,
    totalTokens: copyTotalTokens,
  };
}

export function validateSelectedToken(
  actionsTurn: IActionsTurn,
  listTokens: IListTokens[],
  currentTurn: number,
  diceIndex: number,
  tokenIndex: number,
  totalTokens: TShowTotalTokens,
): {
  actionsTurn: IActionsTurn;
  actionsMoveToken: IActionsMoveToken;
  totalTokens: TShowTotalTokens;
} {
  const copyActionsTurn: IActionsTurn = cloneDeep(actionsTurn);
  let copyTotalTokens: TShowTotalTokens = cloneDeep(totalTokens);
  let totalCellsMove: TDiceValues = copyActionsTurn.diceList[diceIndex].value;
  copyActionsTurn.diceList.splice(diceIndex, 1);
  copyActionsTurn.disabledDice = true;
  copyActionsTurn.showDice = false;
  copyActionsTurn.timerActivated = false;

  let copyListTokens = cloneDeep(listTokens);
  const tokenSelected = copyListTokens[currentTurn].tokens[tokenIndex];

  // TODO: Refactor
  copyListTokens[currentTurn].tokens.forEach((_, index) => {
    if (copyListTokens[currentTurn].tokens[index].diceAvailable.length) {
      copyListTokens[currentTurn].tokens[index].diceAvailable = [];
      copyListTokens[currentTurn].tokens[index].enableTooltip = false;
      copyListTokens[currentTurn].tokens[index].animated = false;
      copyListTokens[currentTurn].tokens[index].isMoving = false;
    }
  });

  copyListTokens[currentTurn].tokens[tokenIndex].isMoving = true;
  copyListTokens[currentTurn].tokens[tokenIndex].totalTokens = 1;
  copyListTokens[currentTurn].tokens[tokenIndex].position = 1;

  if (tokenSelected.typeTile === EtypeTile.JAIL) {
    totalCellsMove = 1;
  }

  if ([EtypeTile.NORMAL, EtypeTile.EXIT].includes(tokenSelected.typeTile as EtypeTile)) {
    const tokensDistributionCell = validateTokenDistributionCell(
      tokenSelected,
      copyListTokens,
      currentTurn,
      totalTokens,
      true,
    );
    copyListTokens = tokensDistributionCell.listTokens;
    copyTotalTokens = tokensDistributionCell.totalTokens;
  }

  return {
    actionsTurn: copyActionsTurn,
    totalTokens: copyTotalTokens,
    actionsMoveToken: {
      isRunning: true,
      tokenIndex,
      totalCellsMove,
      cellsCounter: 0,
    },
  };
}

export function validateMovementToken(
  actionsMoveToken: IActionsMoveToken,
  actionsTurn: IActionsTurn,
  currentTurn: number,
  listTokens: IListTokens[],
  players: IPlayer[],
  totalTokens: TShowTotalTokens,
): { actionsMoveToken: IActionsMoveToken } {
  const copyActionsMoveToken: IActionsMoveToken = cloneDeep(actionsMoveToken);
  const copyListTokens: IListTokens[] = cloneDeep(listTokens);

  const { positionGame } = copyListTokens[currentTurn];
  const { startTileIndex, exitTileIndex } = POSITION_ELEMENTS_BOARD[positionGame];
  const { tokenIndex } = copyActionsMoveToken;
  const tokenMove = copyListTokens[currentTurn].tokens[tokenIndex];
  let positionTile: number = 0;
  let goNextTurn: boolean = false;

  copyActionsMoveToken.cellsCounter++;

  if (copyActionsMoveToken.cellsCounter === copyActionsMoveToken.totalCellsMove) {
    copyActionsMoveToken.isRunning = false;
  }

  console.log('Hello');

  return {
    actionsMoveToken: copyActionsMoveToken,
  };
}
