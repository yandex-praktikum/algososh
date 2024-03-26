export function swap(
  arr: string[] | number[],
  firstIndex: number,
  secondIndex: number
) {
  let temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}

export function randomArr(arr: number[]) {
  let maxLen = 3;
  let minLen = 17;
  const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * 101));
  }
  return arr;
}
export function randomLinkedList(arr: string[] = []) {
  let maxLen = 6;
  let minLen = 3;
  const length = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * 101).toString());
  }
  return arr;
}
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function disableButtonSetter<T extends Record<string, boolean>>(
  button: string,
  object: T
) {
  return (
    Object.keys(object).some((key) => key !== button) &&
    Object.values(object).some((value) => value === true)
  );
}
