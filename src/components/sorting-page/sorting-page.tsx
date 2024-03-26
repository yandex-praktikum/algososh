import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import styles from "./sorting-page.module.css";
import { Column } from "../ui/column/column";
import { disableButtonSetter, randomArr } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { bubbleSort, selectionSort } from "../../utils/sorting";
import { delay } from "../../utils/utils";

export const SortingPage: React.FC = () => {
  const [radioInputValue, setRadioInputValue] = useState<string>("Выбор");
  const [arrValue, setArrValue] = useState<Array<number>>([]);
  const [columnState, setColumnState] = useState<Array<ElementStates>>([]);
  const [buttonsLoadingState, setButtonsLoadingState] = useState({
    newArrButton: false,
    ascendingButton: false,
    descendingButton: false,
  });

  async function handleRandomArray() {
    setArrValue([]);
    setColumnState([]);
    setButtonsLoadingState({ ...buttonsLoadingState, newArrButton: true });
    await delay(DELAY_IN_MS);
    let randomedArray = randomArr([]);
    setArrValue(randomedArray);
    setButtonsLoadingState({ ...buttonsLoadingState, newArrButton: false });
  }

  async function handleSorting(direction: Direction) {
    if (direction === "ascending") {
      setButtonsLoadingState({ ...buttonsLoadingState, ascendingButton: true });
    } else if (direction === "descending") {
      setButtonsLoadingState({
        ...buttonsLoadingState,
        descendingButton: true,
      });
    }
    if (radioInputValue === "Выбор") {
      let { selectionSortedSteps } = selectionSort([...arrValue], direction);
      for (let i = 0; i < selectionSortedSteps.length; i++) {
        await delay(DELAY_IN_MS);
        const [currentArr, minIndex, currentIndex, currentCounter] =
          selectionSortedSteps[i];
        setArrValue(currentArr);
        setColumnState(() =>
          currentArr.map((item, index) =>
            index === minIndex || index === currentIndex
              ? ElementStates.Changing
              : index < currentCounter &&
                index !== minIndex &&
                index !== currentIndex
              ? ElementStates.Modified
              : ElementStates.Default
          )
        );
      }
    } else {
      let { bubbleSortSteps } = bubbleSort([...arrValue], direction);
      for (let i = 0; i < bubbleSortSteps.length; i++) {
        await delay(DELAY_IN_MS);
        const [currentArr, first, second, currentCounter] = bubbleSortSteps[i];
        setArrValue(currentArr);
        setColumnState(() =>
          currentArr.map((item, index) =>
            index === first || index === second
              ? ElementStates.Changing
              : index > currentCounter
              ? ElementStates.Modified
              : ElementStates.Default
          )
        );
      }
    }

    setButtonsLoadingState({
      ...buttonsLoadingState,
      ascendingButton: false,
      descendingButton: false,
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
            disableButtonSetter("ascendingButton", buttonsLoadingState) ||
            arrValue.length === 0
          }
        ></Button>
        <Button
          onClick={() => handleSorting(Direction.Descending)}
          text={arrValue.length === 0 ? "Создайте массив чисел" : "По убыванию"}
          sorting={Direction.Descending}
          isLoader={buttonsLoadingState.descendingButton}
          disabled={
            disableButtonSetter("descendingButton", buttonsLoadingState) ||
            arrValue.length === 0
          }
        ></Button>
        <Button
          onClick={handleRandomArray}
          extraClass="ml-20"
          text="Новый массив"
          isLoader={buttonsLoadingState.newArrButton}
          disabled={disableButtonSetter("newArrButton", buttonsLoadingState)}
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
