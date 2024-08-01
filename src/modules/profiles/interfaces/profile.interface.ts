import type { IActionsTurn, TTotalPlayers } from '@/modules/game/interfaces/game.interface';
import type { IPlayer } from '@/modules/players/interfaces/user.interface';
import type { EPositionProfile, EPositionProfiles } from '@board/interfaces/board.enum';

export type TPlayerRankingPosition = 1 | 2 | 3 | 4;
export type TPositionProfiles = keyof typeof EPositionProfiles;
export type TPositionProfile = keyof typeof EPositionProfile;

export interface IProfilesData {
  basePosition: TPositionProfiles;
  currentTurn: number;
  players: IPlayer[];
  totalPlayers: TTotalPlayers;
  actionsTurn: IActionsTurn;
}
