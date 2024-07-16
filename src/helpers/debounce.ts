export default function debounce(fn: Function, delay: number) {
  let timer: NodeJS.Timeout | undefined;

  // TODO: Add better types
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return function (...args: any): void {
    if (timer) {
      clearTimeout(timer);
    }
    const context = this;
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
