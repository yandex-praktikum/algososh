import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { stringCharsProps } from "../../types/types";
import { waitForMe } from "../../utils/utils";
import { InputContainer } from "../input-container/input-container";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [arrayOfLetters, setArrayOfLetters] = useState<stringCharsProps[]>([]);
  const [pushing, setPushing] = useState(false);
  const [popping, setPopping] = useState(false);

  const push = async () => {
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
    await waitForMe(SHORT_DELAY_IN_MS);
    arrayOfLetters[arrayOfLetters.length - 1].state = ElementStates.Default;
    setArrayOfLetters([...arrayOfLetters]);
    setPushing(false);
  };

  const pop = async () => {
    setPopping(true);
    if (arrayOfLetters.length > 1) {
      arrayOfLetters.pop();
      setArrayOfLetters([...arrayOfLetters]);
      await waitForMe(SHORT_DELAY_IN_MS);
      arrayOfLetters[arrayOfLetters.length - 1].state = ElementStates.Changing;
      arrayOfLetters[arrayOfLetters.length - 1].head = "top";
      setArrayOfLetters([...arrayOfLetters]);
    } else setArrayOfLetters([]);
    setPopping(false);
  };

  return (
    <SolutionLayout title="Стек">
      <InputContainer>
        <Input
          placeholder="Введите текст"
          min={1}
          value={inputValue || ""}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setInputValue(e.currentTarget.value)
          }
          isLimitText={true}
          maxLength={4}
        />
        <Button
          disabled={!inputValue || popping || arrayOfLetters.length > 12}
          isLoader={pushing}
          text="Добавить"
          type="button"
          onClick={() => push()}
        />
        <Button
          isLoader={popping}
          disabled={!arrayOfLetters.length || pushing}
          text="Удалить"
          type="button"
          onClick={() => pop()}
        />
        <Button
          extraClass={styles.resetButton}
          disabled={!arrayOfLetters.length || pushing || popping}
          text="Очистить"
          type="button"
          onClick={() => setArrayOfLetters([])}
        />
      </InputContainer>
      <ul className={styles.circleList}>
        {arrayOfLetters.map((char, idx) => {
          return (
            <Circle
              state={char.state}
              letter={char.char}
              index={idx}
              key={idx}
              head={char.head}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
