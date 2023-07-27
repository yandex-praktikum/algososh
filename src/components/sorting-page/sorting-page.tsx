import React, { useEffect, useState } from "react";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { v4 as uuidv4 } from "uuid";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import styles from "./sorting-page.module.css";

enum SortType {
  SELECT_SORT = "selectSort",
  BUBBLE_SORT = "bubbleSort",
}

interface IArray {
  value: number;
  color: ElementStates;
  uuid: string;
}

export const SortingPage: React.FC = () => {
  const [sortVariant, setSortVariant] = useState<SortType>(
    SortType.SELECT_SORT
  );
  const [data, setData] = useState<IArray[]>([]);
  const [direction, setDirection] = useState<Direction>(Direction.Ascending);
  const [loading, setLoading] = useState(false);

  const changeSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortVariant(event.target.value as SortType);
  };


  const selectSort = async (arr: IArray[], compareFn: (left: IArray, right: IArray) => boolean
  ) => {
    setLoading(true);
    if (arr.length > 1) {
      for (let i = 0; i < arr.length - 1; i++) {
        let maxInd = i;
        for (let j = i + 1; j < arr.length; j++) {
          arr[i].color = ElementStates.Changing;
          arr[j].color = ElementStates.Changing;
          setData([...arr]);
          await new Promise((resolve) =>
            setTimeout(resolve, SHORT_DELAY_IN_MS)
          );
          if (compareFn(arr[j], arr[maxInd])) {
            maxInd = j;
          };
          arr[j].color = ElementStates.Default;
          setData([...arr]);
        };
        [arr[i].value, arr[maxInd].value] = [arr[maxInd].value, arr[i].value];
        arr[i].color = ElementStates.Modified;
      }
      arr[arr.length - 1].color = ElementStates.Modified;
      setData([...arr]);
    }
    setLoading(false);
  };

  const bubbleSort = async (
    arr: IArray[],
    compareFn: (left: IArray, right: IArray) => boolean
  ) => {
    setLoading(true);
    if (arr.length > 1) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          arr[j].color = ElementStates.Changing;
          arr[j + 1].color = ElementStates.Changing;
          setData([...arr]);
          await new Promise((resolve) =>
            setTimeout(resolve, SHORT_DELAY_IN_MS)
          );
          if (compareFn(arr[j], arr[j + 1])) {
            [arr[j].value, arr[j + 1].value] = [
              arr[j + 1].value,
              arr[j].value,
            ];
          }
          arr[j].color = ElementStates.Default;
        }
        arr[arr.length - i - 1].color = ElementStates.Modified;
        setData([...arr]);
      }
    }
    setLoading(false);
  };

  const bubbleSortAsc = (arr: IArray[]) => {
    return bubbleSort(
      arr,
      (left: IArray, right: IArray) => left.value > right.value
    );
  };

  const bubbleSortDesc = (arr: IArray[]) => {
    return bubbleSort(
      arr,
      (left: IArray, right: IArray) => left.value < right.value
    );
  };

  const selectSortAsc = (arr: IArray[]) => {
    return selectSort(
      arr,
      (left: IArray, right: IArray) => left.value < right.value
    );
  };

  const selectSortDesc = (arr: IArray[]) => {
    return selectSort(
      arr,
      (left: IArray, right: IArray) => left.value > right.value
    );
  };

  const doSort = (direction: Direction) => {
    const arr = [...data];
    for (let i = 0; i < arr.length; i++) {
      arr[i].color = ElementStates.Default;
    }

    switch (sortVariant) {
      case SortType.BUBBLE_SORT:
        return direction === Direction.Ascending
          ? bubbleSortAsc([...arr])
          : bubbleSortDesc([...arr]);
      case SortType.SELECT_SORT:
        return direction === Direction.Ascending
          ? selectSortAsc([...arr])
          : selectSortDesc([...arr]);;
    }
  };

  const onSortDescClick = () => {
    setDirection(Direction.Descending);
    doSort(Direction.Descending);
  };

  const onSortAscClick = () => {
    setDirection(Direction.Ascending);
    doSort(Direction.Ascending);
  };

  const randomArr = () => {
    const arr: IArray[] = [];
    const length = Math.floor(Math.random() * (17 - 3 + 1)) + 3;
    for (let i = 0; i < length; i++) {
      arr.push({
        value: Math.round(Math.random() * 100),
        color: ElementStates.Default,
        uuid: uuidv4(),
      });
    }
    return arr;
  };

  const onNewDataClick = () => {
    setData([...randomArr()]);
  };

  useEffect(() => {
    setData([...randomArr()]);
    return () => {
      setData([]);
    };
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <div className={styles.radioInputContainer}>
          <RadioInput
            label="Выбор"
            checked={sortVariant === SortType.SELECT_SORT}
            value={SortType.SELECT_SORT}
            onChangeSort={changeSort}
            disabled={loading}
          />
          <RadioInput
            label="Пузырёк"
            checked={sortVariant === SortType.BUBBLE_SORT}
            value={SortType.BUBBLE_SORT}
            onChangeSort={changeSort}
            disabled={loading}
          />
        </div>
        <div className={styles.directionButtonContainer}>
          <Button
            text="По возрастанию"
            type="button"
            sorting={Direction.Ascending}
            onClick={onSortAscClick}
            isLoader={loading && direction === Direction.Ascending}
            disabled={loading && direction !== Direction.Ascending}
          />
          <Button
            text="По убыванию"
            type="button"
            sorting={Direction.Descending}
            onClick={onSortDescClick}
            isLoader={loading && direction === Direction.Descending}
            disabled={loading && direction !== Direction.Descending}
          />
        </div>
        <Button
          text="Новый массив"
          type="button"
          onClick={onNewDataClick}
          disabled={loading}
        />
      </div>
      <div className={styles.arrayContainer}>
        {data.map((element) => (
          <Column
            key={element.uuid}
            index={element.value}
            state={element.color}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
