import type { IEOptionsGame, IESounds } from '@/modules/online/interfaces/online.interface';

/**
 * Game options
 */
export type TOptionsGame = Record<IEOptionsGame, boolean>;
export type TPlaySoundFunction = (type: IESounds) => void;
