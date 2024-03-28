import React, { useState, useEffect } from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { choiceSortAscending, choiceSortDescending, bubleSortAscending, bubleSortDescending } from "./utils";

export const SortingPage: React.FC = () => {
  const [choiceSort, setChoiceSort] = useState(true)
  const [steps, setSteps] = useState<[number[], number, number, number][]>();
  const [arr, setArr] = useState<number[]>();
  const [index, setIndex] = useState<number>(0);
  const [isLoaderAsc, setIsLoaderAsc] = useState(false);
  const [isLoaderDesc, setIsLoaderDesc] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [flag, setFlag] = useState(false);

  const randomArr = () => {
    const arrLength = Math.floor(Math.random() * 15) + 3;
    const randomArray = Array.from({ length: arrLength }, () => Math.floor(Math.random() * 101));
    if (arr) {
      return [...randomArray]
    } else {
      return randomArray
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (isButtonPressed && steps && (index < (steps.length - 1))) {
        setIndex(prev => prev + 1);
      }
    }, 1000);
    if (steps && index === (steps.length - 1)) {
      setIsLoaderAsc(false)
      setIsLoaderDesc(false)
    }

    return () => { clearInterval(interval); }

  }, [isButtonPressed, index])

  const startBubleSortAscAlgoritm = (arr: number[]) => {
    setSteps(bubleSortAscending(arr));
    setFlag(true)
  }
  const startBubleSortDescAlgoritm = (arr: number[]) => {
    setSteps(bubleSortDescending(arr));
    setFlag(true)
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <>
        <div className={styles.buttonsContainer}>
          <div className={styles.radioButtonsWrapper}>
            <RadioInput label={"Выбор"} name={'method'} defaultChecked={true} value={'choice'} onClick={() => setChoiceSort(true)} />
            <RadioInput label={"Пузырёк"} name={'method'} value={'buble'} onClick={() => setChoiceSort(false)} />
          </div>
          <div className={styles.buttonsWrapper}>
            <Button sorting={Direction.Ascending} text={"По возрастанию"} isLoader={isLoaderAsc ? true : false} onClick={() => {
              if (arr) {
                choiceSort ? setSteps(choiceSortAscending(arr)) : startBubleSortAscAlgoritm(arr)
                setIsLoaderAsc(true);
                setIsButtonPressed(true);
                setArr(undefined)
              }
            }} />
            <Button sorting={Direction.Descending} text={"По убыванию"} isLoader={isLoaderDesc ? true : false} onClick={() => {
              if (arr) {
                choiceSort ? setSteps(choiceSortDescending(arr)) : startBubleSortDescAlgoritm(arr)
                setIsLoaderDesc(true);
                setIsButtonPressed(true);
                setArr(undefined)
              }
            }} />
          </div>
          <Button text={"Новый массив"} onClick={() => {
            setArr(randomArr)
            setSteps(undefined)
            setIndex(0)
            setIsButtonPressed(false);
          }} />
        </div>
        <div className={styles.columnWrapper}>
          {steps ? <ColumnsComponent flag={flag} array={[...steps[index]]} /> : arr && <ColumnsComponent arr={[...arr]} flag={flag} />}
        </div>
      </>
    </SolutionLayout>
  );
};

type ColumnsComponentProps = {
  array?: [number[], number, number, number];
  arr?: number[];
  flag: boolean;
}


const ColumnsComponent = ({ array, arr, flag }: ColumnsComponentProps) => {
  return (
    <>
      {!flag && array && array[0].map((item, index) => <Column index={item} key={index} state={(index === array[1] || index === array[2]) ? ElementStates.Changing : (index < array[3]) ? ElementStates.Modified : ElementStates.Default} />)}
      {flag && array && array[0].map((item, index) => <Column index={item} key={index} state={(index === array[1] || index === array[2]) ? ElementStates.Changing : (index > array[3]) ? ElementStates.Modified : ElementStates.Default} />)}
      {arr && arr.map((item, index) => <Column index={item} key={index} />)}
    </>
  )
}