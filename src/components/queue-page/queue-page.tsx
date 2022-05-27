import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { stringCharsProps } from "../../types/types";
import { waitForMe } from "../../utils/utils";
import { InputContainer } from "../input-container/input-container";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";

export const QueuePage: React.FC = () => {
  const maxNum = 6;

  const basicState: stringCharsProps[] = [];
  for (let i = 0; i <= maxNum; i++) {
    basicState.push({
      tail: "",
      head: "",
      char: "",
      state: ElementStates.Default,
    });
  }

  const [inputValue, setInputValue] = useState<string>("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [arrayOfLetters, setArrayOfLetters] =
    useState<stringCharsProps[]>(basicState);
  const [inProgress, setInProgress] = useState(false);
  const [headIdx, setHeadIdx] = useState(0);
  const [tailIdx, setTailIdx] = useState(0);

  const sortAndWait = async (arr: stringCharsProps[]) => {
    setArrayOfLetters([...arr]);
    await waitForMe(SHORT_DELAY_IN_MS);
  };

  const enqueue = async () => {
    const copyArr = [...basicState];
    setArrayOfLetters([...copyArr]);
    copyArr[tailIdx] = {
      ...copyArr[tailIdx],
      char: inputValue,
      tail: "tail",
    };
    copyArr[headIdx] = {
      ...copyArr[headIdx],
      head: "head",
    };
    arrayOfLetters[tailIdx].state = ElementStates.Changing;
    await sortAndWait(copyArr);
    arrayOfLetters[tailIdx].state = ElementStates.Default;
    await sortAndWait(copyArr);
    setInputValue("");
    setTailIdx((prev) => prev + 1);
  };

  const dequeue = () => {};

  return (
    <SolutionLayout title="Очередь">
      <InputContainer>
        <Input
          placeholder="Введите значение"
          min={1}
          value={inputValue || ""}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setInputValue(e.currentTarget.value)
          }
          isLimitText={true}
          maxLength={4}
        />
        <Button
          disabled={!inputValue || tailIdx > 6}
          isLoader={inProgress}
          text="Добавить"
          type="button"
          onClick={() => enqueue()}
        />
        <Button
          isLoader={inProgress}
          disabled={false}
          text="Удалить"
          type="button"
          onClick={() => dequeue()}
        />
        <Button
          isLoader={inProgress}
          extraClass={styles.resetButton}
          disabled={false}
          text="Очистить"
          type="button"
          onClick={() => {
            setArrayOfLetters([...basicState]);
            setIsEmpty(true);
          }}
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
              tail={char.tail}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
