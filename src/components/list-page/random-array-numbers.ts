import { LinkedList } from './class-linked-list';

const randomArr = (len: number, min: number, max: number) =>
  Array.from({ length: len }, () =>
    String(Math.floor(Math.random() * (max - min + 1)) + min)
  );

const listArr = randomArr(4, 0, 99);

export const list = new LinkedList<string>(listArr);
