import { ElementStates } from "../types/element-states";

export function swap(arr: {value:string, color: ElementStates}[], start = 0, end = arr.length - 1) {
    const temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    return arr;
}

