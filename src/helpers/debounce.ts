export default function debounce(fn: Function, delay: number) {
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
