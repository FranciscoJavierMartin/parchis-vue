import { getRandomNumber } from './helpers';
import { ESufixColors } from '@/constants/board';
import { EActionsBoardGame } from '@/constants/game';
import type { TBoardColors, TSufixColors } from '@/interfaces/board';
import type { TDiceValues } from '@/interfaces/dice';
import type { IActionsTurn, TTotalPlayers } from '@/interfaces/game';
import type { IPlayer, IUser } from '@/interfaces/user';

// TODO: Remove
export const TEMP_USERS: IUser[] = [
  {
    id: '1',
    name: 'Player 01',
    isBot: false,
  },
  {
    id: '2',
    name: 'Player 02',
    isBot: true,
  },
  {
    id: '3',
    name: 'Player 03',
    isBot: false,
  },
  {
    id: '4',
    name: 'Player 04',
    isBot: false,
  },
];

function getPlayersColors(boardColor: TBoardColors, totalPlayers: TTotalPlayers): ESufixColors[] {
  const playersColors: ESufixColors[] = [];
  const splitColor: string[] = boardColor.split('');
  const colors = splitColor.map((v) => ESufixColors[v as TSufixColors]);

  switch (totalPlayers) {
    case 2:
      playersColors.push(colors[0], colors[2]);
      break;
    case 3:
      playersColors.push(colors[0], colors[1], colors[2]);
      break;
    case 4:
      playersColors.push(...colors);
      break;
  }

  return playersColors;
}

export function getInitialDataPlayers(
  users: IUser[],
  boardColor: TBoardColors,
  totalPlayers: TTotalPlayers,
): IPlayer[] {
  const playersColors = getPlayersColors(boardColor, totalPlayers);

  const players: IPlayer[] = users.map<IPlayer>((user, index) => ({
    ...user,
    index,
    color: playersColors[index],
    finished: false,
    isOffline: false,
    isMuted: false,
    chatMessage: '',
    counterMessage: 0,
    ranking: 0,
  }));

  return players;
}

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

export function randomValueDice(): TDiceValues {
  return getRandomNumber(1, 6) as TDiceValues;
}

export function getRandomValueDice(
  actionsTurn: IActionsTurn,
  diceValue?: TDiceValues,
): IActionsTurn {
  const newActionsTurn = structuredClone(actionsTurn);

  newActionsTurn.diceValue = diceValue || randomValueDice();
  newActionsTurn.timerActivated = false;
  newActionsTurn.disabledDice = true;
  const diceRollNumber = newActionsTurn.diceRollNumber;
  const newDiceRollNumber = diceRollNumber + 1 >= 10 ? 1 : diceRollNumber + 1;
  newActionsTurn.diceRollNumber = newDiceRollNumber;

  return newActionsTurn;
}
