import { ElementStates } from "./element-states";

export interface IStackState<T> {
  item: T;
  state: ElementStates;
}

export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  getElements: () => T[];
}
