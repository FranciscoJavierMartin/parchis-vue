import { cloneDeep } from '@/helpers/clone';
import type { IActionsTurn } from '@/interfaces/game';
import type { TDiceValues } from '@/interfaces/dice';

/**
 * Return a random integer between min and max
 * @param min minimun value (included)
 * @param max maximun value (excluded)
 * @returns random integer
 */
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomValueDice(): TDiceValues {
  return getRandomNumber(1, 6) as TDiceValues;
}

export function getRandomValueDice(
  actionsTurn: IActionsTurn,
  diceValue?: TDiceValues,
): IActionsTurn {
  const newActionsTurn: IActionsTurn = cloneDeep(actionsTurn);

  newActionsTurn.diceValue = diceValue || randomValueDice();
  newActionsTurn.timerActivated = false;
  newActionsTurn.disabledDice = true;
  const diceRollNumber = newActionsTurn.diceRollNumber;
  const newDiceRollNumber = diceRollNumber + 1 >= 10 ? 1 : diceRollNumber + 1;
  newActionsTurn.diceRollNumber = newDiceRollNumber;

  return newActionsTurn;
}

export function guid(): string {
  function s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4();
}
