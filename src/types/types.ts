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