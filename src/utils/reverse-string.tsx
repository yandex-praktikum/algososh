export const reverseStringAlgorythmSteps = (str: string): string[][] => {
  if (!str) return [['']]

  const arr = str.split('')
  const l = arr.length
  const res = [[...arr]]

  for (let i = 0; i < l / 2; i++) {
    const tmp = arr[i]
    arr[i] = arr[l - i - 1]
    arr[l - i - 1] = tmp
    res.push([...arr])
  }

  return res
}
