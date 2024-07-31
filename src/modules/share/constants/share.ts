import type { TButtonShare } from '@/modules/share/interfaces/share';

export const SHARE_AVAILABLE: boolean = 'share' in navigator;

export const BUTTONS_SHARE_SOCIAL: TButtonShare[] = [
  {
    icon: 'copy',
    label: 'Copy',
    action: 'copy',
  },
  {
    icon: 'twitter',
    label: 'X (Twitter)',
    action: 'twitter',
    url: 'https://twitter.com/intent/tweet?text=DATA_TEXT&url=DATA_URL',
  },
  {
    icon: 'facebook',
    label: 'Facebook',
    action: 'facebook',
    url: 'https://www.facebook.com/sharer/sharer.php?u=DATA_URL&quote=DATA_TEXT',
  },
  {
    icon: 'linkedin',
    label: 'Linkedin',
    action: 'linkedin',
    url: 'https://www.linkedin.com/shareArticle?mini=true&url=DATA_URL&title=DATA_TITLE&summary=DATA_TEXT&source=LinkedIn',
  },
];
