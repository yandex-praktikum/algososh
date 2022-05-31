import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { stringCharsProps } from "../../types/types";
import { InputContainer } from "../input-container/input-container";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { Queue } from "./utils";

export const QueuePage: React.FC = () => {
  const maxNum = 5;

  const [inputValue, setInputValue] = useState<string>("");
  const [arrayOfLetters, setArrayOfLetters] =
    useState<stringCharsProps[]>([]);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [headIdx, setHeadIdx] = useState(0);
  const [tailIdx, setTailIdx] = useState(0);

  const QueueMethods = new Queue(
    setAdding,
    setDeleting,
    setArrayOfLetters,
    setTailIdx,
    setHeadIdx,
    setInputValue,
    arrayOfLetters,
    inputValue,
    tailIdx,
    headIdx
  );

  useEffect(() => {
    QueueMethods.initialize()
  }, [])

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
          disabled={!inputValue || deleting || tailIdx > maxNum}
          isLoader={adding}
          text="Добавить"
          type="button"
          onClick={() => QueueMethods.enqueue()}
        />
        <Button
          isLoader={deleting}
          disabled={adding || tailIdx === 0}
          text="Удалить"
          type="button"
          onClick={() => QueueMethods.dequeue()}
        />
        <Button
          extraClass={styles.resetButton}
          disabled={adding || deleting || tailIdx === 0}
          text="Очистить"
          type="button"
          onClick={() => QueueMethods.clear()}
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
