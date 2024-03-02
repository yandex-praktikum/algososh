import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { swap } from "../../functions/functions";
import styles from './string.module.css'

export const StringComponent: React.FC = () => {
  const [arrLetters, setArrLetters] = useState<{ value: string, color: ElementStates }[]>()
  const [isSorting, setIsSorting] = useState<boolean>(false)
  const [isLoader, setIsLoader] = useState<boolean>(false)

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    const arrElem: { value: string; color: ElementStates }[] = Array.from(value).map(element => ({
      value: element,
      color: ElementStates.Default,
    }));
    setArrLetters(arrElem);
  }

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>, arr: { value: string, color: ElementStates }[]) => {
    e.preventDefault();
    if (arr && arr.length) {
      setIsLoader(true)
      let start = 0;
      let end = arr.length - 1;

      while (start <= end) {
        arr[start].color = ElementStates.Changing;
        arr[end].color = ElementStates.Changing;
        setIsSorting(true)
        const newArr = swap(arr, start, end)
        await new Promise(resolve => setTimeout(resolve, 1000));
        arr[start].color = ElementStates.Modified;
        arr[end].color = ElementStates.Modified;
        setIsSorting(false)
        start++
        end--
        setArrLetters([...newArr])
      }
      setIsLoader(false)
    }
  }

  useEffect(() => {

  }, [arrLetters, isSorting])



  return (
    <SolutionLayout title="Строка" extraClass="row">
      <div className={`${styles.form}`} >
        <Input
          isLimitText
          maxLength={11}
          style={{ width: '377px' }}
          onChange={(e) => onChange(e)}
          name="input" />
        {(arrLetters) && <Button text="Развернуть" onClick={(e) => handleButtonClick(e, arrLetters)} isLoader={isLoader} />}
      </div>
      <div className={`${styles.container}`}>
        {(arrLetters) ? arrLetters.map((el, i) => <Circle key={i} letter={el.value} state={el.color} />) : null}
      </div>

    </SolutionLayout>
  );
};

