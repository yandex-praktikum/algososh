import { swap } from "./sorting";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { RandomArrayType } from "./sorting-page";


export const selectionSort = (arr: RandomArrayType[]) => {

  if (arr.length === 0) {
    return arr;
  }
  const { length } = arr;

  for (let i = 0; i < length; i++) {
    let maxInd = i;

    for (let j = i + 1; j < length; j++) {
      if (arr[j].number > arr[maxInd].number) {
        maxInd = j;
      }
    }

    if (maxInd !== i) swap(arr, i, maxInd);
  }
  return arr
}

export const bubbleSort = (arr: RandomArrayType[]) => {

  if (arr.length === 0) {
    return arr;
  }
  const { length } = arr;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (arr[j].number < arr[j + 1].number) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr
}