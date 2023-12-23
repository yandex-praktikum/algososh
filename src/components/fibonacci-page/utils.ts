/*
export const getFibonacciSequence = (index: number): number => {
    let a = 1;
    let b = 1;

    for (let i = 3; i <= index; i++) {
        let c = a + b;
        a = b;
        b = c;
    }

    console.log('getFibonacciSequence index: ', index, '; value: ', b)

    return b;
}
*/
export const getFibonacciSequence = (n: number): number => {
    let arr: number[] = [0, 1];
    for (let i = 2; i < n + 1; i++){
      arr.push(arr[i - 2] + arr[i -1])
    }
   return arr[n]
  } 