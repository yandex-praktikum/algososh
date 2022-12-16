import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./queue-page.module.css";
import { Queue } from "./queue";
import { IQueue } from "./queue-page.types";

const queue = new Queue<IQueue>(7);

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [circleLetters, setCircleLetters] = useState<IQueue[]>([]);

  useEffect(() => {
    setCircleLetters(queue.elements);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    queue.clearTail();

    queue.enqueue(inputValue);
    setCircleLetters(queue.elements);
    setInputValue("");

    setTimeout(() => {
      queue.setAllCirclesDefault();
      setCircleLetters(queue.elements);
    }, 500);

    // queue.clearTail();
    setCircleLetters(queue.elements);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    queue.setCircleChanging();
    setCircleLetters(queue.elements);

    setTimeout(() => {
      queue.dequeue();
      setCircleLetters(queue.elements);
      queue.setNewHead();
      setCircleLetters(queue.elements);
    }, 500);
  };

  const hadleClearClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    queue.clear();
    setCircleLetters(queue.elements);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.mainContainer}>
        <form className={styles.form}>
          <Input
            maxLength={4}
            type="text"
            isLimitText={true}
            placeholder="Введите значение"
            value={inputValue.replace(/\D/g, "")}
            onInput={handleInput}
          />
          <Button
            text="Добавить"
            disabled={!inputValue}
            onClick={handleAddClick}
          />
          <Button
            text="Удалить"
            disabled={!inputValue && queue.isEmpty}
            onClick={handleDeleteClick}
          />
          <Button
            text="Очистить"
            disabled={!inputValue && queue.isEmpty}
            onClick={hadleClearClick}
          />
        </form>
        <div className={styles.circlesWrapper}>
          {circleLetters.map((letter, i) => {
            return (
              <Circle
                state={letter?.state}
                letter={letter?.item}
                key={i}
                index={i}
                head={letter?.head}
                tail={letter?.tail}
              ></Circle>
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
