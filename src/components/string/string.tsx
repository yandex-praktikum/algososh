import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { swap } from "../../functions/functions";

export const StringComponent: React.FC = () => {
  const [arrLetters, setArrLetters] = useState<{ value: string, color: ElementStates }[]>()
  const [isSorting, setIsSorting] = useState<boolean>(false)

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
    }
  }

  useEffect(() => {
    console.log('effect', arrLetters);
  }, [arrLetters, isSorting])

  console.log('return', arrLetters);

  return (
    <SolutionLayout title="Строка" extraClass="row">
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12
      }}>
        <Input
          isLimitText
          maxLength={11}
          style={{ width: '377px' }}
          onChange={(e) => onChange(e)}
          name="input" />
        {(arrLetters) && <Button text="Развернуть" onClick={(e) => handleButtonClick(e, arrLetters)} />}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12
      }}>
        {(arrLetters) ? arrLetters.map((el, i) => <Circle key={i} letter={el.value} state={el.color} />) : null}
      </div>

    </SolutionLayout>
  );
};


/*  e.preventDefault();
    console.log('arr', arr)
    reversArr = arr?.reverse()
    setArrLetters((reversArr)?[...reversArr]:undefined) 
    if (!arr) {
      return
    }
    let reversArr: string[] = [];
     for (let i = arr?.length - 1; i >= 0; --i) {
 
       reversArr?.push(arr[i]);
 
       console.log('revers', reversArr);
 
       setArrLetters((reversArr) ? [...reversArr] : undefined)
 
     } 
     for(let i=0; i<arr.length-1; i++) {
      
      const elem =arr[arr.length-1 - i];
      arr[arr.length-1 - i] = arr[i];
      arr[i] = elem;
    } 
    let newArr: string[] = [];
    async function revers(arr: string[]):Promise<string[]> {
      console.log('v');

  if (!arr.length) {
    return newArr;
  }

  newArr.push(arr[arr.length - 1]);
  arr.pop();

  
  await new Promise(resolve => setTimeout(resolve, 1000));

  return revers(arr); 
    }
    
    revers(arr)
    console.log('rev', newArr);
    setArrLetters([...newArr])*/

/* const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, arrLetters: string[]) => {
  e.preventDefault();
  if (arrLetters && arrLetters.length > 0) {
    await reverseArrayRecursively(arrLetters);
  }
};
 
const reverseArrayRecursively = async (arr: string[]) => {
  const reversedArr: string[] = [];
 
  const reverseStep = async (index: number) => {
    if (index < 0) {
      setArrLetters(reversedArr);
    } else {
      reversedArr.push(arr[index]);
      const tempArr = arr.slice();
      const temp = arr[arr.length - 1 - index]
      tempArr[arr.length - 1 - index] = arr[index]
      tempArr[index] = temp;
      console.log(tempArr);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      await reverseStep(index - 1);
    }
  };
 
  await reverseStep(arr.length - 1);
}; */