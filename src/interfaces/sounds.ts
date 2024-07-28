import type { IEOptionsGame, IESounds } from '@/interfaces/online';

/**
 * Game options
 */
export type TOptionsGame = Record<IEOptionsGame, boolean>;
export type TPlaySoundFunction = (type: IESounds) => void;
