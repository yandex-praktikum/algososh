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

export function updateColumnleState(
  currentIndex: number,
  elementStates: ElementStates,
  stringArray?: string[] | number[] | undefined
) {
  let newCircleStates = [];
  newCircleStates[currentIndex] = elementStates;
  if (stringArray) {
    newCircleStates[currentIndex + 1] = elementStates;
  }
  return newCircleStates;
}

export function customSetInterval(
  func: Function,
  interval: number,
  ...params: string[]
) {
  setTimeout(() => {
    func(...params);
    customSetInterval(func, interval, ...params);
  }, interval);
}

export function randomArr(arr: number[]) {
  let maxLen = 6;
  let minLen = 6;
  const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * 101));
  }
  return arr;
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface Step {
  currentArray: number[];
  sortedIndexes: number[];
  aIndex: number;
  bIndex: number;
}

export function getColumnState(
  index: number,
  maxIndex: number,
  currentStepNumber: number,
  currentStep: Step
): ElementStates {
  if ([currentStep.aIndex, currentStep.bIndex].includes(index)) {
    return ElementStates.Changing;
  }
  if (
    currentStep.sortedIndexes.includes(index) ||
    (currentStepNumber === maxIndex && maxIndex > 0)
  ) {
    return ElementStates.Modified;
  }
  return ElementStates.Default;
}

