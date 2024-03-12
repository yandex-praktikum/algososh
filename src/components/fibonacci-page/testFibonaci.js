//1 рекурсивный вариант(Самый медленный)
function fibRecursive(n) {
  if (n <= 1) {
    return n;
  } else {
    return fibRecursive(n - 1) + fibRecursive(n - 2);
  }
}

//2
function fibIterative(n) {
  let a = 0,
    b = 1;
  for (let i = 0; i < n; i++) {
    let temp = a;
    a = b;
    b = temp + b;
  }
  return a;
}

function fibonacciIterative(n) {
  if (n <= 1) {
    return n;
  }

  let a = 0;
  let b = 1;

  for (let i = 2; i <= n; i++) {
    let temp = a + b;
    a = b;
    b = temp;
  }

  return b;
}

function memoFibonacci(memo = {}, n) {
  if (n in memo) {
    return memo[n];
  }
  //отрабатываем два кейса стандартных
  if (n <= 1) {
    return n;
  } else {
    let result = memoFibonacci(n - 1) + memoFibonacci(n - 2);
    memo[n] = result;
    return result;
  }
}


