import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./queue-page.module.css";
import { Queue } from "./Queue";
import { IQueue } from "./queue-page.types";

const queue = new Queue<IQueue>(7);

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [circleLetters, setCircleLetters] = useState<IQueue[]>([]);
  const [isLoader, setIsLoader] = useState({
    addBtn: false,
    deleteBtn: false,
    clearBtn: false,
  });

  useEffect(() => {
    setCircleLetters(queue.elements);
  }, []);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleAddClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setIsLoader({ addBtn: true, deleteBtn: false, clearBtn: false });
    queue.clearTail();

    queue.enqueue(inputValue);
    setCircleLetters(queue.elements);
    setInputValue("");

    setTimeout(() => {
      queue.setAllCirclesDefault();
      setCircleLetters(queue.elements);
      setIsLoader({ addBtn: false, deleteBtn: false, clearBtn: false });
    }, 1000);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoader({ addBtn: false, deleteBtn: true, clearBtn: false });

    queue.setCircleChanging();
    setCircleLetters(queue.elements);

    setTimeout(() => {
      queue.dequeue();
      setCircleLetters(queue.elements);
      queue.setNewHead();
      setCircleLetters(queue.elements);
      setIsLoader({ addBtn: false, deleteBtn: false, clearBtn: false });
    }, 1000);
  };

  const hadleClearClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoader({ addBtn: false, deleteBtn: false, clearBtn: true });
    queue.clear();
    setCircleLetters(queue.elements);
    setIsLoader({ addBtn: false, deleteBtn: false, clearBtn: false });
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.mainContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
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
            isLoader={isLoader.addBtn}
          />
          <Button
            text="Удалить"
            disabled={!inputValue && queue.isEmpty}
            onClick={handleDeleteClick}
            isLoader={isLoader.deleteBtn}
          />
          <Button
            text="Очистить"
            disabled={!inputValue && queue.isEmpty}
            onClick={hadleClearClick}
            isLoader={isLoader.clearBtn}
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
