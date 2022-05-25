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

  const sortAscending = () => {

  }

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
              onClick={() => null}
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
            return <Column index={column.num} key={idx} />;
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
