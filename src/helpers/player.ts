import { ESufixColors } from '@/constants/board';
import type { TBoardColors, TSufixColors } from '@/interfaces/board';
import type { TTotalPlayers } from '@/interfaces/game';
import type { IPlayer, IUser } from '@/interfaces/user';
import { cloneDeep } from '@/helpers/clone';
import { getValueFromCache, isNumber } from '@/helpers/storage';
import { PREFIX_RANKING } from '@/constants/game';
import type { TPlayerRankingPosition } from '@/interfaces/profile';
import { TOTAL_PLAYERS_CACHE } from '@/constants/storage';

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
