import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { stringCharsProps } from "../../types/types";
import { delay } from "../../utils/utils";

export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  clear: () => void
}

export class Stack<T> implements IStack<T> {
  container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    let size = this.getSize();
    if (size) return this.container[size - 1];
    else return null;
  };

  getSize = () => this.container.length;

  clear = () => this.container.length = 0;
}

/*
export class Stack<T> {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setPopping: React.Dispatch<React.SetStateAction<boolean>>;
  setPushing: React.Dispatch<React.SetStateAction<boolean>>;
  setArrayOfLetters: React.Dispatch<React.SetStateAction<stringCharsProps[]>>;
  arrayOfLetters: stringCharsProps[];
  inputValue: string;

  constructor(
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    setPopping: React.Dispatch<React.SetStateAction<boolean>>,
    setPushing: React.Dispatch<React.SetStateAction<boolean>>,
    setArrayOfLetters: React.Dispatch<React.SetStateAction<stringCharsProps[]>>,
    arrayOfLetters: stringCharsProps[],
    inputValue: string
  ) {
    this.setInputValue = setInputValue;
    this.setPopping = setPopping;
    this.setPushing = setPushing;
    this.setArrayOfLetters = setArrayOfLetters;
    this.arrayOfLetters = arrayOfLetters;
    this.inputValue = inputValue;
  }

  push = async () => {
    this.setInputValue("");
    this.setPushing(true);
    this.arrayOfLetters.forEach((el) => {
      el.state = ElementStates.Default;
      el.head = "";
    });
    this.arrayOfLetters.push({
      char: this.inputValue,
      state: ElementStates.Default,
      head: "top",
    });
    this.setArrayOfLetters([...this.arrayOfLetters]);
    await delay(SHORT_DELAY_IN_MS);
    this.arrayOfLetters[this.arrayOfLetters.length - 1].state =
      ElementStates.Changing;
    this.setArrayOfLetters([...this.arrayOfLetters]);
    this.setPushing(false);
  };

  pop = async () => {
    this.setPopping(true);
    if (this.arrayOfLetters.length > 1) {
      this.arrayOfLetters.pop();
      this.setArrayOfLetters([...this.arrayOfLetters]);
      await delay(SHORT_DELAY_IN_MS);
      this.arrayOfLetters[this.arrayOfLetters.length - 1].state =
        ElementStates.Changing;
      this.arrayOfLetters[this.arrayOfLetters.length - 1].head = "top";
      this.setArrayOfLetters([...this.arrayOfLetters]);
    } else this.setArrayOfLetters([]);
    this.setPopping(false);
  };
}

/*
export const push = async (
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  setPushing: React.Dispatch<React.SetStateAction<boolean>>,
  setArrayOfLetters: React.Dispatch<React.SetStateAction<stringCharsProps[]>>,
  arrayOfLetters: stringCharsProps[],
  inputValue: string
) => {
  setInputValue("");
  setPushing(true);
  arrayOfLetters.forEach((el) => {
    el.state = ElementStates.Default;
    el.head = "";
  });
  arrayOfLetters.push({
    char: inputValue,
    state: ElementStates.Changing,
    head: "top",
  });
  setArrayOfLetters([...arrayOfLetters]);
  await delay(SHORT_DELAY_IN_MS);
  arrayOfLetters[arrayOfLetters.length - 1].state = ElementStates.Default;
  setArrayOfLetters([...arrayOfLetters]);
  setPushing(false);
};

export const pop = async (
  setPopping: React.Dispatch<React.SetStateAction<boolean>>,
  setArrayOfLetters: React.Dispatch<React.SetStateAction<stringCharsProps[]>>,
  arrayOfLetters: stringCharsProps[]
) => {
  setPopping(true);
  if (arrayOfLetters.length > 1) {
    arrayOfLetters.pop();
    setArrayOfLetters([...arrayOfLetters]);
    await delay(SHORT_DELAY_IN_MS);
    arrayOfLetters[arrayOfLetters.length - 1].state = ElementStates.Changing;
    arrayOfLetters[arrayOfLetters.length - 1].head = "top";
    setArrayOfLetters([...arrayOfLetters]);
  } else setArrayOfLetters([]);
  setPopping(false);
};*/
