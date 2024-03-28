const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

export const choiceSortAscending = (initialArray: number[]) => {
    const array = [...initialArray]
    const { length } = array;
    let counter = 0;
    const steps: [number[], number, number, number][] = [];
    for (let i = 0; i < length - 1; i++) {
      let minInd = i;
      for (let j = i + 1; j < length; j++) {
        steps.push([[...array], minInd, j, counter]);
        if (array[j] < array[minInd]) {
          minInd = j;
        }
      }
      if (minInd === i) {
        counter++
      }
      if (minInd !== i) {
        counter++
        swap(array, i, minInd)
      }
    }
    steps.push([[...array], -1, -1, length]);
    return steps
  }
  
  export const choiceSortDescending = (initialArray: number[]) => {
    const array = [...initialArray]
    const { length } = array;
    let counter = 0;
    const steps: [number[], number, number, number][] = [];
    for (let i = 0; i < length - 1; i++) {
      let minInd = i;
      for (let j = i + 1; j < length; j++) {
        steps.push([[...array], minInd, j, counter]);
        if (array[j] > array[minInd]) {
          minInd = j;
        }
      }
      if (minInd === i) {
        counter++
      }
      if (minInd !== i) {
        counter++
        swap(array, i, minInd)
      }
    }
    steps.push([[...array], -1, -1, length]);
    return steps
  }
  
export const bubleSortAscending = (initialArray: number[]) => {
    const steps: [number[], number, number, number][] = [];
    const array = [...initialArray]
    const { length } = array;
    let counter = length;
    for (let i = 0; i < length; i++) {
      counter = counter - 1;
      for (let j = 0; j < length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          swap(array, j, j + 1);
          steps.push([[...array], j, j + 1, counter])
        }
      }
    }
    steps.push([[...array], -1, -1, -1]);
    return steps;
  }
  
export const bubleSortDescending = (initialArray: number[]) => {
    const steps: [number[], number, number, number][] = [];
    const array = [...initialArray]
    const { length } = array;
    let counter = length;
    for (let i = 0; i < length; i++) {
      counter = counter - 1;
      for (let j = 0; j < length - i - 1; j++) {
        if (array[j] < array[j + 1]) {
          swap(array, j, j + 1);
          steps.push([[...array], j, j + 1, counter])
        }
      }
    }
    steps.push([[...array], -1, -1, -1]);
    return steps;
  }