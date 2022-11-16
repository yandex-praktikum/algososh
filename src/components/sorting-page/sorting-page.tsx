import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";
import {delay, makeRandomArr} from "../../utils/utils";
import {Column} from "../ui/column/column";

type TSortArray = {
  value: number;
  color: ElementStates;
};

export const SortingPage: React.FC = () => {
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [sortWay, setSortWay] = useState('choose');
  const [sortArray, setSortArray] = useState<TSortArray[]>([]);

  const [direction, setDirection] = useState<Direction>();

  const makeNewArr = () => {
    setSortArray([...makeRandomArr()]);
  };

  const onChangeSortWay = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortWay(event.target.value);
  }

  const bubbleSort = async (array: TSortArray[], direction: Direction) => {
    setIsDisabledButton(true);
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        array[j].color = ElementStates.Changing;
        array[j + 1].color = ElementStates.Changing;
        setSortArray([...array]);
        await delay(400);
        if (direction === Direction.Descending) {
          if (array[j].value < array[j + 1].value) {
            [array[j].value, array[j + 1].value] = [array[j + 1].value, array[j].value];
          }
        } else if (direction === Direction.Ascending) {
          if (array[j].value > array[j + 1].value) {
            [array[j].value, array[j + 1].value] = [array[j + 1].value, array[j].value];
          }
        }
        array[j].color = ElementStates.Default;
      }
      array[array.length - i - 1].color = ElementStates.Modified;
    }
    setIsDisabledButton(false);
  }

  const selectionSort = async (array: TSortArray[], direction: Direction) => {
    setIsDisabledButton(true);
    for (let i = 0; i < array.length - 1; i++) {
      let ind = i;
      for (let j = i + 1; j < array.length; j++) {
        array[i].color = ElementStates.Changing;
        array[j].color = ElementStates.Changing;
        setSortArray([...array]);
        await delay(400);
        if (direction === Direction.Descending) {
          if (array[j].value > array[ind].value) {
            ind = j;
          }
        } else if (direction === Direction.Ascending) {
          if (array[j].value < array[ind].value) {
            ind = j;
          }
        }
        array[j].color = ElementStates.Default;
        setSortArray([...array]);
      }
      [array[i].value, array[ind].value] = [array[ind].value, array[i].value];
      array[i].color = ElementStates.Modified;
    }
    array[array.length - 1].color = ElementStates.Modified;
    setIsDisabledButton(false);
  }

  const handleClick = (direction: Direction) => {
    setDirection(direction);
    if (sortWay === 'bubble') {
      bubbleSort(sortArray, direction);
    }
    if (sortWay === 'choose') {
      selectionSort(sortArray, direction);
    }
  }

  const setLoading = (dir: Direction) => direction === dir && isDisabledButton
  const setDisabled = (dir: Direction) => direction !== dir && isDisabledButton

  useEffect(() => {
    setSortArray([...makeRandomArr()]);
    return () => { setSortArray([])};
  }, []);


  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.buttonsContainer}>
        <div className={styles.buttonsContainer__filters}>
          <div className={styles.buttonsContainer__sortWay}>
            <RadioInput
                value='choose'
                label='Выбор'
                disabled={isDisabledButton}
                checked={sortWay === 'choose'}
                onChange={onChangeSortWay}
            />
            <RadioInput
                label='Пузырёк'
                value='bubble'
                disabled={isDisabledButton}
                checked={sortWay === 'bubble'}
                onChange={onChangeSortWay}
            />
          </div>
          <div className={styles.buttonsContainer__ascDesc}>
            <Button
                text='По возрастанию'
                sorting={Direction.Ascending}
                extraClass={styles.buttonsContainer__button}
                onClick={() => handleClick(Direction.Ascending)}
                isLoader={setLoading(Direction.Ascending)}
                disabled={setDisabled(Direction.Ascending)}
            />
            <Button
                text='По убыванию'
                sorting={Direction.Descending}
                extraClass={styles.buttonsContainer__button}
                onClick={() => handleClick(Direction.Descending)}
                isLoader={setLoading(Direction.Ascending)}
                disabled={setDisabled(Direction.Ascending)}
            />
          </div>
        </div>
        <Button
          text='Новый массив'
          disabled={isDisabledButton}
          extraClass={styles.buttonsContainer__button}
          onClick={makeNewArr}
        />
      </div>
      <ul className={styles.sortingContainer}>
        {sortArray.map((item, index) =>
            <li key={index} className={styles.column}>
              <Column index={item.value} state={item.color} />
            </li>
        )}
      </ul>
    </SolutionLayout>
  );
};
