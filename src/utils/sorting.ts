import { swap } from "./utils";
import { Direction } from "../types/direction";
export function bubbleSort(arr: number[], direction: Direction) {
  const n = arr.length;
  const steps: [number[], number, number][] = [];

  for (let j = 0; j < n - 1; j++) {
    let swapOccured = false;
    for (let i = 0; i < n - j - 1; i++) {
      if (
        (direction === Direction.Ascending && arr[i] > arr[i + 1]) ||
        (direction === Direction.Descending && arr[i] < arr[i + 1])
      ) {
        swap(arr, i, i + 1);
        steps.push([[...arr], i, i + 1]); // Добавляем текущее состояние массива в шаги

        swapOccured = true;
      }
    }
    if (!swapOccured) {
      break; // Если не было замен на данном проходе, то массив уже отсортирован
    }
  }
  return steps;
}

export function selectionSort(arr: number[], direction: Direction) {
  const n = arr.length;
  let steps: [number[], number, number][] = [];
  let sortedIndices: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      steps.push([[...arr], minIndex, j]);
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
      sortedIndices.push(i); // Добавляем индекс в sortedIndices только если был произведен обмен
    }
  }

  steps.push([[...arr], -1, -1]);

  return { selectionSortedSteps: steps, sortedIndices };
}
