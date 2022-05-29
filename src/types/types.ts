import { ElementStates } from "./element-states";

export interface stringCharsProps {
  adding?: boolean;
  deleting?: boolean;
  tail?: string;
  head?: string;
  char?: string;
  state: ElementStates;
  extraCircle?: {
    char: string;
  }
}

export interface columnObject {
  num: number;
  state: ElementStates;
}

export type radioButtonState = "selection" | "bubble";
