export const delay = (time: number) =>
  new Promise<void>((res) => setTimeout(res, time));

export const DELAY_MILLISECONDS = 1000;
export const DELAY_MILLISECONDS_700 = 700;
export const DELAY_MILLISECONDS_500 = 500;
