import React, { SyntheticEvent, useState } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./fibonacci-page.module.css";

export const FibonacciPage: React.FC = () => {
  const [valueInput, setValueInput] = useState<string | number>('');
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [list, setList] = useState<Array<number>>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value);
  }
  // вычесляю последовательность фибоначи (сделал итеративно, ибо рекурсию мой калькулятор на 9 элементе уже не считает)
  function  getFibonacciNumbers(n: number): Array<number> {
    const counter = [1, 1];
    if (n === 1) {
      return [counter.shift()!];
    }
    if (n === 2) {
      return counter;
    }
    for (let i = 3; i <= n; i++) {
        const element = counter[i-3] + counter[i-2];
        counter.push(element);
    }
    return counter;
  } 

  const addFibonacci = async() => {
    const arr = getFibonacciNumbers(Number(valueInput) + 1)
    const tempArr: Array<number> = [];
    while (arr.length) {
      const temp = arr.shift()!;
      tempArr.push(temp)
      setList([...tempArr]);
      await delay(DELAY_IN_MS)
    }
  }
  
  const handleClick = async (event: SyntheticEvent) => {
    event.preventDefault();
    setIsLoad(true);
    setList([]);
    await addFibonacci();
    setIsLoad(false);
    setValueInput('');
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={style.content}>
        <Input  value={valueInput} isLimitText={true} max={19} maxLength={2} extraClass={'mr-4'} onChange={handleChange} type="number"/>
        <Button  text={'Развернуть'} isLoader={isLoad} disabled={valueInput === '' || valueInput >= 20 || valueInput < 1} onClick={handleClick} />
      </div>
      <ul className={style.list} style={list?.length < 11 ? { justifyContent: 'center' } : { justifyContent: 'flex-start' }}>
       {list?.map((item, index) => (
          <li key = {index}>
            <Circle
              letter={item + ''}
              index={index}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
