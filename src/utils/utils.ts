import { TElementState } from "../types/forString/types";

export const delay = (num: number) => {
  return new Promise(resolve => setTimeout(resolve, num));
}

export const swapString = (arr: string[] | number[] | TElementState[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };