import React, {useState, useEffect} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import sortingStyle from "./sortingStyle.module.css";
import { ElementStates } from '../../types/element-states';
import {delay} from '../../utils/constDelay';

type TSorting = {
  number: number;
  state: ElementStates;
};
type TSortingLoading = {
  ascending: boolean;
  descending: boolean;
}

export const SortingPage: React.FC = () => {

  const [sortingArr, setSortingArr] = useState<Array<TSorting>>([]);
  const [selectSort, setSelectSort] = useState<string>("select");
  const [isLoading, setIsLoading] =  useState<TSortingLoading>({ascending: false, descending: false}
  );

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectSort((e.target as HTMLInputElement).value);
  };

  const buttonSorting = (ascending: boolean) => {
    if (selectSort === "select") {
      selectSortArr(ascending)
    }
    if (selectSort === "bubble") {
      bubbleSortingArr(ascending)
    }
  }

  const resetArrState = () => {
    //Выбираем длину массива
    const arrLength = Math.floor(Math.random() * 14) + 3;
    let arr = [];
    for (let i = 0; i <= arrLength - 1; i++) {
      //Выбираем случайное число для массива
      let randNum = Math.floor(Math.random() * 100) ;
      arr.push(randNum);
    }
    return arr;
  };

  //Функция swap меняет местами
  const swap = (arr: Array<TSorting>, i: number, j: number): void => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  //Функция сортировки массива выбором
  const selectSortArr = async (ascending: boolean) => {
    setIsLoading({ascending, descending: !ascending});

    const arr = sortingArr.slice();
    for (let i = 0; i < arr.length; i++) {
      let sortIdx = i;
      arr[sortIdx].state = ElementStates.Changing;
      setSortingArr([...arr]);
      for (let j = i + 1; j < arr.length; j++) {
        arr[j].state = ElementStates.Changing;
        setSortingArr([...arr]);
        await delay(500);
        if (ascending) {
          if (arr[j].number < arr[sortIdx].number) {
            sortIdx = j;
          }
        } else {
          if (arr[j].number > arr[sortIdx].number) {
            sortIdx = j;
          }
        }
        arr[j].state = ElementStates.Default;
        setSortingArr([...arr]);
        await delay(500);
      }
      swap(arr, i, sortIdx);
      arr[sortIdx].state = ElementStates.Default;
      arr[i].state = ElementStates.Modified;
      setSortingArr([...arr]);
      await delay(500);
    }
    setIsLoading({ascending: false, descending: false});
  }

 //Функция сортировки массива пузырьком
  const bubbleSortingArr = async (ascending: boolean) => {
    setIsLoading({ascending, descending: !ascending});

    let arr = sortingArr.slice();
    const { length } = arr;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setSortingArr([...arr]);
        await delay(500);
        if (ascending) {
          if (arr[j].number > arr[j + 1].number) {
            swap(arr, j, j + 1);
            setSortingArr([...arr]);
            await delay(500);
          }
        } else {
          if (arr[j].number < arr[j + 1].number) {
            swap(arr, j, j + 1);
            setSortingArr([...arr]);
            await delay(500);
          }
        }
        arr[j].state = ElementStates.Default;
        arr[j + 1].state = ElementStates.Default;
        setSortingArr([...arr]);

      }
      arr[length - i - 1].state = ElementStates.Modified;
      setSortingArr([...arr]);
      await delay(500);
    }
    setIsLoading({ascending: false, descending: false});
  }

  const handleNewArr = () => {
    const arr = resetArrState();
    const sortArr = arr.map((number) => {
      return {
        number,
        state: ElementStates.Default
      }
    })
    setSortingArr(sortArr);
  }

  // Отобразим произвольный массив при загрузки страницы
  useEffect(() => {
    handleNewArr()
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={sortingStyle.form} >
        <div className={sortingStyle.container}>
        <div className={sortingStyle.radios}>
          <RadioInput
              label="Выбор"
              name="sorting-type"
              value="select"
              defaultChecked
              onChange={handleChangeRadio}
          />
          <RadioInput
              label="Пузырек"
              name="sorting-type"
              value="bubble"
              onChange={handleChangeRadio}
          />
        </div>
          <Button
              type="button"
              text="По возрастанию"
              isLoader={isLoading.ascending}
              onClick={() => buttonSorting(true)}
          />
          <Button
              type="button"
              text="По убыванию"
              isLoader={isLoading.descending}
              onClick={() => buttonSorting(false)}
          />
          <div className={sortingStyle.button}>
          <Button
              type="button"
              text="Новый массив"
              minLength={4}
              maxLength={17}
              disabled={isLoading.ascending || isLoading.descending}
              onClick={handleNewArr}
          />
          </div>
        </div>
      </form>
      <ul className={sortingStyle.column}>
        {sortingArr.map((item, index) => {
          return (
              <Column
                  key={index}
                  index={item.number}
                  state={item.state}
              />)
        })}
      </ul>
    </SolutionLayout>
  );
};
