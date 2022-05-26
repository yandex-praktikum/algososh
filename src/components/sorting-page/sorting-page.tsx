import React, { useState } from "react";
import { InputContainer } from "../input-container/input-container";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { columnObject, radioButtonState } from "../../types/types";
import { ElementStates } from "../../types/element-states";
import { swapChars, swapNums } from "../../algorythms-toolkit/toolkit";
import { waitForMe } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [arrayToSort, setArrayToSort] = useState<columnObject[]>([]);
  const [checked, setChecked] = useState<radioButtonState>("selection");
  const [inProgress, setInProgress] = useState(false);
  const [ascendingRunning, setAscendingRunning] = useState(false);
  const [descendingRunning, setDescendingRunning] = useState(false);

  const generateArray = () => {
    const arr: columnObject[] = [];
    const size = Math.random() * (17 - 3) + 3;
    while (arr.length < size) {
      arr.push({
        num: Math.floor(Math.random() * 100) + 1,
        state: ElementStates.Default,
      });
    }
    setArrayToSort([...arr]);
  };

  const selectionSort = async (mode: "ascending" | "descending") => {
    // Лочим кнопки
    setInProgress(true);
    mode === "ascending"
      ? setAscendingRunning(true)
      : setDescendingRunning(true);

    const sortAndWait = async () => {
      setArrayToSort([...arr]);
      await waitForMe(SHORT_DELAY_IN_MS);
    };

    //Копируем массив из стейта и делаем все элементы дефолтными
    const arr = [...arrayToSort];
    arr.forEach(el => el.state = ElementStates.Default)
    setArrayToSort([...arr]);
    // Начинаем цикл
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      // Инициализация счётчика
      let swapInd = i;
      // Подсвечиваем элемент рыжим, который будет отсортирован
      arr[i].state = ElementStates.Chosen;
      await sortAndWait();
      // Начинаем цикл по оставшимся элементам
      for (let j = i + 1; j < length; j++) {
        // Подсвечиваем кандидата на свап фиолетовым
        arr[j].state = ElementStates.Changing;
        await sortAndWait();
        if (
          (mode === "ascending" ? arr[swapInd].num : arr[j].num) >
          (mode === "ascending" ? arr[j].num : arr[swapInd].num)
        ) {
          // Если кандидат больше (меньше) текущего экстремума - то мы нашли второй элемент на свап,
          // подсвечиваем его рыжим, а старого кандидата либо делаем дефолтным,
          // либо оставляем рыжим (если это i-й элемент, для которого мы ищем кандидата)
          arr[j].state = ElementStates.Chosen;
          arr[swapInd].state =
            i === swapInd ? ElementStates.Chosen : ElementStates.Default;
            swapInd = j;
          await sortAndWait();
        }
        // После визуальной сортировки меняем цвет текущего элемента, но не
        // рисуем его (не сортируем массив) он будет отрисован на следующем шаге
        arr[j].state =
        swapInd === j ? ElementStates.Chosen : ElementStates.Default;
      }
      // Если сортируемый элемент сам является экстремумом - рисуем его как "modified"
      if (i === swapInd) {
        arr[i].state = ElementStates.Modified;
        await sortAndWait();
      }
      // В противном случае нужен свап и замена цветов (нужно 2 рендера)
      else {
        swapNums(arr, i, swapInd);
        await sortAndWait();
        arr[i].state = ElementStates.Modified;
        arr[swapInd].state = ElementStates.Default;
        await sortAndWait();
      }
    }
    // Анлочим кнопки
    setInProgress(false);
    mode === "ascending"
      ? setAscendingRunning(false)
      : setDescendingRunning(false);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <InputContainer>
          <div className={styles.radioContainer}>
            <RadioInput
              disabled={inProgress}
              checked={checked === "selection"}
              onChange={() => setChecked("selection")}
              value="selection"
              label="Выбор"
            />
            <RadioInput
              disabled={inProgress}
              checked={checked === "bubble"}
              onChange={() => setChecked("bubble")}
              value="bubble"
              label="Пузырёк"
            />
          </div>
          <div className={styles.buttonsContainer}>
            <Button
              sorting={Direction.Ascending}
              disabled={inProgress}
              isLoader={ascendingRunning}
              text="По возрастанию"
              type="submit"
              onClick={() => selectionSort("ascending")}
            />
            <Button
              sorting={Direction.Descending}
              disabled={inProgress}
              isLoader={descendingRunning}
              text="По убыванию"
              type="submit"
              onClick={() => selectionSort("descending")}
            />
          </div>
          <Button
            disabled={inProgress}
            isLoader={false}
            text="Новый массив"
            type="submit"
            onClick={() => generateArray()}
          />
        </InputContainer>
        <ul className={styles.columnList}>
          {arrayToSort.map((column, idx) => {
            return <Column index={column.num} state={column.state} key={idx} />;
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
