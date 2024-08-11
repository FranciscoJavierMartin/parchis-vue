/**
 * Copy text to clipboard
 * @param text Text to be copied
 */
export function copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text);
}
