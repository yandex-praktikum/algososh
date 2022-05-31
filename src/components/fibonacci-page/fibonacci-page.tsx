import React, { useState } from "react";
import { fibIterative } from "../../algorythms-toolkit/toolkit";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";
import { InputContainer } from "../input-container/input-container";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";


export const FibonacciPage: React.FC = () => {
  const maxLength = 19;
  const [inputValue, setInputValue] = useState<number>();
  const [arrayOfNumbers, setArrayOfNumbers] = useState<number[]>([]);
  const [inProgress, setInProgress] = useState(false);

   const renderFib = async () => {
    setInputValue(0);
    // Блочим кнопку
    setInProgress(true);
    // Копируем последовательность в массив
    const fiboCopy = [...fibIterative(inputValue! + 1)];
    // Создаём массив куда постепенно будем помещать числа
    const inCycleArray: number[] = [];
    // Постепенно помещаем числа и копируем их в стейт
    for (let el of fiboCopy) {
      await delay(SHORT_DELAY_IN_MS);
      inCycleArray.push(el);
      setArrayOfNumbers([...inCycleArray]);
    }
    // Деблочим кнопку
    setInProgress(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <InputContainer>
        <Input
          placeholder="Введите число от 1 до 20"
          isFib={true}
          min={1}
          value={inputValue || ""}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setInputValue(Number(e.currentTarget.value.replace(/[^0-9]/g, "")))
          }
          isLimitText={true}
          maxLength={2}
          max={maxLength}
        />
        <Button
          disabled={inputValue ? inputValue > maxLength : true}
          isLoader={inProgress}
          text="Развернуть"
          type="submit"
          onClick={() =>
            inputValue &&
            renderFib()
          }
        />
      </InputContainer>
      <ul className={styles.fibList}>
        {arrayOfNumbers.map((num, idx) => {
          return <Circle letter={num.toString()} key={idx} index={idx} />;
        })}
      </ul>
    </SolutionLayout>
  );
};
