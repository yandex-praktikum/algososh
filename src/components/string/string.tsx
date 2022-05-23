import React, { useRef, useState } from "react";
import { swapChars } from "../../algorythms-toolkit/toolkit";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { stringCharsProps } from "../../types/types";
import { waitForMe } from "../../utils/utils";
import { InputContainer } from "../input-container/input-container";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [arrayOfLetters, setArrayOfLetters] = useState<stringCharsProps[]>([]);
  const [inProgress, setInProgress] = useState(false);

  const swapWithAnimation = async (string: string) => {
    // Блочим кнопку
    setInProgress(true)
    // Создание массива объектов на основе строки и начальный рендер
    const arrayOfChars: stringCharsProps[] = [];
    string.split("").forEach((el) => {
      arrayOfChars.push({ char: el, state: ElementStates.Default });
    });
    setArrayOfLetters([...arrayOfChars]);
    await waitForMe();
    // Инициализация счётчиков и начало цикла
    let startIdx = 0;
    let endIdx = arrayOfChars.length - 1;
    while (endIdx >= startIdx) {
      // Если всего один кржуок - сразу меняем его стейт на "Modified" - свап не нужен
      if (endIdx === startIdx) {
        arrayOfChars[startIdx].state = ElementStates.Modified;
        setArrayOfLetters([...arrayOfChars]);
        await waitForMe(SHORT_DELAY_IN_MS);
        // Разблочим кнопку
        setInProgress(false)
      // В противном случае делаем обычный свап
      } else {
        // Меняем стейт кружков на "Changing"
        arrayOfChars[startIdx].state = ElementStates.Changing;
        arrayOfChars[endIdx].state = ElementStates.Changing;
        setArrayOfLetters([...arrayOfChars]);
        await waitForMe(SHORT_DELAY_IN_MS);
        // Меняем местами выбранные кружки
        swapChars(arrayOfChars, startIdx, endIdx);
        // Меняем стейт кружков на "Modified"
        arrayOfChars[startIdx].state = ElementStates.Modified;
        arrayOfChars[endIdx].state = ElementStates.Modified;
        setArrayOfLetters([...arrayOfChars]);
        await waitForMe(SHORT_DELAY_IN_MS);
        // Изменение индексов
        startIdx++;
        endIdx--;
      }
    }
    // Разблочим кнопку
    setInProgress(false)
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
          onClick={() => swapWithAnimation(inputValue)}
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
