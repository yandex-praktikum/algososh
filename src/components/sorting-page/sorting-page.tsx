import React, { useState, useEffect } from "react";
import { InputContainer } from "../input-container/input-container";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { columnObject, radioButtonState } from "../../types/types";
import { ElementStates } from "../../types/element-states";
import { getNumber, delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { bubbleSort, selectionSort } from "./utils";

export const SortingPage: React.FC = () => {
  const [arrayToSort, setArrayToSort] = useState<columnObject[]>([]);
  const [checked, setChecked] = useState<radioButtonState>("selection");
  const [inProgress, setInProgress] = useState(false);
  const [ascendingRunning, setAscendingRunning] = useState(false);
  const [descendingRunning, setDescendingRunning] = useState(false);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const size = Math.random() * (17 - 3) + 3;
    const arr: columnObject[] = Array.from({ length: size }, () => ({
      num: getNumber(),
      state: ElementStates.Default,
    }));
    setArrayToSort([...arr]);
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
              onClick={() =>
                checked === "selection"
                  ? selectionSort(
                      "ascending",
                      setInProgress,
                      setAscendingRunning,
                      setDescendingRunning,
                      setArrayToSort,
                      arrayToSort
                    )
                  : bubbleSort(
                      "ascending",
                      setInProgress,
                      setAscendingRunning,
                      setDescendingRunning,
                      setArrayToSort,
                      arrayToSort
                    )
              }
            />
            <Button
              sorting={Direction.Descending}
              disabled={inProgress}
              isLoader={descendingRunning}
              text="По убыванию"
              type="submit"
              onClick={() =>
                checked === "selection"
                  ? selectionSort(
                      "descending",
                      setInProgress,
                      setAscendingRunning,
                      setDescendingRunning,
                      setArrayToSort,
                      arrayToSort
                    )
                  : bubbleSort(
                      "descending",
                      setInProgress,
                      setAscendingRunning,
                      setDescendingRunning,
                      setArrayToSort,
                      arrayToSort
                    )
              }
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
