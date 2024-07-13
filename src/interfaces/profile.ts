import type { EPositionProfile, EPositionProfiles } from '@/constants/board';
import type { TDiceValues } from '@/interfaces/dice';

export type TPlayerRankingPosition = 1 | 2 | 3 | 4;
export type TPositionProfiles = keyof typeof EPositionProfiles;
export type TPositionProfile = keyof typeof EPositionProfile;

/**
 * Profile component handlers types
 */
export type THandleTimer = (ends: boolean, playerIndex?: number) => void;
export type THandleSelectDice = (diceValue?: TDiceValues, isActionSocket?: boolean) => void;
export type THandleMuteChat = (playerIndex: number) => void;
export type THandleDoneDice = (isActionSocket?: boolean) => void;

export interface IProfileHandlers {
  handleTimer: THandleTimer;
  handleSelectDice: THandleSelectDice;
  handleDoneDice: THandleDoneDice;
  handleMuteChat: THandleMuteChat;
}