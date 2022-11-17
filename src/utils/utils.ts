import {ElementStates} from "../types/element-states";

export const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const getFibonacciNumbers = (n: number): number[] => {
    let array: number[] = [1, 1];
    for (let i = 2; i < n + 1; i++) {
        array.push(array[i - 2] + array[i - 1])
    }
    return array;
};

export const getRandomInt = (minLen: number, maxLen: number) => {
    return Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
};

export const makeRandomArr = () => {
    const array = [];
    const length = getRandomInt(3, 17);
    for (let i = 0; i < length; i++) {
        array.push({ value: Math.round(Math.random() * 100), color: ElementStates.Default });
    }
    return array;
};

