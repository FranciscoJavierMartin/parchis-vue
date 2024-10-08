import { DICE_VALUE_GET_OUT_JAIL, MAXIMUM_DICE_PER_TURN } from '@game/constants/game.constants';
import { EActionsBoardGame, ENextStepGame } from '@game/interfaces/game.enum';
import type {
  ICoordinate,
  TBoardColors,
  TColors,
  TPositionGame,
  TtypeTile,
} from '@board/interfaces/board.interface';
import type { IActionsTurn, IGameOver, TTotalPlayers } from '@game/interfaces/game.interface';
import type {
  IActionsMoveToken,
  IListTokens,
  IToken,
  TShowTotalTokens,
  TTokenByPositionType,
} from '@tokens/interfaces/token.interface';
import type { IPlayer } from '@players/interfaces/user.interface';
import { getPlayersColors } from '@players/helpers/player.helper';
import {
  POSITION_ELEMENTS_BOARD,
  POSITION_TILES,
  SAFE_AREAS,
  TOTAL_EXIT_TILES,
  TOTAL_TILES,
} from '@board/helpers/positions-board.helper';
import type { IDiceList, TDiceValues } from '@dice/interfaces/dice.interface';
import { delay } from '@common/helpers/debounce.helper';
import { cloneDeep } from '@common/helpers/clone.helper';
import type { TPlayerRankingPosition } from '@profiles/interfaces/profile.interface';
import type { IENextStepGame } from '@online/interfaces/online.interface';
import { getRandomNumber } from '@common/helpers/random.helper';
import type { TPlaySoundFunction } from '@sounds/interfaces/sounds.interface';
import { EPositionGame, EtypeTile, type ESufixColors } from '@board/interfaces/board.enum';
import { ESounds } from '@sounds/interfaces/sounds.enum';
import { MAXIMUM_VISIBLE_TOKENS_PER_CELL } from '@board/constants/board.constants';

/**
 * Check if player can roll dice
 * @param indexTurn Current player
 * @param players Players info
 * @returns true if player can roll dice, otherwise false
 */
function validateDisabledDice(indexTurn: number, players: IPlayer[]): boolean {
  const { isOnline, isBot } = players[indexTurn];
  return !!((isBot || isOnline) && !(isOnline && indexTurn === 0));
}

/**
 * Get initial action turn info
 * @param indexTurn Player to get data
 * @param players Players info
 * @returns Action turn info
 */
export function getInitialActionsTurnValue(indexTurn: number, players: IPlayer[]): IActionsTurn {
  return {
    timerActivated: true,
    disabledDice: validateDisabledDice(indexTurn, players),
    showDice: true,
    diceValue: 0,
    diceList: [],
    diceRollNumber: 0,
    isDisabledUI: false,
    actionsBoardGame: EActionsBoardGame.ROLL_DICE,
  };
}

/**
 * Get initial position tokens.
 * If you replace the normal returned value, you can use a value to start from a state.
 * @param boardColor Board orientation
 * @param totalPlayers Number of players
 * @param players Players info
 * @returns Tokens at game start
 */
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

/**
 * Get tokens in jail
 * @param positionGame Position in board
 * @param color Player color
 * @param canSelectToken Is automatic movement
 * @returns Tokens in jail
 */
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

/**
 * Get coordinates by tile type
 * @param tileType Tile type
 * @param positionGame Player position in board
 * @param index Token index
 * @returns Coordinate
 */
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

/**
 * Check if three consecutives dices rolled
 * @param diceList Dice list
 * @returns true if there is three rolls, false otherwise
 */
function validateThreeConsecutiveRolls(diceList: IDiceList[]): boolean {
  let isConsecutiveDice: boolean = false;

  if (diceList.length === MAXIMUM_DICE_PER_TURN) {
    const firstDice: TDiceValues = diceList[0].value;
    isConsecutiveDice = diceList.every((v) => v.value === firstDice);
  }

  return isConsecutiveDice;
}

