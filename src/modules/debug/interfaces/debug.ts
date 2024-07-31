export type TOptions = 'player' | 'token' | 'type' | 'position';
export type TSelects = Record<TOptions, number>;

export interface IOptions {
  id: string | number;
  label: string | number;
}
