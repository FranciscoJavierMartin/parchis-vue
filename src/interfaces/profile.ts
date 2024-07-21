import type { EPositionProfile, EPositionProfiles } from '@/constants/board';

export type TPlayerRankingPosition = 1 | 2 | 3 | 4;
export type TPositionProfiles = keyof typeof EPositionProfiles;
export type TPositionProfile = keyof typeof EPositionProfile;

export type THandleMuteChat = (playerIndex: number) => void;

export interface IProfileHandlers {
  handleMuteChat: THandleMuteChat;
}
