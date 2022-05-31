import { swapElements } from "../../algorythms-toolkit/toolkit";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { stringCharsProps } from "../../types/types";
import { delay } from "../../utils/utils";

export const swapString = (
  string: string,
  step?: number
): { resultArray: string[]; numberOfSteps: number } => {
  let stepCounter = 0;
  const arrayOfChars: string[] = [];
  string.split("").forEach((el) => arrayOfChars.push(el));
  let startIdx = 0;
  let endIdx = arrayOfChars.length - 1;
  while (endIdx >= startIdx) {
    if (step && step === stepCounter) break;
    swapElements(arrayOfChars, startIdx, endIdx);
    startIdx++;
    endIdx--;
    stepCounter++;
  }
  return { resultArray: arrayOfChars, numberOfSteps: stepCounter };
};


  /*const swapWithAnimation = async () => {
    setInputValue("");
    // Блочим кнопку
    setInProgress(true);
    // Создание массива объектов на основе строки и начальный рендер
    const arrayOfChars: stringCharsProps[] = [];
    inputValue.split("").forEach((el) => {
      arrayOfChars.push({ char: el, state: ElementStates.Default });
    });
    setArrayOfLetters([...arrayOfChars]);
    await delay();
    // Инициализация счётчиков и начало цикла
    let startIdx = 0;
    let endIdx = arrayOfChars.length - 1;
    while (endIdx >= startIdx) {
      // Если всего один кржуок - сразу меняем его стейт на "Modified" - свап не нужен
      if (endIdx === startIdx) {
        arrayOfChars[startIdx].state = ElementStates.Modified;
        setArrayOfLetters([...arrayOfChars]);
        await delay(SHORT_DELAY_IN_MS);
        // Разблочим кнопку
        setInProgress(false);
        // В противном случае делаем обычный свап
      } else {
        // Меняем стейт кружков на "Changing"
        arrayOfChars[startIdx].state = ElementStates.Changing;
        arrayOfChars[endIdx].state = ElementStates.Changing;
        setArrayOfLetters([...arrayOfChars]);
        await delay(SHORT_DELAY_IN_MS);
        // Меняем местами выбранные кружки
        swapElements(arrayOfChars, startIdx, endIdx);
        // Меняем стейт кружков на "Modified"
        arrayOfChars[startIdx].state = ElementStates.Modified;
        arrayOfChars[endIdx].state = ElementStates.Modified;
        setArrayOfLetters([...arrayOfChars]);
        await delay(SHORT_DELAY_IN_MS);
        // Изменение индексов
        startIdx++;
        endIdx--;
      }
    }
    // Разблочим кнопку
    setInProgress(false);
  };*/
