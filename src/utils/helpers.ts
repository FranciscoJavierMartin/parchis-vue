export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

export function isMobile(): boolean {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export function debounce(fn: Function, delay: number) {
  let timer: NodeJS.Timeout;

  return function (...args: any) {
    if (timer) {
      clearTimeout(timer);
    }
    const context = this;
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

/**
 * Return a random number between min and max
 * @param min minimun value (included)
 * @param max maximun value (excluded)
 * @returns random number
 */
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
