import { IStringColumnStateProps } from "../types/column-string-state";
import { ElementStates } from "../types/element-states";
import { swap } from "./utils";
export function reverseStringBySteps(input: string) {
  let arr = input.split("");
  let steps: string[][] = [[...arr]];

  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    const mirrorElement = arr.length - 1 - i;
    swap(arr, i, mirrorElement);
    steps.push([...arr]);
  }
  return steps;
}

export function getStringColumnState({
  index,
  steps,
  currentStepIndex,
}: IStringColumnStateProps) {
  const maxIndex = steps[currentStepIndex].length - 1;

  if (
    index < currentStepIndex ||
    index > maxIndex - currentStepIndex ||
    currentStepIndex === steps.length - 1
  ) {
    return ElementStates.Modified;
  }

  if (index === currentStepIndex || index === maxIndex - currentStepIndex) {
    return ElementStates.Changing;
  }

  return ElementStates.Default;
}
