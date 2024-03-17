import React, { useState, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import styles from "./sorting-page.module.css";
import { Column } from "../ui/column/column";
import { randomArr } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { bubbleSort, selectionSort } from "../../utils/sorting";
import { delay } from "../../utils/utils";
import { getColumnState } from "../../utils/utils";
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
      let { selectionSortedSteps, sortedIndices } = selectionSort(
        [...arrValue],
        direction
      );

      for (let i = 0; i < selectionSortedSteps.length; i++) {
        await delay(DELAY_IN_MS);
        const [currentArr, minIndex, currentIndex] = selectionSortedSteps[i];
        setArrValue(currentArr);
        setColumnState(() =>
          currentArr.map((item, index) =>
            getColumnState(index, selectionSortedSteps.length - 1, i, {
              currentArray: currentArr,
              sortedIndexes: sortedIndices,
              aIndex: minIndex,
              bIndex: currentIndex,
            })
          )
        );
      }
    } else {
      let bubbleSortSteps = bubbleSort([...arrValue], direction);
      for (let i = 0; i < bubbleSortSteps.length; i++) {
        await delay(DELAY_IN_MS);
        const [currentArr, fisrt, second] = bubbleSortSteps[i];
        setArrValue(currentArr);

        if (fisrt !== -1 && second !== -1) {
          setColumnState((prev) =>
            currentArr.map((item, index) =>
              index === fisrt || index === second
                ? ElementStates.Changing
                : ElementStates.Default
            )
          );
        }
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
