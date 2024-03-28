export const getFibonacciNumbers = (number: number) => {
    const array: number[][] = []
    let arr: number[] = [0, 1];
    for (let i = 2; i <= number; i++) {
      arr.push(arr[i - 2] + arr[i - 1])
      array.push([...arr])
    }
    array.unshift([0,1])
    return array;

  }