/**
 * Finish turn actions
 * @param currentTurn Who has the current turn
 * @param players Players info
 * @param actionsTurn Action turn info
 * @param addLastDice Add last dice
 * @param addDelayNextTurn Delay next turn
 * @returns new action turn info and next player turn
 */
async function validateNextTurn(
  currentTurn: number,
  players: IPlayer[],
  actionsTurn: IActionsTurn,
  addLastDice: boolean = false,
  addDelayNextTurn: boolean = false,
): Promise<{ actionsTurn: IActionsTurn; nextTurn: number }> {
  let newActionTurn: IActionsTurn = cloneDeep(actionsTurn);
  let nextTurn: number = currentTurn;

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

/**
 * Get tokens value by cell type
 * @param listTokens Tokens
 * @returns Tokens by position type
 */
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

/**
 * Get unique position token cell
 * @param tokens Tokens
 * @returns position and token
 */
function getUniquePositionTokenCell(tokens: IToken[]): Record<number, number> {
  return tokens.reduce<Record<number, number>>((positionAndToken, { positionTile, index }) => {
    if (!((positionAndToken[positionTile] ?? -1) >= 0)) {
      positionAndToken[positionTile] = index;
    }

    return positionAndToken;
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
        acc.total += newTotal;
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
  let newPositionTile: number = positionTile;

  for (let i = 0; i < diceValue; i++) {
    if (newPositionTile !== exitTileIndex) {
      newPositionTile = validateIncrementTokenMovement(newPositionTile);
      if (i === diceValue - 1) {
        const totalTokensInCell = getTotalTokensInNormalCell(newPositionTile, listTokens);

        if (totalTokensInCell.total >= 2 && !isSafeArea(newPositionTile)) {
          const tokensSameTurn = totalTokensInCell.distribution[currentTurn] ?? [];
          if (tokensSameTurn.length === 0) {
            isValid = false;
          }
        }
      }
    } else {
      const remainingCells = diceValue - i;

      if (remainingCells <= 0 || remainingCells > TOTAL_EXIT_TILES) {
        isValid = false;
      }

      break;
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
      const positionAndToken: Record<number, number> = getUniquePositionTokenCell(tokensEvaluate);

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
                const remainingCells: number = TOTAL_EXIT_TILES - positionTile - 1;
                isValid = dice.value <= remainingCells;
              }

              diceEvaluated.push({ diceValue: dice.value, isValid });
            }

            if (isValid) {
              diceAvailable.push(dice);
            }
          });

          if (diceAvailable.length) {
            let finalDiceAvailable: IDiceList[] = diceAvailable;

            if (finalDiceAvailable.length >= 2) {
              // TODO: Refactor to extract common logic
              const firstDice: IDiceList = finalDiceAvailable[0];
              const isSameDice: boolean = finalDiceAvailable.every(
                (v) => v.value === firstDice.value,
              );

              if (isSameDice) {
                finalDiceAvailable = [firstDice];
              }
            }

            const indexToken: number = positionAndToken[positionTile];
            copyListTokens[currentTurn].tokens[indexToken].diceAvailable = finalDiceAvailable;
          }
        });
    }
  });

  const totalTokensCanMove: IToken[] = copyListTokens[currentTurn].tokens.filter(
    (v) => v.diceAvailable.length,
  );

  let moveAutomatically: boolean = false;
  let tokenIndex: number = 0;
  let diceIndex: number = 0;

  const canMoveTokens: boolean = totalTokensCanMove.length !== 0;

  if (totalTokensCanMove.length === 1) {
    const token = totalTokensCanMove[0];
    const diceAvailable: IDiceList[] = token.diceAvailable;
    tokenIndex = token.index;

    if (diceAvailable.length === 1) {
      moveAutomatically = true;
      diceIndex = getDiceIndexSelected(diceList, diceAvailable[0].key);
    }

    if (diceAvailable.length >= 2) {
      copyListTokens[currentTurn].tokens[tokenIndex].enableTooltip = true;
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
  playSound: TPlaySoundFunction,
): Promise<{
  actionsTurn: IActionsTurn;
  listTokens: IListTokens[];
  nextTurn: number;
  actionsMoveToken?: IActionsMoveToken;
  totalTokens: TShowTotalTokens;
}> {
  let nextTurn: number = currentTurn;
  let newListTokens: IListTokens[] = listTokens;
  let copyActionsTurn: IActionsTurn = JSON.parse(JSON.stringify(actionsTurn));
  const diceValue: TDiceValues = JSON.parse(JSON.stringify(copyActionsTurn.diceValue));
  copyActionsTurn.diceList.push({ key: Math.random(), value: diceValue });
  let newActionsMoveToken: IActionsMoveToken | undefined = undefined;
  let copyTotalTokens: TShowTotalTokens = cloneDeep(totalTokens);

  const newTotalDicesAvailable = copyActionsTurn.diceList.length;
  const isThreeRolls = validateThreeConsecutiveRolls(copyActionsTurn.diceList);

  if (diceValue === DICE_VALUE_GET_OUT_JAIL) {
    playSound(ESounds.GET_SIX);
  }

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
        const validatedTokenSelected = validateSelectedToken(
          copyActionsTurn,
          copyListTokens,
          currentTurn,
          diceIndex,
          tokenIndex,
          totalTokens,
        );
        copyActionsTurn = validatedTokenSelected.actionsTurn;
        newListTokens = validatedTokenSelected.listTokens;
        newActionsMoveToken = validatedTokenSelected.actionsMoveToken;
        copyTotalTokens = validatedTokenSelected.totalTokens;
      } else if (canMoveTokens) {
        copyActionsTurn.timerActivated = true;
        copyActionsTurn.disabledDice = true;
        copyActionsTurn.showDice = false;
        copyActionsTurn.actionsBoardGame = EActionsBoardGame.SELECT_TOKEN;

        newListTokens = copyListTokens;
      } else {
        const nextTurnValidated = await validateNextTurn(
          currentTurn,
          players,
          actionsTurn,
          false,
          true,
        );
        copyActionsTurn = nextTurnValidated.actionsTurn;
        nextTurn = nextTurnValidated.nextTurn;
      }
    }
  }

  return {
    actionsTurn: copyActionsTurn,
    listTokens: newListTokens,
    actionsMoveToken: newActionsMoveToken,
    totalTokens: copyTotalTokens,
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
  listTokens: IListTokens[];
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
    listTokens: copyListTokens,
    actionsMoveToken: {
      isRunning: true,
      tokenIndex,
      totalCellsMove,
      cellsCounter: 0,
    },
  };
}

