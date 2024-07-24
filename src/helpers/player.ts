import { EBoardColors, ESufixColors } from '@/constants/board';
import type { TBoardColors, TColors, TSufixColors } from '@/interfaces/board';
import type { TTotalPlayers } from '@/interfaces/game';
import type { IPlayer, IUser } from '@/interfaces/user';
import { cloneDeep } from '@/helpers/clone';
import { getValueFromCache, isNumber } from '@/helpers/storage';
import { PREFIX_RANKING } from '@/constants/game';
import type { TPlayerRankingPosition } from '@/interfaces/profile';
import { BOARD_COLORS, PLAYERS_INFO, TOTAL_PLAYERS_CACHE } from '@/constants/storage';
import type { IPlayerOffline } from '@/interfaces/player';
import { guid } from '@/helpers/random';

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
    isBot: true,
  },
  {
    id: '4',
    name: 'Player 04',
    isBot: true,
  },
];

export function getPlayersColors(
  boardColor: TBoardColors,
  totalPlayers: TTotalPlayers,
): ESufixColors[] {
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
    ranking: 1,
  }));

  return players;
}

export function getOrganizedRanking(players: IPlayer[]): { first: IPlayer; others: IPlayer[] } {
  const [first, ...others] = cloneDeep(players).sort((a, b) => a.ranking - b.ranking);
  return { first, others };
}

export function getLabelRanking(ranking: TPlayerRankingPosition = 1): string {
  return `${ranking}${PREFIX_RANKING[ranking - 1]}`;
}

export function getInitialTotalPlayers(): TTotalPlayers {
  const dataFromCache: TTotalPlayers = getValueFromCache<TTotalPlayers>(TOTAL_PLAYERS_CACHE, 2);
  const totalPlayers: TTotalPlayers =
    isNumber(dataFromCache) && dataFromCache >= 2 && dataFromCache <= 4 ? dataFromCache : 2;

  return totalPlayers;
}

export function getInitialDataOfflinePlayers(totalPlayers: TTotalPlayers): IPlayerOffline[] {
  const dataFromCache: IPlayerOffline[] = getValueFromCache<IPlayerOffline[]>(PLAYERS_INFO, []);

  const boardColors: string[] = getInitialBoardColors().split('');
  const firstColor = ESufixColors[boardColors[0] as TSufixColors] as TColors;

  const { colors } = getColorsByTotalPlayers(firstColor, totalPlayers, 0);

  const initialDataPlayers: IPlayerOffline[] = boardColors.map((_value: string, index: number) => {
    const numPlayer: number = index + 1;
    const disabled: boolean = !(numPlayer <= totalPlayers);

    const color: TColors =
      colors[index] || (ESufixColors[boardColors[index] as TSufixColors] as TColors);
    const id = dataFromCache[index]?.id || guid();
    const name = dataFromCache[index]?.name || `Player 0${numPlayer}`;
    const isBot = dataFromCache[index]?.isBot ?? false;

    return {
      color,
      disabled,
      id,
      index,
      isBot,
      name,
    };
  });

  return initialDataPlayers;
}

function getInitialBoardColors(): EBoardColors {
  const dataFromCache: EBoardColors = getValueFromCache(BOARD_COLORS, EBoardColors.RGYB);
  const boardColors = Object.keys(EBoardColors).includes(dataFromCache)
    ? dataFromCache
    : EBoardColors.RGYB;

  return boardColors;
}

function getColorsByTotalPlayers(
  color: TColors,
  totalPlayers: TTotalPlayers,
  index: number,
): { boardColor: string | undefined; colors: TColors[] } {
  const colors: { boardColor: string | undefined; colors: TColors[] } = {
    boardColor: '',
    colors: [],
  };
  const colorSuffix = color.substring(0, 1);

  if (totalPlayers === 2) {
    const indexSearch: number = index === 0 ? 0 : 2;
    colors.boardColor = getBoardColorType(indexSearch, colorSuffix);
    const splitColor: string[] = colors.boardColor?.split('') || [];
    const sufixFirstColor: TSufixColors = (
      index === 0 ? splitColor[0] : splitColor[2]
    ) as TSufixColors;
    const sufixSecondColor: TSufixColors = (
      index === 0 ? splitColor[2] : splitColor[0]
    ) as TSufixColors;

    const firstColor: TColors = ESufixColors[sufixFirstColor] as TColors;
    const secondColor: TColors = ESufixColors[sufixSecondColor] as TColors;

    const oppositeIndex: number = index === 0 ? 1 : 0;
    colors.colors[index] = color === firstColor ? firstColor : secondColor;
    colors.colors[oppositeIndex] = color === secondColor ? secondColor : firstColor;
  } else {
    colors.boardColor = getBoardColorType(index, colorSuffix);
    const splitColor: string[] = colors.boardColor?.split('') || [];

    colors.colors = splitColor
      .filter((_value: string, index: number) => index < totalPlayers)
      .map((value: string) => ESufixColors[value as TSufixColors] as TColors);
  }

  return colors;
}

function getBoardColorType(index: number, colorSuffix: string): string | undefined {
  return Object.keys(EBoardColors).find((color) => color.split('')[index] === colorSuffix);
}
