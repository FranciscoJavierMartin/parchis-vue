export const SHARE_AVAILABLE: boolean = 'share' in navigator;

export function successMessage() {}

export function shareLink(data: ShareData): void {
  navigator
    .share(data)
    .then(() => {
      console.log('Suceess');
    })
    .catch(() => {
      console.log('Error');
    });
}
