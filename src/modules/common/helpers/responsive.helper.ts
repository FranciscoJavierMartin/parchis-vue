/**
 * Check if it is executed in mobile environment
 * @returns true if it is executed from mobile or tablet, false otherwise
 */
export function isMobile(): boolean {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
