export const fibonacci = (n: number): number => {
  const hash: Record<number, number> = {}

  for (let i = 0; i <= n; i++) {
    if (i === 0 || i === 1) {
      hash[i] = 1
    } else {
      hash[i] = hash[i - 1] + hash[i - 2]
    }
  }

  return hash[n]
}
