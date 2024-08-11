/**
 * Clone object (with functions)
 * @param obj Object to be cloned
 * @returns Cloned object
 */
export function cloneDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}
