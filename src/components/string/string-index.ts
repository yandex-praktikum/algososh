
export const stringLength: number = 11


// export const stringRevers = (string: string) => {
//   let arr = string.split('');
//   let end = arr.length - 1;
//   for (let i = 0; i <= Math.floor(end / 2); i++) {
//     swap(arr, i, end - i)
//   }
//   return arr
// }

// меняем местами с помощью функции swap
export const swap = (arr: string[], firstIndex: number, secondIndex: number): string => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
  return [...arr].join('')
}

