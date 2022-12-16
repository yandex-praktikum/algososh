import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [circleLetters, setCircleLetters] = useState<string[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

  const getFibonacciNumbers = (num: number): string[] => {
    let arr: number[] = [0, 1];
    for (let i = 2; i < num + 1; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr.map((num) => num.toString());
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (parseInt(e.target.value) <= 19) {
      setButtonIsDisabled(false);
    } else {
      setButtonIsDisabled(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let numInputValue = Number(inputValue);

    setIsLoader(true);

    const arrForRender: string[] = [];
    let counter: number = 0;
    const array = getFibonacciNumbers(numInputValue);

    const interval = setInterval(() => {
      arrForRender.push(array[counter]);
      setCircleLetters([...arrForRender]);

      counter++;

      if (array.length - 1 === arrForRender.length - 1) {
        clearInterval(interval);
        setIsLoader(false);
      }
    }, 500);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.mainContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            maxLength={19}
            type="text"
            isLimitText={true}
            value={inputValue.replace(/\D/g, "")}
            onInput={handleInput}
          />
          <Button
            text="Рассчитать"
            type="submit"
            isLoader={isLoader}
            disabled={buttonIsDisabled}
          />
        </form>
        <div className={styles.circlesWrapper}>
          {circleLetters.map((letter, i) => {
            return <Circle letter={letter} key={i} index={i}></Circle>;
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
