const cacheFib: Record<number, number> = {}

export function getFibonacci(index: number): number {
  if (index < 0) {
    throw new Error();
  }
  if (index === 0) {
    return 0
  }
  if (index === 1) {
    return 1
  }

  if (cacheFib[index]) {
    return cacheFib[index]
  }

  const num1 = getFibonacci(index - 1)
  const num2 = getFibonacci(index - 2)

  cacheFib[index - 1] = num1
  cacheFib[index - 2] = num2

  return num1 + num2;
}

export function fibArray(index: number){
 const arr = [1]
 for (let i = 2; i <= index; i++){
  arr.push(getFibonacci(i))
 }
 return arr
}
