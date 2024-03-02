import React, { useCallback, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { fib } from "../../functions/functions";
import { Circle } from "../ui/circle/circle";
import styles from './fibonacci.module.css'

export const FibonacciPage: React.FC = () => {
  const [elem, setElem] = useState<number>()
  const [arrFib, setArrFib] = useState<number[]>([])
  const [isLoader, setIsLoader] = useState<boolean>(false)

  function onChange(e: React.FormEvent<HTMLInputElement>) {
    const value = Number((e.target as HTMLInputElement).value);
    setElem(value);
  }

  const handlerButtonClick = useCallback(async () => {
    setIsLoader(true);
    if (elem !== undefined) {
      let result: number[] = fib(elem);
      const promises = result.map((el, i) => new Promise<void>(resolve => {
        setTimeout(() => {
          setArrFib(prev => [...prev, el]);
          resolve();
        }, i * 500);
      }));
      await Promise.all(promises);
    }
    setIsLoader(false);
  }, [elem]);

  useEffect(() => {
  }, [arrFib])
  // ввести проверку 1<elem<=19
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={`${styles.form}`} onSubmit={(e)=> {e.preventDefault(); handlerButtonClick()}} >
        <Input type="number" min={1} max={19} isLimitText onChange={(e) => onChange(e)} />
        <Button text="Рассчитать" onClick={handlerButtonClick} isLoader={isLoader} />
      </form>
      <div className={`${styles.container}`} >
        {arrFib.map((el, i) => <Circle key={i} index={i} letter={`${el}`} />)}
      </div>

    </SolutionLayout>
  );
};
