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