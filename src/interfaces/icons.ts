import type { ICONS_DATA } from '@/constants/icons';

// TODO: Remove
export interface IconProps {
  fill?: string;
  strokeWidth?: number;
}

export type TypeIcon = keyof typeof ICONS_DATA;
