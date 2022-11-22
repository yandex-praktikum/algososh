import { ElementStates } from "../types/element-states";
import { TElementState } from "../types/types";

export const delay = (num: number) => {
  return new Promise(resolve => setTimeout(resolve, num));
}

export const swapString = (arr: string[] | number[] | TElementState[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

export const randomNum = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getRandomArrNum = () => {
  let arr: TElementState[] = [];
  const max = 100;
  const min = 0;
  const minSize = 3;
  const maxSize = 17;

  for (let i = 0; i < randomNum(minSize, maxSize); i++) {
    arr.push({ item: randomNum(min, max), state: ElementStates.Default});
  }

  return arr;
}