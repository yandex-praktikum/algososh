export function fibonacci(n: number): number {
  if (n <= 1) {
    return 1;
  }

  let a = 1;
  let b = 1;

  for (let i = 0; i < n; i++) {
    let temp = a;
    a = b;
    b = temp + b;
  }

  return a;
}
