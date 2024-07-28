import { markRaw, type Component, type Raw } from 'vue';
import CopyIcon from '@/components/icons/copy-icon.vue';
import XIcon from '@/components/icons/x-icon.vue';
import FacebookIcon from '@/components/icons/facebook-icon.vue';
import LinkedinIcon from '@/components/icons/linkedin-icon.vue';

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

export type TButtons = {
  icon: Raw<Component>;
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
    icon: markRaw(XIcon),
    label: 'X (Twitter)',
    action: 'twitter',
    url: 'https://twitter.com/intent/tweet?text=DATA_TEXT&url=DATA_URL',
  },
  {
    icon: markRaw(FacebookIcon),
    label: 'Facebook',
    action: 'facebook',
    url: 'https://www.facebook.com/sharer/sharer.php?u=DATA_URL&quote=DATA_TEXT',
  },
  {
    icon: markRaw(LinkedinIcon),
    label: 'Linkedin',
    action: 'linkedin',
    url: 'https://www.linkedin.com/shareArticle?mini=true&url=DATA_URL&title=DATA_TITLE&summary=DATA_TEXT&source=LinkedIn',
  },
];
