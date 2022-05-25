import { ElementStates } from "./element-states";

export interface stringCharsProps {
  char: string;
  state: ElementStates;
}

export interface columnObject {
  num: number;
  state: ElementStates;
}

export type radioButtonState = 'selection' | 'bubble'

