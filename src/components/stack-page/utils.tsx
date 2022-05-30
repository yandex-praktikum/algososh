import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { stringCharsProps } from "../../types/types";
import { delay } from "../../utils/utils";

export interface IStack<stringCharsProps> {
  push: (
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    setPushing: React.Dispatch<React.SetStateAction<boolean>>,
    setArrayOfLetters: React.Dispatch<React.SetStateAction<stringCharsProps[]>>,
    arrayOfLetters: stringCharsProps[],
    inputValue: string
  ) => void;
  pop: (
    setPopping: React.Dispatch<React.SetStateAction<boolean>>,
    setArrayOfLetters: React.Dispatch<React.SetStateAction<stringCharsProps[]>>,
    arrayOfLetters: stringCharsProps[]
  ) => void;
}

export class Stack<T> implements IStack<stringCharsProps> {

  push = async (
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

  pop = async (
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
  };
}

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
};
