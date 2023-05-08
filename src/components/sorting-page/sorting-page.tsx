import React, { SyntheticEvent, ChangeEvent, useState } from "react";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Direction } from '../../types/direction';
import styles from './sorting-page.module.css';
import { Column } from "../ui/column/column";

interface INumber {
  value: number;
  state?: 'current' | 'sorted';
}

type TSortFunc = (numbers: INumber[], setNumbers: (numbers: INumber[]) => void, sort: string, stopProgress: () => void) => void

const TICK_TIMEOUT = 300;

const randomNumber = (min: number, max: number) => {
  return min + Math.round(Math.random()*(max-min));
}

const createNumbers = () => {
  return Array.from({ length: randomNumber(3, 17) }, () => ({value: randomNumber(0, 100)}));
}

const bubbleSort: TSortFunc = (numbers, setNumbers, sort, stopProgress) => {
  const l = numbers.length;
  let j = 1;
  let i = l;
  setTimeout(function tick() {
    numbers[j].state = numbers[j - 1].state = 'current';
    if (j >= 2) numbers[j - 2].state = undefined;
    if (i < l) {
      if (j !== i - 1) numbers[i - 1].state = undefined;
      numbers[i].state = 'sorted';
    }

    let a = j - 1;
    let b = j;
    if (sort === 'desc') {
      a = j;
      b = j - 1;
    }

    if (numbers[a].value > numbers[b].value) {
      let tmp = numbers[a].value;
      numbers[a].value = numbers[b].value;
      numbers[b].value = tmp;
    }

    if (j < i - 1) {
      j++;
    } else {
      i--;
      j = 1;
    }

    if (i > 0) {
      setTimeout(tick, TICK_TIMEOUT);
    } else {
      numbers[i].state = 'sorted';
      stopProgress();
    }
    setNumbers([...numbers]);
  }, TICK_TIMEOUT);

}

const selectionSort: TSortFunc = (numbers, setNumbers, sort, stopProgress) => {
  let i = 0;
  let j = 1;
  let searchedIndex = i;
  const l = numbers.length;

  setTimeout(function tick() {
    if (i < l - 1) {
      numbers[i].state = numbers[j].state = 'current';
    }

    if (i !== j - 1 && j < l) {
      numbers[j - 1].state = undefined;
    }

    if (j - 1 === i && i > 0) {
      numbers[i - 1].state = 'sorted';
      if (i === l - 1) {
        numbers[i].state = 'sorted';
      }

      let a = i - 1;
      let b = searchedIndex;
      if (sort === 'desc') {
        a = searchedIndex;
        b = i - 1;
      }
      if (numbers[a].value > numbers[b].value) {
        let tmp = numbers[a].value;
        numbers[a].value = numbers[b].value;
        numbers[b].value = tmp;
      }
      searchedIndex = i;
    }

    let c = j;
    let d = searchedIndex;
    if (sort === 'desc') {
      c = searchedIndex;
      d = j;
    }
    if (j < l && numbers[d].value > numbers[c].value) {
      searchedIndex = j;
    }

    if (j >= l - 1) {
      i++;
      j = i + 1;
    } else {
      numbers[l - 1].state = undefined;
      j++;
    }

    setNumbers([...numbers]);

    if (i < l) {
      setTimeout(tick, TICK_TIMEOUT);
    } else {
      stopProgress();
    }

  }, TICK_TIMEOUT)

}

export const SortingPage: React.FC = () => {
  const [sortType, setSortType] = useState('selection');
  const [numbers, setNumbers] = useState<INumber[]>(createNumbers());
  const [inProgress, setProgress] = useState(false);
  const [ascLoader, setAscLoader] = useState(false);
  const [descLoader, setDescLoader] = useState(false);


  const stopProgress = () => {
    setProgress(false);
    setAscLoader(false);
    setDescLoader(false);
  }

  const onSortTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSortType(e.target.value);
  }

  const onFormSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();

    setProgress(true);

    const eventSubmitter = (e.nativeEvent as SubmitEvent).submitter;
    const sort = (eventSubmitter as HTMLButtonElement).name;
    if (sort === 'asc') {
      setAscLoader(true);
    } else {
      setDescLoader(true);
    }

    if (sortType === 'selection') {
      selectionSort(numbers, setNumbers, sort, stopProgress);
    }
    if (sortType === 'bubble') {
      bubbleSort(numbers, setNumbers, sort, stopProgress);
    }

  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form onSubmit={onFormSubmit} className={styles.form}>
        <RadioInput label='Выбор' name='type' value='selection' checked={sortType === 'selection'} onChange={onSortTypeChange}/>
        <RadioInput label='Пузырёк' name='type' value='bubble' checked={sortType === 'bubble'} onChange={onSortTypeChange}/>
        <Button type='submit' name='asc' sorting={Direction.Ascending} text='По возрастанию' disabled={inProgress} isLoader={ascLoader}/>
        <Button type='submit' name='desc' sorting={Direction.Descending} text='По убыванию' disabled={inProgress} isLoader={descLoader}/>
        <Button type='button' text='Новый массив' disabled={inProgress} onClick={() => {setNumbers(createNumbers())}} extraClass={styles.lastBtn}/>
      </form>
      <div className={styles.container}>
        {numbers &&
          numbers.map(({ value, state }, i) => {
            return <Column key={i} index={value} extraClass={state && styles[state]}/>
          })
        }
      </div>
    </SolutionLayout>
  );
};
