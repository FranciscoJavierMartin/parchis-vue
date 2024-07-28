import { markRaw } from 'vue';
import CopyIcon from '@/components/icons/copy-icon.vue';

export const SHARE_AVAILABLE: boolean = 'share' in navigator;

export function shareLink(data: ShareData): void {
  navigator
    .share(data)
    .then(() => {
      // TODO: Display toast
      console.log('Suceess');
    })
    .catch(() => {
      // TODO: Display toast
      console.log('Error');
    });
}

type TButtons = {
  icon: any;
  label: string;
  action: string;
  url?: string;
};

export const BUTTONS: TButtons[] = [
  {
    icon: markRaw(CopyIcon),
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
