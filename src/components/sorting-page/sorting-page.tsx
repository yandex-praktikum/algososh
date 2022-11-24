import React, { useEffect, useState } from "react";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { TElementState } from "../../types/types";
import { delay, getRandomArrNum, swapString } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from './sorting-page.module.css'

export const SortingPage: React.FC = () => {

  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(true);
  const [sortingArr, setSortingArr] = useState<Array<TElementState>>([]);

  const getRandomArr = () => {
    return setSortingArr(getRandomArrNum())
  }

  useEffect(() => {
    getRandomArr();
  }, []);

  const selectionSort = async (bool: boolean) => {
    setIsLoad(true);
    const { length } =  sortingArr;
    const tempArr = sortingArr;
    for (let i = 0; i < length; i++) {
      tempArr[i].state = ElementStates.Changing;
      setSortingArr([...tempArr]);
      await delay(DELAY_IN_MS);
      let index = i;
      for (let j = i + 1; j < length; j++){
        tempArr[j].state = ElementStates.Changing;
        setSortingArr([...tempArr]);
        await delay(SHORT_DELAY_IN_MS);
        if ((bool && tempArr[index].item > tempArr[j].item) || (!bool && tempArr[index].item < tempArr[j].item)) {
          if ( i !== index) {
            tempArr[index].state = ElementStates.Default;
          }
          index = j;
        } else {
          tempArr[j].state = ElementStates.Default;
        }
        setSortingArr([...tempArr]);   
        await delay(SHORT_DELAY_IN_MS); 
      }
      swapString(tempArr, i, index);
      tempArr[i].state = ElementStates.Modified;
      if ( i !== index) {
        tempArr[index].state = ElementStates.Default;
      }
      setSortingArr([...tempArr]);
      await delay(DELAY_IN_MS);
    }
    setSortingArr([...tempArr]);
    setIsLoad(false);
  } 

  const bubbleSort = async (bool: boolean) => {
    setIsLoad(true);
    const { length } =  sortingArr;
    const tempArr = sortingArr;
    for (let i = 0; i < length; i++) {
      for(let j = 0 ; j < length - i - 1; j++) {
        tempArr[j].state = ElementStates.Changing
        tempArr[j + 1].state = ElementStates.Changing
        setSortingArr([...tempArr])
        await delay(DELAY_IN_MS);
        if (
          (bool && Number(tempArr[j].item) > Number(tempArr[j + 1].item))
          ||
          (!bool && Number(tempArr[j].item) < Number(tempArr[j + 1].item))
        ) {
          swapString(tempArr, j, j + 1)
        }
        tempArr[j].state = ElementStates.Default
        if (j === tempArr.length - i - 2) {
          tempArr[j + 1].state = ElementStates.Modified
          if (j === 0) {
            tempArr[j].state = ElementStates.Modified
          }
        }
        setSortingArr([...tempArr])
        await delay(SHORT_DELAY_IN_MS);
      }
    }
    setIsLoad(false);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.content}>
        <RadioInput
          label="Выбор"
          disabled={isLoad}
          checked={checked}
          onChange={() => setChecked(true)}
          extraClass="mr-20"
        />
        <RadioInput
          label="Пузырёк"
          disabled={isLoad}
          checked={!checked}
          onChange={() => setChecked(false)}
          extraClass="mr-20"
        />
        <Button
          text={'По возрастанию'}
          disabled={isLoad}
          sorting={Direction.Ascending}
          extraClass="mr-6"
          onClick={() => 
            checked 
              ? selectionSort(true)
              : bubbleSort(true)
          }
        />
        <Button
          text={'По убыванию'}
          disabled={isLoad}
          sorting={Direction.Descending}
          extraClass="mr-40"
          onClick={() => 
            checked 
              ? selectionSort(false)
              : bubbleSort(false)
          }
        />
        <Button
          text={'Новый массив'}
          onClick={getRandomArr}
          disabled={isLoad}
        />
      </div>
      <ul className={style.list}>
        {sortingArr?.map((item, index) => {
          return (
            <Column
              key={index}
              index={+item.item}
              state={item.state}
              extraClass={'mt-25'}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
