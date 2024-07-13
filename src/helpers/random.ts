import type { TDiceValues } from '@/interfaces/dice';
import type { IActionsTurn } from '@/interfaces/game';

/**
 * Return a random number between min and max
 * @param min minimun value (included)
 * @param max maximun value (excluded)
 * @returns random number
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
  const newActionsTurn = structuredClone(actionsTurn);

  newActionsTurn.diceValue = diceValue || randomValueDice();
  newActionsTurn.timerActivated = false;
  newActionsTurn.disabledDice = true;
  const diceRollNumber = newActionsTurn.diceRollNumber;
  const newDiceRollNumber = diceRollNumber + 1 >= 10 ? 1 : diceRollNumber + 1;
  newActionsTurn.diceRollNumber = newDiceRollNumber;

  return newActionsTurn;
}
