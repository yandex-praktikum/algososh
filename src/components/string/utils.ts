import { ElementStates } from "../../types/element-states";

export type TElement = {
    value: string;
    state: ElementStates
  }

  export const swapElements = (array: TElement[], firstIndex: number, secondIndex: number) => {
    return [array[firstIndex], array[secondIndex]] = [array[secondIndex], array[firstIndex]];
  } 

  export const getSourceString = (sourceString: string) : TElement[] => {
    return sourceString.split('').map((value => ({ value, state: ElementStates.Default })));  
  } 
