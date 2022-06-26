import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../constants/delays";

export const delay = (delay: number = DELAY_IN_MS): Promise<null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, delay);
  });
};

export const getNumber = () => Math.floor(Math.random() * 100) + 1;
