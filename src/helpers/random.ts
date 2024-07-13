/**
 * Return a random number between min and max
 * @param min minimun value (included)
 * @param max maximun value (excluded)
 * @returns random number
 */
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