function validatePlayerRankingGameOver(
  players: IPlayer[],
  ranking: TPlayerRankingPosition,
  playSound: TPlaySoundFunction,
): { players: IPlayer[]; gameOverState: IGameOver } {
  const copyPlayers: IPlayer[] = cloneDeep(players);

  const onlinePlayersNotFinished = copyPlayers.filter(
    (player: IPlayer) => !player.isOffline && !player.finished,
  );
  const offlinePlayers = copyPlayers.filter(
    (player: IPlayer) => player.isOffline && !player.finished,
  );

  const playersLeftRanking = [...onlinePlayersNotFinished, ...offlinePlayers];

  playSound(ESounds.GAMER_OVER);

  playersLeftRanking.forEach((player: IPlayer) => {
    ranking++;
    copyPlayers[player.index].finished = true;
    copyPlayers[player.index].ranking = ranking as TPlayerRankingPosition;
  });

  return {
    players: copyPlayers,
    gameOverState: {
      showModal: true,
      gameOver: true,
    },
  };
}

export async function getNextStepGame(
  type: IENextStepGame,
  actionsTurn: IActionsTurn,
  currentTurn: number,
  players: IPlayer[],
): Promise<{ actionsTurn: IActionsTurn; currentTurn: number }> {
  let copyActionsTurn: IActionsTurn = cloneDeep(actionsTurn);
  let copyCurrentTurn: number = currentTurn;
  const rollDiceAgain: boolean = type === ENextStepGame.ROLL_DICE_AGAIN;
  const moveTokensAgain: boolean = type === ENextStepGame.MOVE_TOKENS_AGAIN;
  const goNextTurn: boolean = type === ENextStepGame.NEXT_TURN;

  if (rollDiceAgain || moveTokensAgain) {
    copyActionsTurn.disabledDice = rollDiceAgain
      ? validateDisabledDice(copyCurrentTurn, players)
      : true;
    copyActionsTurn.showDice = rollDiceAgain;
    copyActionsTurn.timerActivated = true;
    copyActionsTurn.isDisabledUI = false;
    copyActionsTurn.actionsBoardGame =
      EActionsBoardGame[rollDiceAgain ? 'ROLL_DICE' : 'SELECT_TOKEN'];
  } else {
    if (goNextTurn) {
      const validatedNextTurn = await validateNextTurn(copyCurrentTurn, players, copyActionsTurn);
      copyActionsTurn = validatedNextTurn.actionsTurn;
      copyCurrentTurn = validatedNextTurn.nextTurn;
    }
  }

  return {
    actionsTurn: copyActionsTurn,
    currentTurn: copyCurrentTurn,
  };
}

