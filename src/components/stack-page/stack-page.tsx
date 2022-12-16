import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./Stack";
import { ElementStates } from "../../types/element-states";

const stack = new Stack();

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [circleLetters, setCircleLetters] = useState<
    { item: string; state: ElementStates }[]
  >([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    stack.push({ item: inputValue, state: ElementStates.Changing });
    setCircleLetters(stack.elements);
    setTimeout(() => {
      stack.setAllCirclesDefault();
      setCircleLetters(stack.elements);
    }, 500);

    setInputValue("");
  };

  const handleDeleteItemClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    stack.setLastElementChanging();
    setCircleLetters(stack.elements);

    setTimeout(() => {
      stack.pop();
      setCircleLetters(stack.elements);
    }, 500);
  };

  const handleClearStackClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    stack.clear();
    setCircleLetters(stack.elements);
  };

  return (
    <SolutionLayout title="Стек">
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
            onClick={handleAddClick}
            disabled={!inputValue}
          />
          <Button
            text="Удалить"
            onClick={handleDeleteItemClick}
            disabled={circleLetters.length === 0}
          />
          <Button
            text="Очистить"
            onClick={handleClearStackClick}
            disabled={circleLetters.length === 0}
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
