import { Functions } from "./linkedList-functions";
import { Direction } from "./direction";
import { ElementStates } from "./element-states";
import { ButtonPositions } from "./button-positions";
import { SortingMethods } from "./sorting";
import type { TSortingResult, TReverseStringResult } from "./results";

export type { TSortingResult, TReverseStringResult };

export { Functions, Direction, ButtonPositions, ElementStates, SortingMethods };

export type TGetElementState = {
  itemIndex: number;
  startPosition: number;
  endPosition: number;
  isReversed: boolean;
  timerLaunched: boolean;
};

export type TSortingSteps<T> = {
  array: T[];
  current: number[];
  modified: number[];
}[];

export interface IRefStep {
  current?: number[];
  modified?: number;
}
