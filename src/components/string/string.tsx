import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { stringCharsProps } from "../../types/types";
import { delay } from "../../utils/utils";
import { InputContainer } from "../input-container/input-container";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { swapString } from "./utils";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [arrayOfLetters, setArrayOfLetters] = useState<stringCharsProps[]>([]);
  const [inProgress, setInProgress] = useState(false);

  const swapStringBySteps = async () => {
    setInputValue("");
    // Блочим кнопку
    setInProgress(true);
    // Рендерим строку от пользователя
    const arrayOfChars: stringCharsProps[] = [];
    inputValue.split("").forEach((el) => {
      arrayOfChars.push({ char: el, state: ElementStates.Default });
    });
    setArrayOfLetters([...arrayOfChars]);
    await delay();
    // Свапаем строку и сохраняем готовый результат
    const numberOfSteps: number = swapString(inputValue).numberOfSteps;
    // Начинаем "шагать", имея готовый результат
    let step = 0;
    while (step !== numberOfSteps) {
      // Меняем стейт кружков на "Changing"
      arrayOfChars[step].state = ElementStates.Changing;
      arrayOfChars[inputValue.length - (step + 1)].state = ElementStates.Changing;
      setArrayOfLetters([...arrayOfChars]);
      await delay(SHORT_DELAY_IN_MS);
      // Получаем нужный массив для нужного шага и
      swapString(inputValue, step + 1).resultArray.forEach((el, idx) => {
        arrayOfChars[idx].char = el
      })
      // меняем стейты кружков текущего шага - потом рендерим
      arrayOfChars[step].state = ElementStates.Modified;
      arrayOfChars[inputValue.length - (step + 1)].state = ElementStates.Modified;
      setArrayOfLetters([...arrayOfChars]);
      await delay(SHORT_DELAY_IN_MS);
      // инкрементируем шаг
      step++
    }
    // Aнблочим кнопку
    setInProgress(false);
  };

  return (
    <SolutionLayout title="Строка">
      <InputContainer>
        <Input
          value={inputValue}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setInputValue(e.currentTarget.value)
          }
          isLimitText={true}
          maxLength={11}
        />
        <Button
          disabled={!inputValue}
          isLoader={inProgress}
          text="Развернуть"
          type="submit"
          onClick={() => swapStringBySteps()}
        />
      </InputContainer>
      <ul className={styles.circleList}>
        {arrayOfLetters.map((char, idx) => {
          return <Circle state={char.state} letter={char.char} key={idx} />;
        })}
      </ul>
    </SolutionLayout>
  );
};
