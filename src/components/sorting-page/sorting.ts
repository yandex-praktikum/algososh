import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { RandomArrayType } from "./sorting-page";

// функция для генерации случайного числа в диапазоне
const min = 0
const max = 100
const minLen = 3
const maxlen = 17
export const randomNum = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomArr(min: number, max: number, minLen: number, maxlen: number): RandomArrayType[] {
  const arrLength = randomNum(minLen, maxlen)
  const arr: RandomArrayType[] = []
  for (let i = 0; i < arrLength; i++) {
    arr.push({ number: randomNum(min, max), state: ElementStates.Default })
  }
  return arr
}

export const swap = (arr: RandomArrayType[], firstIndex: number, secondIndex: number): string => {
  const temp = arr[firstIndex].number;
  arr[firstIndex].number = arr[secondIndex].number;
  arr[secondIndex].number = temp;
  return [...arr].join('')
}

type arrType = RandomArrayType[]

export const selectionSort =
  async (arr: RandomArrayType[],
    setArray: (arr: arrType) => void,
    setIsLoader: (dir: Direction | null) => void,
    direction: Direction) => {

    if (arr.length === 0) {
      return arr;
    }
    const { length } = arr;

    for (let i = 0; i < length; i++) {
      let maxInd = i;
      arr[maxInd].state = ElementStates.Changing;

      for (let j = i + 1; j < length; j++) {
        arr[j].state = ElementStates.Changing
        setArray([...arr])
        await timeOut();
        if (direction === Direction.Ascending) {
          if (arr[j].number < arr[maxInd].number) {
            maxInd = j;
            arr[j].state = ElementStates.Changing;
            arr[maxInd].state = i === maxInd ? ElementStates.Changing : ElementStates.Default;
          }
        } else {
          if (arr[j].number > arr[maxInd].number) {
            maxInd = j;
            arr[j].state = ElementStates.Changing;
            arr[maxInd].state = i === maxInd ? ElementStates.Changing : ElementStates.Default;
          }

        }


        if (j !== maxInd) {
          arr[j].state = ElementStates.Default;
        }
        setArray([...arr])
      }

      if (maxInd !== i) swap(arr, i, maxInd);
      arr[maxInd].state = ElementStates.Default;
      arr[i].state = ElementStates.Modified;
      setArray([...arr])

    }

    setIsLoader(null)

  };

const timeOut = () => new Promise<void>(
  resolve => setTimeout(resolve, 300)
);

export const bubbleSort =
  async (arr: RandomArrayType[],
    setArray: (arr: arrType) => void,
    setIsLoader: (dir: Direction | null) => void,
    direction: Direction) => {

    if (arr.length === 0) {
      return arr;
    }
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      arr[i].state = ElementStates.Changing
      for (let j = 0; j < length - i - 1; j++) {
        arr[j].state = ElementStates.Changing
        arr[j + 1].state = ElementStates.Changing
        setArray([...arr])
        await timeOut();
        if (direction === Direction.Ascending) {
          if (arr[j].number > arr[j + 1].number) {
            swap(arr, j, j + 1);
          }
          arr[j].state = ElementStates.Modified
        }
        else
          if (direction === Direction.Descending) {
            if (arr[j].number < arr[j + 1].number) {
              swap(arr, j, j + 1);
            }
            arr[j].state = ElementStates.Modified
          }
        arr[j].state = ElementStates.Modified
        setArray([...arr])
        await timeOut();
      }
      arr[i].state = ElementStates.Modified

    }

    setIsLoader(null)
    return arr

  } 