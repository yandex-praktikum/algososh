import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";

const getRandomInt = (min: number, max: number): number => {
    return Math.round(Math.random() * (max - min) + min);
}

export const randomArr = () : number[] => {    
    const RANGE_MIN = 3;
    const RANGE_MAX = 17;
    const VALUE_MIN = 0;
    const VALUE_MAX = 100;

    const range = getRandomInt(RANGE_MIN, RANGE_MAX);    
    const res: number[] = [];

    for (let i = 0; i < range; i++) {
      res.push(getRandomInt(VALUE_MIN, VALUE_MAX));
    }    
    return res;
}

export const swapElements = (array: number[], firstIndex: number, secondIndex: number) => {
    return [array[firstIndex], array[secondIndex]] = [array[secondIndex], array[firstIndex]];
} 

export const swapElementsSelection = (arr: number[], directionSort: Direction, index: number, maxIndex: number) => {
    if (directionSort === Direction.Ascending) {
        if (arr[index] < arr[maxIndex]) {
          swapElements(arr, maxIndex, index)
        }
      } else {
        if (arr[index] > arr[maxIndex]) {
          swapElements(arr, maxIndex, index)
        }
      }
}

export const swapElementsBubble = (arr: number[], directionSort: Direction, index: number) => {    
    if (directionSort === Direction.Ascending) {
        if (arr[index] > arr[index + 1]) {
            swapElements(arr, index, index + 1);
        }
    } else {
        if (arr[index] < arr[index + 1]) {
            swapElements(arr, index, index + 1);
        }
    }
  } 

export const stateBubbleElement = (index: number, nextElement: number | undefined, currentElement: number | undefined, lastElement: number | undefined) => {
    if (lastElement !== undefined) {
        if (index === nextElement || index === currentElement) {
            return ElementStates.Changing
        } else if (index > lastElement || lastElement === 0) {
            return ElementStates.Modified
        }
        return ElementStates.Default
    }
};

export const stateSelectionElement = (index: number, nextElement: number | undefined, currentElement: number | undefined) => {
    if (nextElement !== undefined) {
        if (index === nextElement || index === currentElement) {
        return ElementStates.Changing
        } else if (index < nextElement) {
        return ElementStates.Modified
        }
        return ElementStates.Default
    }
    };    