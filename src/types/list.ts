import { ElementStates } from "./element-states";

export interface IListState<T> {
  item: T;
  state: ElementStates;
  addProgress: boolean;
  deleteProgress: boolean;
  tempItem: T;
}

export interface ILinkedList<T> {
  append: (element: T) => void;
  addByIndex: (element: T, position: number) => void;
  deleteByIndex: (position: number) => void;
  getSize: () => number;
  prepend: (element: T) => void;
  toArray: () => T[];
  deleteHead: () => void;
  deleteTail: () => void;
}
