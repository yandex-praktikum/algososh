import React, { ChangeEvent, useEffect, useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import { IRandomArray } from "./sorting-type.types";
import { makeDelay } from "./utils";

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<IRandomArray[]>([]);
  const [radioChecked, setRadioChecked] = useState("selectionType");
  const [isLoader, setIsLoader] = useState("");
  const asc: string = "ascending";
  const desc: string = "descending";

  const randomArr = (): IRandomArray[] => {
    let arr = [{ value: 0, state: ElementStates.Default }];
    let arrLength = 0;

    while (arrLength < 3 || arrLength > 17) {
      arrLength = Math.round(Math.random() * 20);
    }
    for (let i = 0; i <= arrLength; i++) {
      arr.push({
        value: Math.round(Math.random() * 100),
        state: ElementStates.Default,
      });
    }
    return arr;
  };

  useEffect(() => {
    setArray(randomArr());
  }, []);

  const handleAddNewArrayClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoader("newArray");
    setArray(randomArr());
    setIsLoader("");
  };

  const handleChangeRadioClick = (e: ChangeEvent<HTMLInputElement>): void => {
    setRadioChecked(e.target.value);
  };

  const swap = (
    arr: IRandomArray[],
    firstIndex: number,
    secondIndex: number
  ): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const selectionSort = async (
    arr: IRandomArray[],
    route: boolean
  ): Promise<IRandomArray[]> => {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      let index = i;
      arr[index].state = ElementStates.Changing;
      for (let j = i + 1; j < length; j++) {
        arr[j].state = ElementStates.Changing;
        setArray([...arr]);
        await makeDelay(300);
        if (
          route
            ? arr[j].value < arr[index].value
            : arr[j].value > arr[index].value
        ) {
          index = j;
          arr[j].state = ElementStates.Changing;
          arr[index].state =
            i === index ? ElementStates.Changing : ElementStates.Default;
          index = j;
        }
        if (j !== index) {
          arr[j].state = ElementStates.Default;
        }
        setArray([...arr]);
      }
      swap(arr, i, index);
      arr[index].state = ElementStates.Changing;
      arr[i].state = ElementStates.Modified;
      setArray([...arr]);
    }
    return arr;
  };

  const bubbleSort = async (
    arr: IRandomArray[],
    route: boolean
  ): Promise<IRandomArray[]> => {
    const { length } = arr;

    for (let i = 0; i < length; i++) {
      for (let index = 0; index < length - i - 1; index++) {
        const first = arr[index].value;
        const right = arr[index + 1].value;
        arr[index].state = ElementStates.Changing;
        arr[index + 1].state = ElementStates.Changing;
        setArray([...arr]);
        await makeDelay(500);
        if (route ? first > right : first < right) {
          arr[index].value = right;
          arr[index + 1].value = first;
        }
        arr[index].state = ElementStates.Default;
        if (arr[index + 1]) {
          arr[index + 1].state = ElementStates.Default;
        }
        setArray([...arr]);
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
      setArray([...arr]);
    }

    return arr;
  };

  const sortingTypeChoose = async (route: string): Promise<void> => {
    setIsLoader(route);
    console.log(route);
    const currentTypeOfSortingRoute = route === desc;
    if (radioChecked === "selectionType") {
      console.log(currentTypeOfSortingRoute);
      setArray(await selectionSort([...array], currentTypeOfSortingRoute));
    } else {
      setArray(await bubbleSort([...array], currentTypeOfSortingRoute));
    }
    setIsLoader("");
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.mainWrapper}>
        <form className={styles.inputsWrapper}>
          <div className={styles.radioBtnWrapper}>
            <RadioInput
              label="Выбор"
              value={"selectionType"}
              name={"sorting"}
              defaultChecked
              onChange={handleChangeRadioClick}
            />
            <RadioInput
              label="Пузырёк"
              value={"bubbleType"}
              name={"sorting"}
              onChange={handleChangeRadioClick}
            />
          </div>
          <div className={styles.sortingBtnWrapper}>
            <Button
              text="По возрастанию"
              sorting={Direction.Descending}
              onClick={() => sortingTypeChoose(desc)}
              isLoader={isLoader === desc}
              disabled={isLoader === asc}
              extraClass={styles.button}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Ascending}
              onClick={() => sortingTypeChoose(asc)}
              isLoader={isLoader === asc}
              disabled={isLoader === desc}
              extraClass={styles.button}
            />
          </div>
          <Button
            text="Новый массив"
            onClick={handleAddNewArrayClick}
            disabled={isLoader === asc || isLoader === desc}
            isLoader={isLoader === "newArray"}
            extraClass={styles.button}
          />
        </form>
        <div className={styles.columnsWrapper}>
          {array.map((element, i) => {
            return (
              <Column
                index={element.value}
                state={element.state}
                key={i}
                extraClass={styles.column}
              />
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
