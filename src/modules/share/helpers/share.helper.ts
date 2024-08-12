export async function shareLink(data: ShareData): Promise<void> {
  navigator.share(data);
}

export function shareWithSocialNetwork(data: Omit<ShareData, 'files'>, originalUrl: string): void {
  const url: string = Object.keys(data).reduce<string>(
    (acc, key) => acc.replace(`DATA_${key.toUpperCase}`, encodeURIComponent(data[key as never])),
    originalUrl,
  );
  window.open(url, '_blank');
}
