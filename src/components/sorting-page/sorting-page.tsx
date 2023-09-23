import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import slyles from './sorting.module.css'
import { Direction } from "../../types/direction";
import { bubbleSort, randomArr, selectionSort } from "./sorting";
import { ElementStates } from "../../types/element-states";

export type randomArrayType = {
  number: number,
  state: ElementStates
}

type propsType = {
  arr: randomArrayType[]
}

export const SortingPage: React.FC = () => {

  useEffect(() => { getNewArray() }, []);

  const [array, setArray] = useState([] as randomArrayType[])
  const [isLoader, setIsLoader] = useState<Direction | null>()
  const [radio, setRadio] = useState<string>("selection");


  function onChoseMetod(e: ChangeEvent<HTMLInputElement>): void {
    setRadio((e.target as HTMLInputElement).value);
  };

  const getNewArray = () => setArray(randomArr(0, 100, 3, 17))


  function Array(props: propsType): any {
    const arr = props.arr

    return arr.map((item: randomArrayType, idx) => {
      return (
        <Column key={idx} index={item.number} state={item.state} />
      )
    })

  }

  const sort = (direction: Direction) => {

    setIsLoader(direction)
    if (radio === 'selection') {
      
      selectionSort(array, setArray, setIsLoader, direction)
      return 
     
    } else if (radio === 'bubble') {
      
      bubbleSort(array, setArray, setIsLoader, direction)
      return 
    }
  }



  return (
    <SolutionLayout title="Сортировка массива">
      <form className={slyles.form}>
        <div className={slyles.radio_group}>
          <RadioInput label="Выбор" checked={true} name={'type'} value={'selection'} onChange={onChoseMetod} />
          <RadioInput label="Пузырек" name={'type'} value={'bubble'} onChange={onChoseMetod} />
        </div>
        <div className={slyles.method_group}>
          <Button text='По возрастанию'
            sorting={Direction.Ascending}
            isLoader={isLoader === Direction.Ascending}
            onClick={() => sort(Direction.Ascending)}
          />
          <Button text='По убыванию'
            sorting={Direction.Descending}
            isLoader={isLoader === Direction.Descending}
            onClick={() => sort(Direction.Descending)}
            linkedList="medium" />
        </div>
        <Button text='Новый массив' linkedList="medium" onClick={getNewArray} />
      </form>
      <ul className={slyles.graf}>
        <Array arr={array} />
      </ul >
    </SolutionLayout>
  );
};
