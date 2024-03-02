import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import Stack from "../../class/stack";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import styles from './stack-page.module.css'

export type TElement = {
  value: string,
  color: ElementStates
}

export const StackPage: React.FC = () => {
  const [item, setItem] = useState<string>('')
  const [arr, setArr] = useState<TElement[]>()
  const stackRef = useRef<Stack<TElement>>(new Stack<TElement>())
  const [isLoaderAdd, setIsLoaderAdd] = useState<boolean>(false)
  
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setItem((e.target as HTMLInputElement).value)
  }

  const handleClickButtonAdd = async (element: string) => {
    setIsLoaderAdd(true)
    const elementArr = {
      value: element,
      color: ElementStates.Changing
    }
    stackRef.current.push(elementArr);
    setArr(stackRef.current.arr);
    setItem('');
    await new Promise(resolve => setTimeout(resolve, 500));
    stackRef.current.top().color = ElementStates.Default
    setArr([...stackRef.current.arr]);
    setIsLoaderAdd(false)
  }

  const handleClickButtonDel = () => {
   
    stackRef.current.pop();
    setArr([...stackRef.current.arr]);
    
  }

  const handleClickButtonClear = () => {
    stackRef.current.clear()
    setArr(stackRef.current.arr)
  }

  useEffect(() => { }, [arr])


  return (
    <SolutionLayout title="Стек">
      <div className={`${styles.container}`}>
        <form className={`${styles.form}`}>
          <Input maxLength={4} onChange={(e) => onChange(e)} id='input' value={item} />
          <div className={`${styles.blockButtons}`}>
            <Button text="Добавить" onClick={() => handleClickButtonAdd(item)} isLoader={isLoaderAdd} />
            <Button text="Удалить" onClick={handleClickButtonDel}  />
          </div>
          <div style={{
            paddingLeft: '40px',
          }}>
            <Button text="Очистить" onClick={handleClickButtonClear} />
          </div>
        </form>
        <div className={`${styles.containerCircle}`}>
          {arr?.map((elem, i) => <div key={i}>
            <Circle letter={elem.value} state={elem.color} index={i} head={(i === arr.length - 1) ? 'top' : ''} />
          </div>)}
        </div>
      </div>
    </SolutionLayout>
  );
};
