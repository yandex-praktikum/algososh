import React, { ChangeEvent, SyntheticEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";

import styles from './sorting-page.module.css'
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { wait, isLess, isMore } from "../../utils/utils";

type TSortMethod = 'select' | 'bubble'
type TSortDirection = 'asc' | 'desc';
type TExtremumType = 'min' | 'max';

export const SortingPage: React.FC = () => {

  const [arr, setArr] = React.useState<number[]>([]);
  const [sortMethod, setSortMethod] = React.useState<TSortMethod>('select');
  const [animatingArrElements, setAnimatingArrElements] = React.useState<{ left: number, right: number, sorted?: number }>();
  const [animationInProgress, setAnimationInProgress] = React.useState<TSortDirection | false>(false);


  const selectSortMethod = React.useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value ===  'select' || evt.target.value ===  'bubble') setSortMethod(evt.target.value);
  },[])


  const randomArr = React.useCallback(() => {
    setAnimatingArrElements({ left: -1, right: -1 });
    const arrLength: number = Math.floor(Math.random() * 17);
    const resArr: number[] = []

    for (let i = 0; i < arrLength; i++) {
      resArr.push(Math.floor(Math.random() * 100))
    }
    setArr(resArr);
  }, [])


  const ascSortHandler = React.useCallback(async () => {
    setAnimationInProgress('asc');
    if (sortMethod === 'bubble') await bubleSort(arr, 'asc');
    if (sortMethod === 'select') await selectionSort(arr, 'asc');
    setAnimationInProgress(false);
  }, [arr, sortMethod])
  

  const descSortHandler = React.useCallback(async () => {
    setAnimationInProgress('desc');
    if (sortMethod === 'bubble') await bubleSort(arr, 'desc');
    if (sortMethod === 'select') await selectionSort(arr, 'desc');
    setAnimationInProgress(false);
  }, [arr, sortMethod])



  const bubleSort = React.useCallback(async (arr: number[], sortDirection: TSortDirection): Promise<void> => {
    const isNeedToChange = sortDirection === 'asc' ? isLess : isMore; 
    
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        setAnimatingArrElements({left: j, right: j+1, sorted: arr.length - i})
        await wait(500);
        if (isNeedToChange(arr[j + 1], arr[j])) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    setArr([...arr]);
  }, []);


  const selectionSort = React.useCallback(async (arr: number[], sortDirection: TSortDirection): Promise<void> => {

    const extremumType: TExtremumType = sortDirection === 'asc' ? 'min' : 'max';
    let curIndex: number = 0;
    let selectedIndex: number = 0;


    while (curIndex < arr.length) {
      selectedIndex = await findExtremum(arr, extremumType, curIndex, arr.length - 1);
      [arr[curIndex], arr[selectedIndex]] = [arr[selectedIndex], arr[curIndex]];
      setArr([...arr]);
      curIndex++;
    }

    async function findExtremum(arr: number[], type: TExtremumType, startSearch: number = 0, endSearch: number = arr.length - 1): Promise<number> {

      const isNewExtremum = (type === 'min') ? isLess : isMore;

      let curIndex: number = startSearch;
      let extremumIndex: number = startSearch;
      let extremumValue: number = arr[extremumIndex];

      while (curIndex <= endSearch) {
        setAnimatingArrElements({ left: startSearch, right: curIndex })
        await wait(500);
        if (isNewExtremum(arr[curIndex], extremumValue)) {
          extremumValue = arr[curIndex]
          extremumIndex = curIndex;
        }
        curIndex++;
      }
      return extremumIndex;
    }
  }, []);

  const getElementState = React.useCallback((index: number) => {
    if (arr.length === 1) return ElementStates.Modified;
    if (animatingArrElements && sortMethod === 'select' && (index < animatingArrElements.left || animatingArrElements.left === arr.length - 1)) return ElementStates.Modified;
    if (animatingArrElements && animatingArrElements.sorted && sortMethod === 'bubble' && (index >=  animatingArrElements.sorted || (animatingArrElements.sorted === 2 && (index === 0 || index === 1)))) return ElementStates.Modified;
    if (animatingArrElements && (index === animatingArrElements.left || index === animatingArrElements.right)) return ElementStates.Changing;
    return ElementStates.Default
  }, [arr, animatingArrElements]);

  React.useEffect(() => {
    randomArr();
  },[])



  return (
    <SolutionLayout title="Сортировка массива">
      <div className={`${styles.controlsContainer} mb-25`}>
        <RadioInput label='Выбор' name='sortingAlg' value={'select'} checked={sortMethod === 'select'} onChange={selectSortMethod} disabled={!!animationInProgress} />
        <RadioInput label='Пузырек' name='sortingAlg' value={'bubble'} checked={sortMethod === 'bubble'} onChange={selectSortMethod} disabled={!!animationInProgress} />
        <Button sorting={Direction.Ascending} text='По возрастанию' type='button' onClick={ascSortHandler} isLoader={animationInProgress === 'asc'} extraClass={styles.button} disabled={!!animationInProgress} />
        <Button sorting={Direction.Descending} text='По убыванию' type='button' onClick={descSortHandler} isLoader={animationInProgress === 'desc'} extraClass={styles.button} disabled={!!animationInProgress} />
        <Button text='Новый массив' type='button' isLoader={false} onClick={randomArr} extraClass={`${styles.button} ${styles.lastButton}`} disabled={!!animationInProgress} />
      </div>

      <div className={styles.columnsContainer}>
        {!!arr.length && arr.map((number, index) => {
          return (<Column key={index.toString() + number.toString()} index={number} state={getElementState(index)} extraClass="mr-5" />)
        })}
      </div>
    </SolutionLayout>
  );
};
