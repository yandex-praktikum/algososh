import React from "react";
import { swapElements } from "../../algorythms-toolkit/toolkit";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { columnObject } from "../../types/types";
import { delay } from "../../utils/utils";

const sortAndWait = async (
  arr: columnObject[],
  setArrayToSort: React.Dispatch<React.SetStateAction<columnObject[]>>
) => {
  setArrayToSort([...arr]);
  await delay(SHORT_DELAY_IN_MS);
};

export const bubbleSort = async (
  mode: "ascending" | "descending",
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setAscendingRunning: React.Dispatch<React.SetStateAction<boolean>>,
  setDescendingRunning: React.Dispatch<React.SetStateAction<boolean>>,
  setArrayToSort: React.Dispatch<React.SetStateAction<columnObject[]>>,
  arrayToSort: columnObject[],
) => {
  // Лочим кнопки
  setInProgress(true);
  mode === "ascending" ? setAscendingRunning(true) : setDescendingRunning(true);
  //Копируем массив из стейта и делаем все элементы дефолтными
  const arr = [...arrayToSort];
  arr.forEach((el) => (el.state = ElementStates.Default));
  await sortAndWait(arr, setArrayToSort);
  // Начинаем цикл
  const { length } = arr;
  // Флаг свапа
  let swapped: boolean;
  do {
    swapped = false;
    for (let i = 0; i < length - 1; i++) {
      // Подсвечиваем выбранные элементы
      arr[i].state = ElementStates.Changing;
      arr[i + 1].state = ElementStates.Changing;
      await sortAndWait(arr, setArrayToSort);
      // Если один больше (меньше) другого - свапаем их
      if (
        (mode === "ascending" ? arr[i].num : arr[i + 1].num) >
        (mode === "ascending" ? arr[i + 1].num : arr[i].num)
      ) {
        arr[i].state = ElementStates.Chosen;
        arr[i + 1].state = ElementStates.Chosen;
        await sortAndWait(arr, setArrayToSort);
        swapElements(arr, i, i + 1);
        arr[i].state = ElementStates.Chosen;
        arr[i + 1].state = ElementStates.Chosen;
        await sortAndWait(arr, setArrayToSort);
        swapped = true;
      }
      // После визуальной сортировки меняем цвет текущего элемента, но не
      // рисуем его (не сортируем массив) он будет отрисован на следующем шаге
      arr[i].state = ElementStates.Default;
      arr[i + 1].state = ElementStates.Default;
    }
  } while (swapped);
  // Массив отсортирован
  arr.forEach((el) => (el.state = ElementStates.Modified));
  setArrayToSort([...arr]);
  // Анлочим кнопки
  setInProgress(false);
  mode === "ascending"
    ? setAscendingRunning(false)
    : setDescendingRunning(false);
};

export const selectionSort = async (
  mode: "ascending" | "descending",
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setAscendingRunning: React.Dispatch<React.SetStateAction<boolean>>,
  setDescendingRunning: React.Dispatch<React.SetStateAction<boolean>>,
  setArrayToSort: React.Dispatch<React.SetStateAction<columnObject[]>>,
  arrayToSort: columnObject[],
) => {
  // Лочим кнопки
  setInProgress(true);
  mode === "ascending" ? setAscendingRunning(true) : setDescendingRunning(true);

  //Копируем массив из стейта и делаем все элементы дефолтными
  const arr = [...arrayToSort];
  arr.forEach((el) => (el.state = ElementStates.Default));
  setArrayToSort([...arr]);
  // Начинаем цикл
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    // Инициализация счётчика
    let swapInd = i;
    // Подсвечиваем элемент рыжим, который будет отсортирован
    arr[i].state = ElementStates.Chosen;
    await sortAndWait(arr, setArrayToSort);
    // Начинаем цикл по оставшимся элементам
    for (let j = i + 1; j < length; j++) {
      // Подсвечиваем кандидата на свап фиолетовым
      arr[j].state = ElementStates.Changing;
      await sortAndWait(arr, setArrayToSort);
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
        await sortAndWait(arr, setArrayToSort);
      }
      // После визуальной сортировки меняем цвет текущего элемента, но не
      // рисуем его (не сортируем массив) он будет отрисован на следующем шаге
      arr[j].state =
        swapInd === j ? ElementStates.Chosen : ElementStates.Default;
    }
    // Если сортируемый элемент сам является экстремумом - рисуем его как "modified"
    if (i === swapInd) {
      arr[i].state = ElementStates.Modified;
      await sortAndWait(arr, setArrayToSort);
    }
    // В противном случае нужен свап и замена цветов (нужно 2 рендера)
    else {
      swapElements(arr, i, swapInd);
      await sortAndWait(arr, setArrayToSort);
      arr[i].state = ElementStates.Modified;
      arr[swapInd].state = ElementStates.Default;
      await sortAndWait(arr, setArrayToSort);
    }
  }
  // Анлочим кнопки
  setInProgress(false);
  mode === "ascending"
    ? setAscendingRunning(false)
    : setDescendingRunning(false);
};
