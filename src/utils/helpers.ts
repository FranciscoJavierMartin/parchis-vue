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
    const context = this as any;
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
