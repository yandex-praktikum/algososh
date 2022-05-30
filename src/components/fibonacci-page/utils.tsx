import { fibIterative } from "../../algorythms-toolkit/toolkit";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";

export const renderFib = async (
  number: number,
  setInputValue: React.Dispatch<React.SetStateAction<number | undefined>>,
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setArrayOfNumbers: React.Dispatch<React.SetStateAction<number[]>>
) => {
  setInputValue(0);
  // Блочим кнопку
  setInProgress(true);
  // Копируем последовательность в массив
  const fiboCopy = [...fibIterative(number + 1)];
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
