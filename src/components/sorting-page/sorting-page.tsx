import React, { useState, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import styles from "./sorting-page.module.css";
import { Column } from "../ui/column/column";
import { randomArr, swap, updateColumnleState } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { useEffect } from "react";

export const SortingPage: React.FC = () => {
  const [radioInputValue, setRadioInputValue] = useState<string>("Выбор");
  const [arrValue, setArrValue] = useState<Array<number>>([]);
  const [columnState, setColumnState] = useState<Array<ElementStates>>([]);
  const [buttonsLoadingState, setButtonsLoadingState] = useState({
    newArrButton: false,
    ascendingButton: false,
    descendingButton: false,
  });

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function selectionSort(arr: number[], direction: Direction) {
    const n = arr.length;
    let steps = [];
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (direction === Direction.Descending) {
          if (arr[j] > arr[minIndex]) {
            minIndex = j;
          }
        } else {
          if (arr[j] < arr[minIndex]) {
            minIndex = j;
          }
        }
      }
      if (minIndex !== i) {
        swap(arr, i, minIndex);
        steps.push([...arr]);
      }
    }
    return { selectionSortedArr: arr, selectionSortSteps: steps };
  }

  function bubbleSort(arr: number[], direction: Direction) {
    const n = arr.length;
    const steps = [];
    for (let j = 0; j < n - 1; j++) {
      for (let i = 0; i < n - j - 1; i++) {
        if (
          (direction === Direction.Ascending && arr[i] > arr[i + 1]) ||
          (direction === Direction.Descending && arr[i] < arr[i + 1])
        ) {
          swap(arr, i, i + 1);
          steps.push([...arr]);
        }
      }
    }
    return { sortedArr: arr, steps };
  }

  async function handleRandomArray() {
    setArrValue([]);
    setButtonsLoadingState({ ...buttonsLoadingState, newArrButton: true });
    await delay(DELAY_IN_MS);
    let randomedArray = randomArr([]);
    console.log("рандомный массив", randomedArray);
    setArrValue(randomedArray);
    setButtonsLoadingState({ ...buttonsLoadingState, newArrButton: false });
  }

  async function handleSorting(direction: Direction) {
    if (direction === Direction.Ascending) {
      setButtonsLoadingState({ ...buttonsLoadingState, ascendingButton: true });
    } else if (direction === Direction.Descending) {
      setButtonsLoadingState({
        ...buttonsLoadingState,
        descendingButton: true,
      });
    }
    if (radioInputValue === "Пузырёк") {
      const { sortedArr, steps } = bubbleSort([...arrValue], direction);
      for (const step of steps) {
        await delay(DELAY_IN_MS);
        setArrValue(step);
      }
      setButtonsLoadingState({
        ...buttonsLoadingState,
        ascendingButton: false,
        descendingButton: false,
      });
    } else {
      let { selectionSortSteps } = selectionSort([...arrValue], direction);
      for (const step of selectionSortSteps) {
        for (const s in step) {
          setColumnState(updateColumnleStates(step, parseInt(s)));
        }
        await delay(DELAY_IN_MS);
        setArrValue(step);
      }
      setButtonsLoadingState({
        ...buttonsLoadingState,
        ascendingButton: false,
        descendingButton: false,
      });
    }
  }

  function updateColumnleStates(arr: number[], currentIndex: number) {
    const minIndex = arr.indexOf(Math.min(...arr.slice(currentIndex)));

    return arr.map((item, index) => {
      if (index === currentIndex || index === minIndex) {
        return ElementStates.Changing;
      } else if (index <= currentIndex) {
        return ElementStates.Default;
      } else if (index < arr.length) {
        return ElementStates.Modified;
      } else {
        return ElementStates.Modified;
      }
    });
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.buttonsContainer}>
        <RadioInput
          onChange={() => setRadioInputValue("Выбор")}
          checked={radioInputValue === "Выбор"}
          label="Выбор"
        ></RadioInput>
        <RadioInput
          onChange={() => setRadioInputValue("Пузырёк")}
          checked={radioInputValue === "Пузырёк"}
          label="Пузырёк"
        ></RadioInput>
        <Button
          onClick={() => handleSorting(Direction.Ascending)}
          text={
            arrValue.length === 0 ? "Создайте массив чисел" : "По возрастанию"
          }
          sorting={Direction.Ascending}
          isLoader={buttonsLoadingState.ascendingButton}
          disabled={
            buttonsLoadingState.newArrButton ||
            buttonsLoadingState.descendingButton ||
            arrValue.length === 0
          }
        ></Button>
        <Button
          onClick={() => handleSorting(Direction.Descending)}
          text={arrValue.length === 0 ? "Создайте массив чисел" : "По убыванию"}
          sorting={Direction.Descending}
          isLoader={buttonsLoadingState.descendingButton}
          disabled={
            buttonsLoadingState.newArrButton ||
            buttonsLoadingState.ascendingButton ||
            arrValue.length === 0
          }
        ></Button>
        <Button
          onClick={handleRandomArray}
          extraClass="ml-20"
          text="Новый массив"
          isLoader={buttonsLoadingState.newArrButton}
          disabled={
            buttonsLoadingState.descendingButton ||
            buttonsLoadingState.ascendingButton
          }
        ></Button>
      </div>
      <div className={styles.sortingContent}>
        {arrValue.map((item, index) => {
          return (
            <Column
              state={columnState[index]}
              key={index}
              index={item}
            ></Column>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
