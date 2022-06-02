import React, { useEffect, useMemo, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { stringCharsProps } from "../../types/types";
import { delay } from "../../utils/utils";
import { InputContainer } from "../input-container/input-container";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { IStack, Stack } from "./utils";

export const StackPage: React.FC = () => {
  const exampleStack = new Stack<string>();

  const [inputValue, setInputValue] = useState<string>("");
  const [arrayOfLetters, setArrayOfLetters] = useState<stringCharsProps[]>([]);
  const [pushing, setPushing] = useState(false);
  const [popping, setPopping] = useState(false);
  const [stack, setStack] = useState<IStack<string>>(exampleStack);

  const sortAndWait = async (arr: stringCharsProps[]) => {
    setArrayOfLetters([...arr]);
    await delay(SHORT_DELAY_IN_MS);
  };

  const pushAndRender = async () => {
    // Лочим кнопки
    setPushing(true);
    setInputValue("");
    // Пушим элемент и сохраняем измененный стек в стейт
    stack.push(inputValue);
    // Сбрасываем все кружки из стейта
    arrayOfLetters.forEach((el) => {
      el.state = ElementStates.Default;
      el.head = "";
    });
    // Достаем последний элемент из стека и пушим его в стейт
    const newElement = stack!.peak();
    arrayOfLetters.push({
      char: newElement ? newElement : "",
      state: ElementStates.Default,
    });
    await sortAndWait(arrayOfLetters);
    // Даём голове отметку
    arrayOfLetters[arrayOfLetters.length-1].head = "top";
    arrayOfLetters[arrayOfLetters.length-1].state = ElementStates.Changing;
    await sortAndWait(arrayOfLetters);
    // Анлочим кнопки
    setPushing(false);
    console.log(arrayOfLetters);
  };

  const popAndRender = async () => {
    // Лочим кнопки
    setPopping(true);
    // Удаляем элемент из стека
    stack!.pop();
    // Теперь пикáем, если элементов не осталось - рендерим пустой массив
    const size = stack.getSize();
    console.log(size);
    if (size !== 0) {
      arrayOfLetters.pop();
      setArrayOfLetters([...arrayOfLetters]);
      await delay(SHORT_DELAY_IN_MS);
      arrayOfLetters[arrayOfLetters.length - 1].state = ElementStates.Changing;
      arrayOfLetters[arrayOfLetters.length - 1].head = "top";
      setArrayOfLetters([...arrayOfLetters]);
    } else {
      setArrayOfLetters([]);
    }
    // Анлочим кнопки
    setPopping(false);
  };

  const clear = async () => {
    stack.clear();
    setArrayOfLetters([]);
  };

  return (
    <SolutionLayout title="Стек">
      <InputContainer>
        <Input
          placeholder="Введите текст"
          min={1}
          value={inputValue || ""}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setInputValue(e.currentTarget.value)
          }
          isLimitText={true}
          maxLength={4}
        />
        <Button
          disabled={!inputValue || popping || arrayOfLetters.length > 12}
          isLoader={pushing}
          text="Добавить"
          type="button"
          onClick={() => pushAndRender()}
        />
        <Button
          isLoader={popping}
          disabled={!arrayOfLetters.length || pushing}
          text="Удалить"
          type="button"
          onClick={() => popAndRender()}
        />
        <Button
          extraClass={styles.resetButton}
          disabled={!arrayOfLetters.length || pushing || popping}
          text="Очистить"
          type="button"
          onClick={() => clear()}
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
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
