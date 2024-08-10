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

export function shareWithSocialNetwork(data: Omit<ShareData, 'files'>, originalUrl: string): void {
  const url: string = Object.keys(data).reduce<string>(
    (acc, key) => acc.replace(`DATA_${key.toUpperCase}`, encodeURIComponent(data[key as never])),
    originalUrl,
  );
  window.open(url, '_blank');
}
