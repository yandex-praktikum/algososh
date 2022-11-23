import { ElementStates } from "./element-states";

export type TElementState = {
  item: string | number;
  state?: ElementStates;
}

export type TStack = {
  item: string | unknown;
  state?: ElementStates;
  head?: string;
}

export type TArrQueue = {
  item: string;
  state: ElementStates;
  head: string;
  tail: string;
}

export type TDisabled = {
  push: boolean;
  pop: boolean;
}

export type TLinkedList<T> = {
  append: (element: T) => void;
  prepend: (item: T) => void;
  insertAt: (element: T, position: number) => void;
  deleteNode: (index: number) => void;
  getSize: () => number;
  toArray: () => void;
  get: (index: number) => void;
}

export type TArrList = {
  item: string;
  state: ElementStates;
  head?: boolean;
  tail?: boolean;
  add?: boolean;
  dell?: boolean;
  miniCircle?: {
    name: string;
  };
}

export type TDisabledList = {
  addHead: boolean;
  addTail: boolean;
  deleteTail: boolean;
  deleteHead: boolean;
  addByIndex: boolean;
  deleteByIndex: boolean;
}