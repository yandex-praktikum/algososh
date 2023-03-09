import { ElementStates } from '../../types/element-states';

export interface IArrayNumbers {
  value: number;
  state: ElementStates;
}

const MIN = 3;
const MAX = 17;

export const getArrayNumbers = (): IArrayNumbers[] => {
  const array = [];
  const len = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
  for (let i = 0; i <= len; i++) {
    array.push({
      value: Math.round(Math.random() * 100),
      state: ElementStates.Default,
    });
  }
  return array;
};

export const swap = (
  arr: IArrayNumbers[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};
