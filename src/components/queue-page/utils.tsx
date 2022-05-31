import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { stringCharsProps } from "../../types/types";
import { delay } from "../../utils/utils";

export class Queue {
  setAdding: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  setArrayOfLetters: React.Dispatch<React.SetStateAction<stringCharsProps[]>>;
  setTailIdx: React.Dispatch<React.SetStateAction<number>>;
  setHeadIdx: React.Dispatch<React.SetStateAction<number>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  arrayOfLetters: stringCharsProps[];
  inputValue: string;
  tailIdx: number;
  headIdx: number;
  basicState: stringCharsProps[];

  constructor(
    setAdding: React.Dispatch<React.SetStateAction<boolean>>,
    setDeleting: React.Dispatch<React.SetStateAction<boolean>>,
    setArrayOfLetters: React.Dispatch<React.SetStateAction<stringCharsProps[]>>,
    setTailIdx: React.Dispatch<React.SetStateAction<number>>,
    setHeadIdx: React.Dispatch<React.SetStateAction<number>>,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    arrayOfLetters: stringCharsProps[],
    inputValue: string,
    tailIdx: number,
    headIdx: number
  ) {
    this.setAdding = setAdding;
    this.setDeleting = setDeleting;
    this.setArrayOfLetters = setArrayOfLetters;
    this.setTailIdx = setTailIdx;
    this.setHeadIdx = setHeadIdx;
    this.setInputValue = setInputValue;
    this.arrayOfLetters = arrayOfLetters;
    this.inputValue = inputValue;
    this.tailIdx = tailIdx;
    this.headIdx = headIdx;
    this.basicState = Array.from({ length: 6 }, () => ({
      char: ``,
      state: ElementStates.Default,
    }));
  }

  initialize = () => {
    this.setArrayOfLetters([...this.basicState])
  }

  sortAndWait = async (arr: stringCharsProps[]) => {
    this.setArrayOfLetters([...arr]);
    await delay(SHORT_DELAY_IN_MS);
  };

  enqueue = async () => {
    this.setAdding(true);
    const copyArr = [...this.arrayOfLetters];
    copyArr[this.tailIdx].char = this.inputValue;
    copyArr[this.tailIdx].state = ElementStates.Changing;
    await this.sortAndWait(copyArr);
    copyArr[this.tailIdx].state = ElementStates.Default;
    this.setTailIdx((prev) => prev + 1);
    this.setInputValue("");
    this.setAdding(false);
  };

  clear = () => {
    this.setArrayOfLetters([...this.basicState]);
    this.setTailIdx(0);
    this.setHeadIdx(0);
    this.setInputValue("");
  };

  dequeue = async () => {
    this.setDeleting(true);
    const copyArr = [...this.arrayOfLetters];
    copyArr[this.headIdx].state = ElementStates.Changing;
    await this.sortAndWait(copyArr);
    if (this.tailIdx - 1 === this.headIdx) {
      this.clear();
    } else {
      copyArr[this.headIdx].char = "";
      copyArr[this.headIdx].state = ElementStates.Default;
      this.setHeadIdx((prev) => prev + 1);
      this.setInputValue("");
    }
    this.setDeleting(false);
  };
}

/*
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

const sortAndWait = async (
  arr: stringCharsProps[],
  setArrayOfLetters: React.Dispatch<React.SetStateAction<stringCharsProps[]>>
) => {
  setArrayOfLetters([...arr]);
  await delay(SHORT_DELAY_IN_MS);
};
*/
