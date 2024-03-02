import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { TElement } from "../stack-page/stack-page";
import { Queue, TQueue } from "../../class/queue";
import styles from './queue-page.module.css'

export type TNode = {
  value: string,
  color: ElementStates,  
  prev: TNode | null,
  next: TNode | null,
}

export const QueuePage: React.FC = () => {
  const [item, setItem] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  /* const { value, setElement} = useState<TElement>() */
  const queueRef = useRef(new Queue<string>(7))
  const [arrNode, setArrNode] = useState<{ value: string, color: ElementStates, isHead: boolean, isTail: boolean }[]>([...queueRef.current.createArr()])
   
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setItem((e.target as HTMLInputElement).value);
    setIsDisabled(false)
  }

  const handleClickButtonAdd = async (element: string) => {
    queueRef.current.push(element);
    setItem('');
    let arr = queueRef.current.createArr()
    setArrNode([...arr])
    setIsDisabled(true)
    const tail = queueRef.current.getTail()
    if (tail) tail.color = ElementStates.Changing;
    setArrNode([...queueRef.current.createArr()])
    await new Promise(resolve => setTimeout(resolve, 500));
    if (tail) tail.color = ElementStates.Default;
    setArrNode([...queueRef.current.createArr()])    
  }

  const handleClickButtonDel = () => {    
    queueRef.current.pop()
    setArrNode([...queueRef.current.createArr()])
  }

  const handleClickButtonClear = () => {
    queueRef.current.clear()
    setArrNode([...queueRef.current.createArr()])
  }

  useEffect(() => {
  }, [arrNode])  

  return (
    <SolutionLayout title="Очередь">
      <div className={`${styles.container}`}>
        <form className={`${styles.form}`}>
          <Input maxLength={4} id='input' value={item} onChange={onChange} />
          <div className={`${styles.blockButtons}`}>
            <Button text="Добавить" onClick={() => handleClickButtonAdd(item)} disabled={isDisabled} />
            <Button text="Удалить" onClick={() => handleClickButtonDel()} />
          </div>
          <div style={{
            paddingLeft: '40px',
          }}>
            <Button text="Очистить" onClick={()=> handleClickButtonClear()}/>
          </div>
        </form>
        <div className={`${styles.containerCircle}`}>
          {arrNode?.map((elem, i) =>
            <Circle key={i}
             letter={elem.value} 
             state={elem.color} 
             index={i} 
             head={(elem.isHead) ? 'head' : ''} 
             tail={(elem.isTail) ? 'tail' : ''} />
          )}
        </div>
      </div>
    </SolutionLayout>
  );
};
