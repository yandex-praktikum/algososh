export const swap = (arr: string[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
}