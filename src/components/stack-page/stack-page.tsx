import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { IStackItem, Stack } from "./Stack";
import { ElementStates } from "../../types/element-states";

const stack = new Stack<IStackItem>();

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [circleLetters, setCircleLetters] = useState<
    { item: string; state: ElementStates }[]
  >([]);
  const [isLoader, setIsLoader] = useState({
    addBtn: false,
    deleteBtn: false,
    clearBtn: false,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleAddClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoader({ addBtn: true, deleteBtn: false, clearBtn: false });

    stack.push({ item: inputValue, state: ElementStates.Changing });
    setCircleLetters(stack.elements);
    setTimeout(() => {
      stack.setAllCirclesDefault();
      setCircleLetters(stack.elements);
    }, 500);

    setInputValue("");
    setIsLoader({ addBtn: false, deleteBtn: false, clearBtn: false });
  };

  const handleDeleteItemClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoader({ addBtn: false, deleteBtn: true, clearBtn: false });

    stack.setLastElementChanging();
    setCircleLetters(stack.elements);

    setTimeout(() => {
      stack.pop();
      setCircleLetters(stack.elements);
    }, 500);
    setIsLoader({ addBtn: false, deleteBtn: false, clearBtn: false });
  };

  const handleClearStackClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoader({ addBtn: false, deleteBtn: false, clearBtn: true });

    stack.clear();
    setCircleLetters(stack.elements);
    setIsLoader({ addBtn: false, deleteBtn: false, clearBtn: false });
  };

  return (
    <SolutionLayout title="Стек">
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
            onClick={handleAddClick}
            disabled={!inputValue}
            isLoader={isLoader.addBtn}
          />
          <Button
            text="Удалить"
            onClick={handleDeleteItemClick}
            disabled={circleLetters.length === 0}
            isLoader={isLoader.deleteBtn}
          />
          <Button
            text="Очистить"
            onClick={handleClearStackClick}
            disabled={circleLetters.length === 0}
            isLoader={isLoader.clearBtn}
          />
        </form>
        <div className={styles.circlesWrapper}>
          {circleLetters.map((letter, i, arr) => {
            return (
              <Circle
                state={letter.state}
                letter={letter.item}
                key={i}
                index={i}
                head={arr.length - 1 === i ? "top" : ""}
              ></Circle>
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
