import { ElementStates } from "./element-states";

export interface stringCharsProps {
  tail?: string;
  head?: string;
  char?: string;
  state: ElementStates;
}

export interface columnObject {
  num: number;
  state: ElementStates;
}

export type radioButtonState = "selection" | "bubble";
