import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<{ value: number, color: ElementStates }[]>([]);
  const [metod, setMetod] = useState<string>('selection');
  const [isSorting, setIsSorting] = useState<boolean>(false)

  const handleClickButtonNewArray = () => {
    const lengthArray = Math.floor(Math.random() * (17 - 3)) + 3;
    let arr: number[] = [];
    for (let i = 0; i <= lengthArray; i++) {
      const elemArr = Math.floor(Math.random() * 100)
      arr.push(elemArr)
    }
    const arrElem = arr.map((elem) => ({
      value: elem,
      color: ElementStates.Default
    }))
    setArr(arrElem);
  }

  const handleClickRadioInput = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setMetod(e.currentTarget.value);
  }

  async function sortingSelection(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, arr: { value: number, color: ElementStates }[], viewSort: 'ascending' | 'descending') {
    e.preventDefault()
    console.log('start');

    for (let i = 0; i < arr.length; i++) {
      let min = i
      arr[i].color = ElementStates.Changing;
      setIsSorting((prev) => !prev)
      await new Promise(resolve => setTimeout(resolve, 500));

      for (let j = i + 1; j < arr.length; j++) {
        arr[j].color = ElementStates.Changing;
        setIsSorting((prev) => !prev)
        await new Promise(resolve => setTimeout(resolve, 500));
        if (viewSort === 'ascending') {
          if (arr[min].value > arr[j].value) {
            min = j
          }
        } else if (viewSort === 'descending') {
          if (arr[min].value < arr[j].value) {
            min = j
          }
        }
        arr[j].color = ElementStates.Default;
        setIsSorting((prev) => !prev)
      }
      let temp = arr[i];
      arr[i] = arr[min];
      arr[i].color = ElementStates.Modified;
      setIsSorting((prev) => !prev)
      if (arr[min].value === temp.value) {
        arr[min] = temp;
        arr[min].color = ElementStates.Modified;
        setIsSorting((prev) => !prev)
      } else {
        arr[min] = temp;
        arr[min].color = ElementStates.Default;
        setIsSorting((prev) => !prev)
      }

    }
    const sortArr = [...arr]
    setArr(sortArr)
  }

  async function sortingBubble(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, arr: { value: number, color: ElementStates }[], viewSort: 'ascending' | 'descending') {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        arr[j].color = ElementStates.Changing;
        arr[j + 1].color = ElementStates.Changing;
        setIsSorting((prev) => !prev)
        await new Promise(resolve => setTimeout(resolve, 500));
        if (viewSort === 'ascending') {
          if (arr[j].value > arr[j + 1].value) {
            let temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = temp
          }
        } else {
          if (arr[j].value < arr[j + 1].value) {
            let temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j + 1] = temp
          }
        }

        arr[j].color = ElementStates.Default;
        arr[j + 1].color = ElementStates.Default;
        if (j + 1 === arr.length - 1 - i) arr[j + 1].color = ElementStates.Modified
        if (j === arr.length - (i + 2) && j === 0) arr[j].color = ElementStates.Modified
      }


    }

    const sortArr = [...arr]


    setArr(sortArr)
  }

  useEffect(() => {

  }, [arr])

  const getMetodSorting = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, arr: { value: number, color: ElementStates }[], viewSort: 'ascending' | 'descending') => {
    if (metod === 'selection') {
      return sortingSelection(e, arr, viewSort)
    }
    if (metod === 'bubble') {
      sortingBubble(e, arr, viewSort)
    }
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '52px'
        }}>
          <fieldset style={{
            border: 'none',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '40px'
          }}>
            <RadioInput label="Выбор" name="sort" value="selection" checked onClick={(e) => handleClickRadioInput(e)} />
            <RadioInput label="Пузырёк" name="sort" value="bubble" onClick={(e) => handleClickRadioInput(e)} />
          </fieldset>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '12px'
          }}>
            <Button text="По возрастанию" sorting={Direction.Ascending} onClick={(e) => getMetodSorting(e, arr, 'ascending')} />
            <Button text="По убыванию" sorting={Direction.Descending} onClick={(e) => getMetodSorting(e, arr, 'descending')} />
          </div>
          <Button text="Новый массив" onClick={handleClickButtonNewArray} />
        </div>
        <div style={{
          marginTop: '50px',
          width: '100%',
          maxWidth: '1100px',
          minHeight: '340px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'end',
          justifyContent: 'center',
          gap: '20px'
        }}>
          {arr.map((el, i) => <Column key={i} index={el.value} state={el.color} />)}
        </div>

      </div>

    </SolutionLayout>
  );
};
