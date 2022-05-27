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
      char: "",
      state: ElementStates.Default,
    });
  }

  const [inputValue, setInputValue] = useState<string>("");
  const [arrayOfLetters, setArrayOfLetters] =
    useState<stringCharsProps[]>(basicState);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [headIdx, setHeadIdx] = useState(0);
  const [tailIdx, setTailIdx] = useState(0);

  console.log(headIdx, tailIdx);

  const sortAndWait = async (arr: stringCharsProps[]) => {
    setArrayOfLetters([...arr]);
    await waitForMe(SHORT_DELAY_IN_MS);
  };

  const enqueue = async () => {
    setAdding(true);
    const copyArr = [...arrayOfLetters];
    copyArr[tailIdx].char = inputValue;
    copyArr[tailIdx].state = ElementStates.Changing;
    await sortAndWait(copyArr);
    copyArr[tailIdx].state = ElementStates.Default;
    setTailIdx((prev) => prev + 1);
    setInputValue("");
    setAdding(false);
  };

  const dequeue = async () => {
    setDeleting(true);
    const copyArr = [...arrayOfLetters];
    copyArr[headIdx].state = ElementStates.Changing;
    await sortAndWait(copyArr);
    if (tailIdx - 1 === headIdx) {
      clear();
    } else {
      copyArr[headIdx].char = "";
      copyArr[headIdx].state = ElementStates.Default;
      setHeadIdx((prev) => prev + 1);
      setInputValue("");
    }
    setDeleting(false);
  };

  const clear = () => {
    setArrayOfLetters([...basicState]);
    setTailIdx(0);
    setHeadIdx(0);
    setInputValue("");
  };

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
          disabled={!inputValue || deleting || tailIdx > 6}
          isLoader={adding}
          text="Добавить"
          type="button"
          onClick={() => enqueue()}
        />
        <Button
          isLoader={deleting}
          disabled={adding || tailIdx === 0}
          text="Удалить"
          type="button"
          onClick={() => dequeue()}
        />
        <Button
          extraClass={styles.resetButton}
          disabled={adding || deleting || tailIdx === 0}
          text="Очистить"
          type="button"
          onClick={() => clear()}
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
              head={tailIdx !== 0 && idx === headIdx ? "head" : ""}
              tail={idx === tailIdx - 1 ? "tail" : ""}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
