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