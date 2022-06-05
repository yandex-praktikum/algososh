import React, { useEffect, useState } from "react";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { stringCharsProps } from "../../types/types";
import { delay } from "../../utils/utils";
import { InputContainer } from "../input-container/input-container";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { IQueue, Queue } from "./utils";

export const QueuePage: React.FC = () => {
  const maxNum = 6;

  const newQueue = new Queue<string>(maxNum);

  const basicState: stringCharsProps[] = Array.from({ length: maxNum }, () => ({
    char: "",
    state: ElementStates.Default,
  }));

  const [inputValue, setInputValue] = useState<string>("");
  const [arrayOfLetters, setArrayOfLetters] =
    useState<stringCharsProps[]>(basicState);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [queue, setQueue] = useState<IQueue<string>>(newQueue);
  const [headIdx, setHeadIdx] = useState<number | null>(null);
  const sortAndWait = async (arr: stringCharsProps[]) => {
    setArrayOfLetters([...arr]);
    await delay(SHORT_DELAY_IN_MS);
  };

  const enqueue = async () => {
    // Лочим кнопки, копируем массив
    setAdding(true);
    setInputValue("");
    const copyArr = [...arrayOfLetters];
    // Добавляем элемент в очередь
    queue.enqueue(inputValue);
    // Получаем новые голову и хвост из класса
    const newHead = queue.getHead();
    const newTail = queue.getTail();
    // обновляем массив для стейта - меняем голову
    copyArr[newHead.index].char = newHead.value!;
    copyArr[newHead.index].head = "head";
    setHeadIdx(newHead.index);
    // обнуляем старый хвост если надо
    if (newTail.index > 0) copyArr[newTail.index - 1].tail = "";
    // добавляем новый хвост
    copyArr[newTail.index].char = newTail.value!;
    copyArr[newTail.index].tail = "tail";
    copyArr[newTail.index].state = ElementStates.Changing;
    await sortAndWait(copyArr);
    copyArr[newTail.index].state = ElementStates.Default;
    // Анлочим кнопки
    setAdding(false);
  };

  const dequeue = async () => {
    // Лочим кнопки, копируем массив
    setDeleting(true);
    const copyArr = [...arrayOfLetters];
    // Проверяем, догнала ли голова хвост, если да - сброс
    const head = queue.getHead();
    const tail = queue.getTail();
    if (head.index === tail.index) clearQueue();
    else {
      // Удаляем элементы из головы очереди
      queue.dequeue();
      // Получаем новые голову и хвост из класса
      const newHead = queue.getHead();
      const newTail = queue.getTail();
      //если голова догнала хвост - сбрасываем

      // обнуляем старую голову если надо
      if (newHead.index > 0) {
        copyArr[newHead.index - 1].head = "";
        copyArr[newHead.index - 1].char = "";
      }
      // добавляем новую голову
      copyArr[newHead.index].char = newHead.value!;
      copyArr[newHead.index].head = "head";
      copyArr[newHead.index].state = ElementStates.Changing;
      await sortAndWait(copyArr);
      copyArr[newHead.index].state = ElementStates.Default;
    }
    // Анлочим кнопки
    setDeleting(false);
  };

  const clearQueue = () => {
    // всё сбрасываем
    const newQueue = new Queue<string>(maxNum);
    setQueue(newQueue);
    setHeadIdx(null);
    setArrayOfLetters([...basicState]);
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
          disabled={
            !inputValue ||
            deleting ||
            arrayOfLetters[arrayOfLetters.length - 1].char !== ""
          }
          isLoader={adding}
          text="Добавить"
          type="button"
          onClick={() => enqueue()}
        />
        <Button
          isLoader={deleting}
          disabled={adding || headIdx === null}
          text="Удалить"
          type="button"
          onClick={() => dequeue()}
        />
        <Button
          extraClass={styles.resetButton}
          disabled={adding || deleting || headIdx === null}
          text="Очистить"
          type="button"
          onClick={() => clearQueue()}
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
