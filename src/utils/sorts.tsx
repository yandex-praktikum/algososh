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

export const selectionSortSteps = (arr: number[], type?: string): number[][] => {
  const res: number[][] = []

  if (arr.length <= 1) return [arr]

  for (let i = 0; i < arr.length; i++) {
    let searchedIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      let a = j
      let b = searchedIndex
      if (type === 'desc') {
        a = searchedIndex
        b = j
      }
      if (arr[a] < arr[b]) {
        searchedIndex = j
      }
      res.push([...arr])
    }
    let c = i
    let d = searchedIndex
    if (type === 'desc') {
      c = searchedIndex
      d = i
    }
    if (arr[c] > arr[d]) {
      const tmp = arr[i]
      arr[i] = arr[searchedIndex]
      arr[searchedIndex] = tmp
    }
    if (i === arr.length - 1) {
      res.push([...arr])
    }
  }

  return res
}
