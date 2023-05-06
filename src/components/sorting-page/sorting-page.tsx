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
const randomNumber = (min: number, max: number) => {
  return min + Math.round(Math.random()*(max-min));
}

const createNumbers = () => {
  return Array.from({ length: randomNumber(3, 17) }, () => ({value: randomNumber(0, 100)}));
}

const bubbleSort = () => {

}

export const SortingPage: React.FC = () => {
  const [numbers, setNumbers] = useState<INumber[]>(createNumbers());
  const [inProgress, setProgress] = useState(false);
  const [ascLoader, setAscLoader] = useState(false);
  const [descLoader, setDescLoader] = useState(false);

  const onSortChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setSort(e.target.value);
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

      if ( i > 0 ) {
        setTimeout(tick, 300);
      } else {
        numbers[i].state = 'sorted';
        setProgress(false);
        setAscLoader(false);
        setDescLoader(false);
      }
      setNumbers([...numbers]);
    }, 300);

  }

  return (
    <SolutionLayout title="Сортировка массива">
      <form onSubmit={onFormSubmit} className={styles.form}>
        <RadioInput label='Выбор' name='type' value='selection' checked onChange={onSortChange}/>
        <RadioInput label='Пузырёк' name='type' value='bubble' onChange={onSortChange}/>
        <Button type='submit' name='asc' sorting={Direction.Ascending} text='По возрастанию' disabled={inProgress} isLoader={ascLoader}/>
        <Button type='submit' name='desc' sorting={Direction.Descending} text='По убыванию' disabled={inProgress} isLoader={descLoader}/>
        <Button type='button' text='Новый массив' disabled={inProgress} onClick={() => {setNumbers(createNumbers())}}/>
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
