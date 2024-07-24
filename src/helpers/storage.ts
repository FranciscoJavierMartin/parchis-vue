import { CACHE_KEY } from '@/constants/storage';
import type { TStorageType } from '@/interfaces/storage';

export function saveInCache<T>(data: T, storageType: TStorageType = 'localStorage'): void {
  const finalData = JSON.stringify(data);
  window[storageType].setItem(CACHE_KEY, finalData);
}

export function getDataFromCache<T>(storageType: TStorageType = 'localStorage'): T {
  const data = window[storageType].getItem(CACHE_KEY) || '';
  return data && isValidJSON(data) ? JSON.parse(data) : {};
}

export function saveProperty<T>(
  property: string,
  value: T,
  storageType: TStorageType = 'localStorage',
): void {
  const localCache = getDataFromCache<{ [property: string]: T }>(storageType);
  localCache[property] = value;
  saveInCache(localCache, storageType);
}

export function saveProperties<T>(
  data: Record<string, T>,
  storageType: TStorageType = 'localStorage',
): void {
  Object.keys(data).forEach((key: string) => {
    saveProperty(key, data[key], storageType);
  });
}

export function getValueFromCache<T>(
  key: string = '',
  fallbackValue: T,
  storageType: TStorageType = 'localStorage',
): T {
  const localCache = getDataFromCache<{ [key: string]: T }>(storageType);
  return localCache[key] || fallbackValue;
}

export function deleteProperty(property: string, storageType: TStorageType = 'localStorage'): void {
  const localCache = getDataFromCache<{ [property: string]: any }>(storageType);

  if (localCache[property]) {
    delete localCache[property];
    saveInCache(localCache, storageType);
  }
}

function isValidJSON(json: string): boolean {
  let isValid: boolean;

  try {
    JSON.parse(json);
    isValid = true;
  } catch {
    isValid = false;
  }

  return isValid;
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}
