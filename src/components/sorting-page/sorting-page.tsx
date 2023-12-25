import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from "./sorting-page.module.css"
import { Column } from "../ui/column/column"
import { DELAY_IN_MS } from "../../constants/delays";
import { randomArr, swapElementsBubble, stateBubbleElement, stateSelectionElement, swapElementsSelection } from "./utils";
import { Direction } from "../../types/direction";

export const SortingPage: React.FC = () => {

  const [radioValue, setRadioValue] = useState<string>('selection');
  const [loader, setLoader] = useState<boolean>(false);
  const [arr, setArr] = useState<number[]>([]);
  const [currentElement, setCurrentElement] = useState<number | undefined>(undefined);
  const [nextElement, setNextElement] = useState<number | undefined>(undefined);
  const [lastElement, setLastElement] = useState<number | undefined>(undefined);
  const [buttonActive, setButtonActive] = useState<boolean>(true);

  useEffect(() => {
    setArr(randomArr());
    setButtonActive(true);
  }, []);

  const doProcess = (direction: Direction) => {
    setLoader(true)
    setButtonActive(false);
    radioValue === 'selection' ? selectionSort(arr, direction) : bubbleSort(arr, direction);
  }

  const bubbleSort = async (arr: number[], direction: Direction) => {

    for (let i = 0; i < arr.length; i++) {

      setLastElement(arr.length - i - 1);
      for (let j = 0; j < arr.length - 1 - i; j++) {
        setCurrentElement(j)
        setNextElement(j + 1)
        await new Promise(resolve => setTimeout(resolve, 100));
        swapElementsBubble(arr, direction, j);
        setArr([...arr])
      }
      setCurrentElement(undefined);
      setNextElement(undefined);
    }
    setLoader(false)
    setButtonActive(true);
  }

  const selectionSort = async (arr: number[], direction: Direction) => {
    
    for (let i = 0; i < arr.length; i++) {
      let maxIndex = i;
      setNextElement(i)
      for (let j = i + 1; j < arr.length + 1; j++) {
        setCurrentElement(j)
        swapElementsSelection(arr, direction, j, maxIndex)
        await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
        setArr([...arr])
        setNextElement(i + 1)
      }
    }
    setLoader(false)
    setButtonActive(true);
  }

    const createNewArray = () => {
      setArr(randomArr());
      setCurrentElement(undefined);
      setNextElement(undefined);
      setLastElement(undefined);
    }

    return (
      <SolutionLayout title="Сортировка массива">
        <section className={styles.main}>
          <form className={styles.form}>
            <RadioInput
              label="Выбор"
              name="chooseYourDestiny"
              value="selection"
              disabled={!buttonActive}
              defaultChecked={radioValue === 'selection'}
              onClick={() => setRadioValue('selection')}
            />
            <RadioInput
              name="chooseYourDestiny"
              label="Пузырёк"
              value="bubble"
              extraClass="ml-20"
              disabled={!buttonActive}
              onClick={() => setRadioValue('bubble')}
            />
            <Button
              extraClass={`${styles.button} ${styles.ml_50}`}
              text="По возрастанию"
              sorting={Direction.Ascending}
              isLoader={loader}
              disabled={!buttonActive}
              onClick={() => doProcess(Direction.Ascending)}
            />
            <Button
              extraClass={styles.button}
              text="По убыванию"
              sorting={Direction.Descending}
              isLoader={loader}
              disabled={!buttonActive}
              onClick={() => doProcess(Direction.Descending)}
            />
            <Button
              extraClass={`${styles.button} ${styles.ml_80}`}
              text="Новый массив"
              isLoader={loader}
              disabled={!buttonActive}
              onClick={() => createNewArray()}
            />
          </form>
          <ul className={styles.columnList}>

            {arr && arr.map((item, index) => (
              <li key={index}>
                <Column
                  index={item}
                  state={radioValue === 'bubble' ? stateBubbleElement(index, nextElement, currentElement, lastElement) : stateSelectionElement(index, nextElement, currentElement)}
                />
              </li>
            ))
            }
          </ul>
        </section>
      </SolutionLayout>
    );
  };
