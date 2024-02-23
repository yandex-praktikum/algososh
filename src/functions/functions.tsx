import { ElementStates } from "../types/element-states";

export function swap(arr: { value: string, color: ElementStates }[], start = 0, end = arr.length - 1) {
    const temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    return arr;
}

export function fib(n: number) {
    let arr: number[] = [0, 1];
    
    for (let i = 2; i < n + 1; i++) {
         arr.push(arr[i - 2] + arr[i - 1])         
           
    }
    
    
    return arr
}


/* export function fib(n: number, memo: Record<number, number> = {}): any {
    if (n in memo) {        
        return memo[n];
    }
    if (n <= 2) {
       
        
        return 1;
    }
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    
// значение пушить в начальный массив и вернуть его! Заменить итеративный метод
    return (memo[n]);
    ;
};
 */