export const makeDelay = (millisecond: number) =>
  new Promise((res) => setTimeout(res, millisecond));
