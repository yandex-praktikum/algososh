import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { stringCharsProps } from "../../types/types";
import { delay } from "../../utils/utils";

const sortAndWait = async (
  arr: stringCharsProps[],
  setArrayOfLetters: React.Dispatch<React.SetStateAction<stringCharsProps[]>>
) => {
  setArrayOfLetters([...arr]);
  await delay(SHORT_DELAY_IN_MS);
};

export const enqueue = async (
  setAdding: React.Dispatch<React.SetStateAction<boolean>>,
  setArrayOfLetters: React.Dispatch<React.SetStateAction<stringCharsProps[]>>,
  setTailIdx: React.Dispatch<React.SetStateAction<number>>,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  arrayOfLetters: stringCharsProps[],
  inputValue: string,
  tailIdx: number
) => {
  setAdding(true);
  const copyArr = [...arrayOfLetters];
  copyArr[tailIdx].char = inputValue;
  copyArr[tailIdx].state = ElementStates.Changing;
  await sortAndWait(copyArr, setArrayOfLetters);
  copyArr[tailIdx].state = ElementStates.Default;
  setTailIdx((prev) => prev + 1);
  setInputValue("");
  setAdding(false);
};

export const clear = (
  setArrayOfLetters: React.Dispatch<React.SetStateAction<stringCharsProps[]>>,
  basicState: stringCharsProps[],
  setHeadIdx: React.Dispatch<React.SetStateAction<number>>,
  setTailIdx: React.Dispatch<React.SetStateAction<number>>,
  setInputValue: React.Dispatch<React.SetStateAction<string>>
) => {
  setArrayOfLetters([...basicState]);
  setTailIdx(0);
  setHeadIdx(0);
  setInputValue("");
};

export const dequeue = async (
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>,
  setArrayOfLetters: React.Dispatch<React.SetStateAction<stringCharsProps[]>>,
  setHeadIdx: React.Dispatch<React.SetStateAction<number>>,
  setTailIdx: React.Dispatch<React.SetStateAction<number>>,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  basicState: stringCharsProps[],
  arrayOfLetters: stringCharsProps[],
  tailIdx: number,
  headIdx: number
) => {
  setDeleting(true);
  const copyArr = [...arrayOfLetters];
  copyArr[headIdx].state = ElementStates.Changing;
  await sortAndWait(copyArr, setArrayOfLetters);
  if (tailIdx - 1 === headIdx) {
    clear(setArrayOfLetters, basicState, setHeadIdx, setTailIdx, setInputValue);
  } else {
    copyArr[headIdx].char = "";
    copyArr[headIdx].state = ElementStates.Default;
    setHeadIdx((prev) => prev + 1);
    setInputValue("");
  }
  setDeleting(false);
};
