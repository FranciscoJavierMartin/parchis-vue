/**
 * Delay the function execution
 * @param fn Function to be delayed
 * @param delay Time in milisenconds
 * @returns Function with delay
 */
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

/**
 * Delay some time the execution
 * @param ms Time to delay in miliseconds
 */
export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
