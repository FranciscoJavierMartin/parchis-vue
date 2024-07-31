import type { IEOptionsGame, IESounds } from '@online/interfaces/online';

/**
 * Game options
 */
export type TOptionsGame = Record<IEOptionsGame, boolean>;
export type TPlaySoundFunction = (type: IESounds) => void;
