export const swapChars = (
  arr: string[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const reverseString = (arr: string[]) : string[] => {
  let startIdx = 0;
  let endIdx = arr.length - 1;
  while(endIdx > startIdx) {
    swapChars(arr, startIdx, endIdx);
    startIdx++;
    endIdx--;
  }
  return arr
};
