import React, { useState, useEffect, ChangeEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './sorting-page.module.css';
import { Button } from '../ui/button/button';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { IArrayNumbers, getArrayNumbers, swap } from './random-arr';
import { delay, DELAY_MILLISECONDS } from '../../utils/delay';
import { Column } from '../ui/column/column';

type TSorting = 'increase' | 'descending' | 'start';

type Tmethod = {
  choice: boolean;
  babble: boolean;
};

export const SortingPage: React.FC = () => {
  const [radioChoice, setRadioChoice] = useState<string>('choise-method');
  const [array, setArray] = useState<Array<IArrayNumbers>>([]);
  const [isSorting, setSorting] = useState<TSorting>('start');

  const [isDisabledRadio, setIsDisabledRadio] = useState<Tmethod>({
    choice: false,
    babble: false,
  });

  useEffect(() => {
    setArray(getArrayNumbers());
  }, []);

  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioChoice(e.target.value);
  };

  const handleGetNewArray = () => {
    setArray(getArrayNumbers());
  };

  const handleStartSort = async (direction: TSorting): Promise<void> => {
    if (direction === 'increase') setSorting('increase');
    if (direction === 'descending') setSorting('descending');
    radioChoice === 'choise-method'
      ? selectionSort(direction)
      : bubbleSort(direction);
  };

  const selectionSort = async (direction: TSorting): Promise<void> => {
    setIsDisabledRadio({
      ...isDisabledRadio,
      choice: true,
    });
    const { length } = array;
    for (let i = 0; i < length; i++) {
      let maxIndex = i;
      array[maxIndex].state = ElementStates.Changing;
      for (let j = i + 1; j < length; j++) {
        array[j].state = ElementStates.Changing;
        setArray([...array]);
        await delay(DELAY_MILLISECONDS);
        if (
          direction === 'increase'
            ? array[j].value < array[maxIndex].value
            : array[j].value > array[maxIndex].value
        ) {
          maxIndex = j;
          array[j].state = ElementStates.Changing;
          array[maxIndex].state =
            i === maxIndex ? ElementStates.Changing : ElementStates.Default;
        }
        if (j !== maxIndex) {
          array[j].state = ElementStates.Default;
        }
        setArray([...array]);
      }
      swap(array, maxIndex, i);
      array[maxIndex].state = ElementStates.Default;
      array[i].state = ElementStates.Modified;
      setArray([...array]);
    }
    setIsDisabledRadio({
      ...isDisabledRadio,
      choice: false,
    });
    setSorting('start');
  };

  const bubbleSort = async (direction: TSorting): Promise<void> => {
    setIsDisabledRadio({
      ...isDisabledRadio,
      babble: true,
    });
    const { length } = array;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        const left = array[j].value;
        const right = array[j + 1].value;
        array[j].state = ElementStates.Changing;
        array[j + 1].state = ElementStates.Changing;
        setArray([...array]);
        await delay(DELAY_MILLISECONDS);
        if (direction === 'increase' ? left > right : left < right) {
          array[j].value = right;
          array[j + 1].value = left;
        }
        array[j].state = ElementStates.Default;
        if (array[j + 1]) {
          array[j + 1].state = ElementStates.Default;
        }
        setArray([...array]);
      }
      array[array.length - i - 1].state = ElementStates.Modified;
      setArray([...array]);
    }
    setIsDisabledRadio({
      ...isDisabledRadio,
      babble: false,
    });
    setSorting('start');
  };

  return (
    <SolutionLayout title='Сортировка массива'>
      <form className={styles.form}>
        <RadioInput
          label='Выбор'
          onChange={onChangeRadio}
          name={'choice'}
          value={'choise-method'}
          defaultChecked
          disabled={isDisabledRadio.babble || isDisabledRadio.choice}
        />
        <RadioInput
          label='Пузырёк'
          name={'choice'}
          onChange={onChangeRadio}
          value={'bubble-method'}
          disabled={isDisabledRadio.babble || isDisabledRadio.choice}
        />
        <div className={styles.btn_wrapper}>
          <Button
            text={'По возрастанию'}
            sorting={Direction.Ascending}
            onClick={() => handleStartSort('increase')}
            isLoader={isSorting === 'increase'}
            disabled={isSorting === 'descending'}
          />
          <Button
            text={'По убыванию'}
            sorting={Direction.Descending}
            onClick={() => handleStartSort('descending')}
            isLoader={isSorting === 'descending'}
            disabled={isSorting === 'increase'}
          />
        </div>
        <Button
          text={'Новый массив'}
          onClick={handleGetNewArray}
          disabled={isDisabledRadio.babble || isDisabledRadio.choice}
        />
      </form>
      <ul className={styles.showarray}>
        {array.map((element: IArrayNumbers, index: number) => (
          <Column key={index} index={element.value} state={element.state} />
        ))}
      </ul>
    </SolutionLayout>
  );
};
