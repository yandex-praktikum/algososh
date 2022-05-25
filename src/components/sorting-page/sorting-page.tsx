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

  const sortDescending = async () => {
    // Копируем массив из стейта
    const arr = [...arrayToSort];
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
      //
      let maxInd = i;
      arr[i].state = ElementStates.Chosen;
      setArrayToSort([...arr]);
      await waitForMe(SHORT_DELAY_IN_MS);
      for (let j = i + 1; j < length; j++) {
        //
        arr[j].state = ElementStates.Changing;
        setArrayToSort([...arr]);
        await waitForMe(SHORT_DELAY_IN_MS);
        if (arr[maxInd].num < arr[j].num) {
          maxInd = j;
          arr[maxInd].state = ElementStates.Default;
          arr[j].state = ElementStates.Chosen;
          setArrayToSort([...arr]);
          await waitForMe(SHORT_DELAY_IN_MS);
        }
        arr[j].state = maxInd === j
          ? ElementStates.Chosen
          : ElementStates.Default;
      }
      swapNums(arr, i, maxInd);
      arr[i].state = ElementStates.Modified;
      arr[maxInd].state = ElementStates.Default;
      setArrayToSort([...arr]);
      await waitForMe(SHORT_DELAY_IN_MS);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <InputContainer>
          <div className={styles.radioContainer}>
            <RadioInput
              checked={checked === "selection"}
              onChange={() => setChecked("selection")}
              value="selection"
              label="Выбор"
            />
            <RadioInput
              checked={checked === "bubble"}
              onChange={() => setChecked("bubble")}
              value="bubble"
              label="Пузырёк"
            />
          </div>
          <div className={styles.buttonsContainer}>
            <Button
              sorting={Direction.Ascending}
              disabled={false}
              isLoader={false}
              text="По возрастанию"
              type="submit"
              onClick={() => sortDescending()}
            />
            <Button
              sorting={Direction.Descending}
              disabled={false}
              isLoader={false}
              text="По убыванию"
              type="submit"
              onClick={() => null}
            />
          </div>
          <Button
            disabled={false}
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
