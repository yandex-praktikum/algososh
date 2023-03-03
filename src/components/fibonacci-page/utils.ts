export const calculateFibonacciNumbers = (n: number): number[] => {
  let arr: number[] = [1, 1];
  for (let i = 2; i <= n; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr;
};
