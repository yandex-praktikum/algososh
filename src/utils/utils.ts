import { ElementStates } from "../types/element-states";

export function swap(
  arr: string[] | number[],
  firstIndex: number,
  secondIndex: number
) {
  let temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}

export function updateCircleState(
  prevCircleStates: ElementStates[],
  currentIndex: number,
  elementStates: ElementStates,
  stringArray?: string[] | number[] | undefined
) {
  let newCircleStates = [...prevCircleStates];
  newCircleStates[currentIndex] = elementStates;
  if (stringArray) {
    newCircleStates[stringArray.length - 1 - currentIndex] = elementStates;
  }
  return newCircleStates;
}

export function randomArr(arr: number[]) {
  let maxLen = 3;
  let minLen = 17;
  const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * 101));
  }
  return arr;
}
export function randomLinkedList(arr: string[] = []) {
  let maxLen = 6;
  let minLen = 3;
  const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * 101).toString());
  }
  return arr;
}
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
