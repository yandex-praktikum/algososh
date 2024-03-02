import { ElementStates } from "../types/element-states";

export function swap(arr: string[], firstIndex: number, secondIndex: number) {
  let temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}

export function updateCircleState(
  prevCircleStates: ElementStates[],
  currentIndex: number,
  elementStates: ElementStates,
  stringArray?: string[] | undefined
) {
  let newCircleStates = [...prevCircleStates];
  newCircleStates[currentIndex] = elementStates;
  if (stringArray) {
    newCircleStates[stringArray.length - 1 - currentIndex] = elementStates;
  }
  return newCircleStates;
}

export function customSetInterval(func:Function,interval:number,...params:string[]){
  setTimeout(()=>{
    func(...params)
    customSetInterval(func,interval,...params)
  },interval)
}