export async function validateMovementToken(
  actionsMoveToken: IActionsMoveToken,
  actionsTurn: IActionsTurn,
  currentTurn: number,
  listTokens: IListTokens[],
  players: IPlayer[],
  totalTokens: TShowTotalTokens,
  playSound: TPlaySoundFunction,
): Promise<{
  actionsTurn: IActionsTurn;
  actionsMoveToken: IActionsMoveToken;
  listTokens: IListTokens[];
  totalTokens: TShowTotalTokens;
  players: IPlayer[];
  currentTurn: number;
  gameOverState?: IGameOver;
}> {
  let copyActionsMoveToken: IActionsMoveToken = cloneDeep(actionsMoveToken);
  let copyActionsTurn: IActionsTurn = cloneDeep(actionsTurn);
  let copyListTokens: IListTokens[] = cloneDeep(listTokens);
  let copyTotalTokens: TShowTotalTokens = cloneDeep(totalTokens);
  let copyPlayers: IPlayer[] = cloneDeep(players);
  let gameOverState: IGameOver | undefined = undefined;
  let typeNextStep: ENextStepGame | null = null;

  let copyCurrentTurn: number = currentTurn;
  const { positionGame } = copyListTokens[copyCurrentTurn];
  const { startTileIndex, exitTileIndex } = POSITION_ELEMENTS_BOARD[positionGame];
  const { tokenIndex } = copyActionsMoveToken;
  const tokenToBeMoved: IToken = copyListTokens[copyCurrentTurn].tokens[tokenIndex];
  let positionTile: number = 0;
  let goNextTurn: boolean = false;
  let isGameOver: boolean = false;

  playSound(ESounds.TOKEN_MOVE);

  if (tokenToBeMoved.typeTile === EtypeTile.EXIT) {
    positionTile = tokenToBeMoved.positionTile + 1;

    if (positionTile === TOTAL_EXIT_TILES - 1) {
      positionTile = tokenToBeMoved.index;
      copyListTokens[copyCurrentTurn].tokens[tokenIndex].typeTile = EtypeTile.END;
    }
  }

  if (tokenToBeMoved.typeTile === EtypeTile.NORMAL) {
    if (tokenToBeMoved.positionTile !== exitTileIndex) {
      positionTile = validateIncrementTokenMovement(tokenToBeMoved.positionTile);
    } else {
      positionTile = 0;
      copyListTokens[copyCurrentTurn].tokens[tokenIndex].typeTile = EtypeTile.EXIT;
    }
  }

  if (tokenToBeMoved.typeTile === EtypeTile.JAIL) {
    positionTile = startTileIndex;
    copyListTokens[copyCurrentTurn].tokens[tokenIndex].animated = true;
    copyListTokens[copyCurrentTurn].tokens[tokenIndex].typeTile = EtypeTile.NORMAL;
  }

  copyListTokens[copyCurrentTurn].tokens[tokenIndex].positionTile = positionTile;
  copyListTokens[copyCurrentTurn].tokens[tokenIndex].coordinate = getCoordinatesByTileType(
    copyListTokens[copyCurrentTurn].tokens[tokenIndex].typeTile,
    positionGame,
    positionTile,
  );

  copyActionsMoveToken.cellsCounter++;

  if (copyActionsMoveToken.cellsCounter === copyActionsMoveToken.totalCellsMove) {
    let rollDiceAgain: boolean = false;
    let moveTokensAgain: boolean = false;

    copyActionsMoveToken.isRunning = false;
    copyListTokens[copyCurrentTurn].tokens[tokenIndex].isMoving = false;

    const { END } = getTokensValueByCellType(copyListTokens[copyCurrentTurn]);

    if (tokenToBeMoved.typeTile === EtypeTile.END) {
      END.forEach((tokenEnd: IToken) => {
        const tokenIndexEndPosition = tokenEnd.index;
        copyListTokens[copyCurrentTurn].tokens[tokenIndexEndPosition].positionTile =
          tokenIndexEndPosition;
        copyListTokens[copyCurrentTurn].tokens[tokenIndexEndPosition].coordinate =
          getCoordinatesByTileType(EtypeTile.END, positionGame, tokenIndexEndPosition);
      });

      const finished = END.length === 4;
      rollDiceAgain = !finished;

      if (finished) {
        const totalPlayers = copyPlayers.filter((v) => !v.isOffline || v.finished).length;
        const totalPlayersEnd = copyPlayers.filter((v) => v.finished).length;

        const ranking: TPlayerRankingPosition = (totalPlayersEnd + 1) as TPlayerRankingPosition;
        isGameOver = ranking === totalPlayers - 1;

        copyPlayers[copyCurrentTurn].finished = true;
        copyPlayers[copyCurrentTurn].ranking = ranking;

        if (isGameOver) {
          const validatedGameOver = validatePlayerRankingGameOver(copyPlayers, ranking, playSound);
          copyPlayers = validatedGameOver.players;
          gameOverState = validatedGameOver.gameOverState;
        }
      }
    }

    if ([EtypeTile.NORMAL, EtypeTile.EXIT].includes(tokenToBeMoved.typeTile as EtypeTile)) {
      let distributeTokensCell: boolean = tokenToBeMoved.typeTile === EtypeTile.EXIT;

      if (tokenToBeMoved.typeTile === EtypeTile.NORMAL) {
        const isSafeTile = isSafeArea(positionTile);
        const totalTokensInCell = getTotalTokensInNormalCell(positionTile, copyListTokens);

        if (totalTokensInCell.total >= 2) {
          const isSameToken: boolean =
            (totalTokensInCell.distribution[copyCurrentTurn] ?? []).length ===
            totalTokensInCell.total;
          distributeTokensCell = isSameToken || isSafeTile;

          if (!distributeTokensCell) {
            const playerIndexToJail = Object.keys(totalTokensInCell.distribution)
              .map((v) => +v)
              .find((v) => v !== copyCurrentTurn);

            if (playerIndexToJail !== undefined) {
              const tokenIndexToJail = totalTokensInCell.distribution[playerIndexToJail][0];
              const { positionGame: positionGameToJail } = copyListTokens[playerIndexToJail];
              copyListTokens[playerIndexToJail].tokens[tokenIndexToJail].animated = true;
              copyListTokens[playerIndexToJail].tokens[tokenIndexToJail].typeTile = EtypeTile.JAIL;
              copyListTokens[playerIndexToJail].tokens[tokenIndexToJail].positionTile =
                tokenIndexToJail;
              copyListTokens[playerIndexToJail].tokens[tokenIndexToJail].coordinate =
                getCoordinatesByTileType(EtypeTile.JAIL, positionGameToJail, tokenIndexToJail);

              rollDiceAgain = true;
            }
          }
        }
      }

      if (distributeTokensCell) {
        const t = validateTokenDistributionCell(
          tokenToBeMoved,
          copyListTokens,
          copyCurrentTurn,
          copyTotalTokens,
          false,
        );

        copyTotalTokens = t.totalTokens;
        copyListTokens = t.listTokens;
      }
    }

    goNextTurn = copyActionsTurn.diceList.length === 0;

    if (copyActionsTurn.diceList.length && !rollDiceAgain) {
      const {
        canMoveTokens,
        copyListTokens: newListTokens,
        moveAutomatically,
        tokenIndex,
        diceIndex,
      } = validateDiceForTokenMovement(copyCurrentTurn, copyListTokens, copyActionsTurn.diceList);

      if (moveAutomatically) {
        const validatedTokenSelected = validateSelectedToken(
          copyActionsTurn,
          copyListTokens,
          copyCurrentTurn,
          diceIndex,
          tokenIndex,
          copyTotalTokens,
        );

        copyActionsTurn = validatedTokenSelected.actionsTurn;
        copyActionsMoveToken = validatedTokenSelected.actionsMoveToken;
        copyListTokens = validatedTokenSelected.listTokens;
        copyTotalTokens = validatedTokenSelected.totalTokens;
      } else {
        goNextTurn = !canMoveTokens;

        if (canMoveTokens) {
          copyListTokens = newListTokens;
          moveTokensAgain = true;
        }
      }
    }

    typeNextStep = rollDiceAgain
      ? ENextStepGame.ROLL_DICE_AGAIN
      : moveTokensAgain
        ? ENextStepGame.MOVE_TOKENS_AGAIN
        : goNextTurn
          ? ENextStepGame.NEXT_TURN
          : null;

    if (!isGameOver && typeNextStep) {
      const nextStepGame = await getNextStepGame(
        typeNextStep,
        copyActionsTurn,
        copyCurrentTurn,
        copyPlayers,
      );
      copyActionsTurn = nextStepGame.actionsTurn;
      copyCurrentTurn = nextStepGame.currentTurn;
    }
  }

  return {
    actionsTurn: copyActionsTurn,
    actionsMoveToken: copyActionsMoveToken,
    listTokens: copyListTokens,
    totalTokens: copyTotalTokens,
    players: copyPlayers,
    currentTurn: copyCurrentTurn,
    gameOverState,
  };
}

// TODO: Implement some king of strategy
export function validateSelectTokenRandomly(
  listTokens: IListTokens[],
  diceList: IDiceList[],
  currentTurn: number,
): {
  diceIndex: number;
  tokenIndex: number;
} {
  const tokensCanBeMoved: IToken[] = listTokens[currentTurn].tokens.filter(
    (token: IToken) => token.diceAvailable.length,
  );
  const randomIndexToken: number = getRandomNumber(0, tokensCanBeMoved.length - 1);
  const token: IToken = tokensCanBeMoved[randomIndexToken];
  const tokenIndex: number = token.index;
  const diceAvailable: IDiceList[] = token.diceAvailable;
  const diceIndexInTokenSelected: number = getRandomNumber(0, diceAvailable.length - 1);
  const diceIndex: number = getDiceIndexSelected(
    diceList,
    diceAvailable[diceIndexInTokenSelected].key,
  );

  return { diceIndex, tokenIndex };
}
