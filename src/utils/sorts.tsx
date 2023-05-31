export const bubbleSortSteps = (arr: number[], type?: string): number[][] => {
  const res: number[][] = []

  if (arr.length <= 1) return [arr]

  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 1; j <= i; j++) {
      let a = j - 1
      let b = j
      if (type === 'desc') {
        a = j
        b = j - 1
      }
      if (arr[a] > arr[b]) {
        const tmp = arr[a]
        arr[a] = arr[b]
        arr[b] = tmp
      }
      res.push([...arr])
    }
  }

  return res
}

export const selectionSort = (arr: number[], type: string): number[] => {
  return arr
}
