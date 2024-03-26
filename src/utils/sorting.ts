import { swap } from "./utils";
import { Direction } from "../types/direction";
export function bubbleSort(arr: number[], direction: Direction) {
  const n = arr.length;
  const steps: [number[], number, number, number][] = [];
  let counter = arr.length - 1;

  for (let j = 0; j < n; j++) {
    let swapped = false;
    for (let i = 0; i < n - j - 1; i++) {
      steps.push([[...arr], i, i + 1, counter]);
      console.log("каунтер", counter);
      if (direction === Direction.Ascending) {
        if (arr[i] > arr[i + 1]) {
          swap(arr, i, i + 1);
          swapped = true;
        }
      } else {
        if (arr[i] < arr[i + 1]) {
          swap(arr, i, i + 1);
          swapped = true;
        }
      }
    }
    counter--;
    if (!swapped) {
      break;
    }
  }

  steps.push([[...arr], -1, -1, -1]);
  return { bubbleSortSteps: steps };
}

export function selectionSort(arr: number[], direction: Direction) {
  const n = arr.length;
  let steps: [number[], number, number, number][] = [];
  let counter: number = 0;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      steps.push([[...arr], minIndex, j, counter]);
      if (direction === Direction.Descending) {
        if (arr[j] > arr[minIndex]) {
          minIndex = j;
        }
      } else {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
    }
    if (minIndex !== i) {
      swap(arr, i, minIndex);
    }
    counter++;
  }

  steps.push([[...arr], -1, -1, counter + 1]);

  return { selectionSortedSteps: steps };
}
