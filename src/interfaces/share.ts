import type { TypeIcon } from './icons';

export type TButtonShare =
  | {
      icon: 'copy';
      label: 'Copy';
      action: 'copy';
    }
  | {
      icon: TypeIcon;
      label: string;
      action: string;
      url: string;
    };
