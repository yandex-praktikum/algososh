import React, { useEffect, useRef, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import Stack from "../../class/stack";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export type TElement = {
  value: string,
  color: ElementStates
}

export const StackPage: React.FC = () => {
  const [item, setItem] = useState<string>('')
  const [arr, setArr] = useState<TElement[]>()
  const stackRef = useRef<Stack<TElement>>(new Stack<TElement>())

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setItem((e.target as HTMLInputElement).value)
  }

   const handleClickButtonAdd = async(element: string) => {
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
  }

  const handleClickButtonDel = () => {
    stackRef.current.pop();
    console.log(stackRef.current.arr);    
    setArr([... stackRef.current.arr]);

  }

  const handleClickButtonClear = () => {
    stackRef.current.clear()
    setArr(stackRef.current.arr)
  }

  useEffect(() => {
    console.log('stack', stackRef);
    console.log('arr', arr);

  }, [arr])
  console.log(arr);

  return (
    <SolutionLayout title="Стек">
      <div style={{
        display: 'grid',
        justifyItems: 'center',
        gap: '40px',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 12
        }}>
          <Input maxLength={4} onChange={(e) => onChange(e)} id='input' value={item} />
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '12px'
          }}>
            <Button text="Добавить" onClick={() => handleClickButtonAdd(item)} />
            <Button text="Удалить" onClick={handleClickButtonDel} />
          </div>
          <div style={{
            paddingLeft: '40px',
          }}>
            <Button text="Очистить" onClick={handleClickButtonClear} />
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {arr?.map((elem, i) => <div key={i}>
            <Circle  letter={elem.value} state={elem.color} index={i} head={(i === arr.length-1)?'top': ''} />            
          </div> )}
        </div>
      </div>
    </SolutionLayout>
  );
};
