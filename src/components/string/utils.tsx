import { swapElements } from "../../algorythms-toolkit/toolkit";

export const swapString = (
  string: string,
  step?: number
): { resultArray: string[]; numberOfSteps: number } => {
  let stepCounter = 0;
  const arrayOfChars: string[] = [];
  string.split("").forEach((el) => arrayOfChars.push(el));
  let startIdx = 0;
  let endIdx = arrayOfChars.length - 1;
  while (endIdx >= startIdx) {
    if (step && step === stepCounter) break;
    swapElements(arrayOfChars, startIdx, endIdx);
    startIdx++;
    endIdx--;
    stepCounter++;
  }
  return { resultArray: arrayOfChars, numberOfSteps: stepCounter };
};
