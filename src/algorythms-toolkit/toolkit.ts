import { stringCharsProps } from './../types/types';
export const swapChars = (
  arr: stringCharsProps[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const reverseString = (arr: stringCharsProps[]) : stringCharsProps[] => {
  let startIdx = 0;
  let endIdx = arr.length - 1;
  while(endIdx > startIdx) {
    swapChars(arr, startIdx, endIdx);
    startIdx++;
    endIdx--;
  }
  return arr
};

export const fibIterative = (n: number): number[] => {
  let arr: number[] = [0, 1];
  for (let i = 2; i < n + 1; i++){
    arr.push(arr[i - 2] + arr[i -1])
  }
 return arr.slice(1)
}
