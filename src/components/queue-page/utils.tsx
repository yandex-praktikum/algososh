import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { stringCharsProps } from "../../types/types";
import { delay } from "../../utils/utils";

interface INode<T> {
  value: T;
  next: null | INode<T>;
}

export interface IQueue<T> {
  enqueue: (value: T) => void;
  dequeue: () => void;
  getHead: () => { value: T | null; index: number } ;
  getTail: () => { value: T | null; index: number } ;
}

class Node<T> implements INode<T> {
  value: T;
  next: null | INode<T>;
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  head: number = 0;
  tail: number = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue(item: T) {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail] = item;
    this.tail++;
    this.length++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head] = null;
    this.head++;
    this.length--;
  }

  getHead = (): { value: T | null; index: number } => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return { value: this.container[this.head], index: this.head };
  };

  getTail = (): { value: T | null; index: number } => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return { value: this.container[this.tail-1], index: this.tail-1 };
  };

  isEmpty = () => this.length === 0;
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
