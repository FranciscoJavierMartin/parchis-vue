import { CACHE_KEY, PLAYERS_INFO } from '@common/constants/storage.constants';
import type { IPlayerOffline } from '@players/interfaces/player.interface';
import type { TStorageType } from '@common/interfaces/storage.interface';

/**
 * Store data in selected cache
 * @param data Data to be stored
 * @param storageType Where to store data
 */
export function saveInCache<T>(data: T, storageType: TStorageType = 'localStorage'): void {
  const finalData = JSON.stringify(data);
  window[storageType].setItem(CACHE_KEY, finalData);
}

/**
 * Get data from cache selected
 * @param storageType Where to get data
 * @returns Data from cache
 */
export function getDataFromCache<T>(storageType: TStorageType = 'localStorage'): T {
  const data = window[storageType].getItem(CACHE_KEY) || '';
  return data && isValidJSON(data) ? JSON.parse(data) : {};
}

/**
 * Create or update a property for an existing data in cache
 * @param property Property to be updated
 * @param value New value to be setted
 * @param storageType Where to save new data
 */
export function saveProperty<T>(
  property: string,
  value: T,
  storageType: TStorageType = 'localStorage',
): void {
  const localCache = getDataFromCache<{ [property: string]: T }>(storageType);
  localCache[property] = value;
  saveInCache(localCache, storageType);
}

/**
 * Create or update multiple properties for an existing data in cache
 * @param data New data to be setted
 * @param storageType Where to save new data
 */
export function saveProperties<T>(
  data: Record<string, T>,
  storageType: TStorageType = 'localStorage',
): void {
  Object.keys(data).forEach((key: string) => {
    saveProperty(key, data[key], storageType);
  });
}

/**
 * Get value from cache
 * @param key Key to get data
 * @param fallbackValue Default value
 * @param storageType Where to get data
 * @returns Data from cache if exists, falbackValue in otherwise
 */
export function getValueFromCache<T>(
  key: string = '',
  fallbackValue: T,
  storageType: TStorageType = 'localStorage',
): T {
  const localCache = getDataFromCache<{ [key: string]: T }>(storageType);
  return localCache[key] || fallbackValue;
}

/**
 * Remove property from object in cache
 * @param {string} property Property to be deleted
 * @param {TStorageType} storageType Where data is stored
 */
export function deleteProperty(property: string, storageType: TStorageType = 'localStorage'): void {
  const localCache = getDataFromCache<{ [property: string]: any }>(storageType);

  if (localCache[property]) {
    delete localCache[property];
    saveInCache(localCache, storageType);
  }
}

/**
 * Check if string is a valid JSON
 * @param {string} json - data
 * @returns {boolean} true if it is valid, false otherwise
 */
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

/**
 * Check if value is a number
 * @param {unknown} value Value to be checked
 * @returns {boolean} true if it is a number, false otherwise
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Save data player in cache
 * @param {IPlayerOffline[]} players Info to save in cache
 */
export function savePlayerDataCache(players: IPlayerOffline[]): void {
  const playerDataCache = players.map(({ id, name, isBot }) => ({
    id,
    name,
    isBot,
  }));

  saveProperty(PLAYERS_INFO, playerDataCache);
}
