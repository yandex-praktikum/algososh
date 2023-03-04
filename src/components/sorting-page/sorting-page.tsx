import { FC, useState, useEffect, useRef } from "react";
import {
  Direction,
  ElementStates,
  SortingMethods,
  TSortingResult,
} from "../../types";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import {
  MIN_ARRAY_LEN,
  MAX_ARRAY_LEN,
  MIN_VALUE,
  MAX_VALUE,
} from "../../constants/sorting";
import { SortArray } from "./utils";
import {
  generateInitialArray,
  setDelay,
} from "../../utils-common/utils-common";

import styles from "./sorting-page.module.css";

export const SortingPage: FC = () => {
  const sortedData = useRef(new SortArray());
  const [result, setResult] = useState<TSortingResult>({
    array: [],
    current: [],
    modified: [],
  });
  const [method, setMethod] = useState<SortingMethods>(
    SortingMethods.Selection
  );
  const [direction, setDirection] = useState<Direction>(Direction.Ascending);
  const [loader, setLoader] = useState(false);

  const showResults = async () => {
    setLoader(true);
    const steps = sortedData.current.steps;
    let i = 0;

    while (i < steps.length) {
      setResult({ ...(steps[i] as TSortingResult) });

      if (i < steps.length - 1) {
        await setDelay(SHORT_DELAY_IN_MS);
      }
      i++;
    }

    setLoader(false);
  };

  const handleAscendingClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (result.array.length > 0) {
      setDirection(Direction.Ascending);
      sortedData.current.method = method;
      sortedData.current.direction = Direction.Ascending;
      sortedData.current.data = result.array;
      sortedData.current.sortArray();
      showResults();
    }
  };

  const handleDescendingClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (result.array.length > 0) {
      setLoader(true);
      setDirection(Direction.Descending);
      sortedData.current.method = method;
      sortedData.current.direction = Direction.Descending;
      sortedData.current.data = result.array;

      sortedData.current.sortArray();
      showResults();
    }
  };

  const handleNewArrayClick = () => {
    setResult({
      array: generateInitialArray({
        minLength: MIN_ARRAY_LEN,
        maxLength: MAX_ARRAY_LEN,
        minVal: MIN_VALUE,
        maxVal: MAX_VALUE,
      }),
      current: [],
      modified: [],
    });
  };

  useEffect(() => {
    handleNewArrayClick();
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.panel}>
        <fieldset className={styles.wrap}>
          <RadioInput
            name={"sortingMethod"}
            onChange={() => setMethod(SortingMethods.Selection)}
            checked={method === SortingMethods.Selection}
            label={"Выбор"}
            disabled={loader}
          />
          <RadioInput
            name={"sortingMethod"}
            onChange={() => setMethod(SortingMethods.Bubble)}
            checked={method === SortingMethods.Bubble}
            label={"Пузырек"}
            disabled={loader}
          />
        </fieldset>
        <fieldset className={styles.wrap}>
          <Button
            type={"submit"}
            text={"По возрастанию"}
            sorting={Direction.Ascending}
            style={{ minWidth: "205px" }}
            onClick={handleAscendingClick}
            isLoader={loader && direction === Direction.Ascending}
            disabled={
              (loader && direction !== Direction.Ascending) ||
              result.array.length === 0
            }
          />
          <Button
            type={"submit"}
            text={"По убыванию"}
            sorting={Direction.Descending}
            style={{ minWidth: "205px" }}
            onClick={handleDescendingClick}
            isLoader={loader && direction === Direction.Descending}
            disabled={
              (loader && direction !== Direction.Descending) ||
              result.array.length === 0
            }
          />
        </fieldset>
        <Button
          type={"button"}
          text={"Новый массив"}
          onClick={handleNewArrayClick}
          style={{ minWidth: "205px" }}
          disabled={loader}
        />
      </form>

      <ul className={styles.results}>
        {result.array.length > 0 &&
          result.array.map((item: number, index: number) => {
            const isCurrent = result.current.includes(index);
            const isModified = result.modified.includes(index);
            const state = isCurrent
              ? ElementStates.Changing
              : isModified
              ? ElementStates.Modified
              : ElementStates.Default;

            return (
              <li key={index}>
                <Column index={item} state={state} />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
