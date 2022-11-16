import {ElementStates} from "../types/element-states";

export const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const getFibonacciNumbers = (n: number): number[] => {
    let arr: number[] = [1, 1];
    for (let i = 2; i < n + 1; i++) {
        arr.push(arr[i - 2] + arr[i - 1])
    }
    return arr;
};

export const getRandomInt = (minLen: number, maxLen: number) => {
    return Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
};

export const makeRandomArr = () => {
    const arr = [];
    const length = getRandomInt(3, 17);
    for (let i = 0; i < length; i++) {
        arr.push({ value: Math.round(Math.random() * 100), color: ElementStates.Default });
    };
    return arr;
};