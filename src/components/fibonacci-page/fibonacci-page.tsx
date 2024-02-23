import React, { useCallback, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { fib } from "../../functions/functions";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [elem, setElem] = useState<number>()
  const [arrFib, setArrFib] = useState<number[]>([])

  function onChange(e: React.FormEvent<HTMLInputElement>) {
    const value = Number((e.target as HTMLInputElement).value);
    console.log(value);

    setElem(value);
  }
  const handlerButtonClick = useCallback(() => {
    if (elem !== undefined) {
      let result: number[] = fib(elem)
      result.forEach((el, i) => setTimeout(() => { setArrFib((prev) => [...prev, el]) }, i*500));
    }
  }, [elem]);

  useEffect(() => {
    console.log(arrFib);

  }, [arrFib])
// ввести проверку 1<elem<=19
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12
      }}>
        <Input type="number" min={1} max={19} isLimitText onChange={(e) => onChange(e)} />
        <Button text="Рассчитать" onClick={handlerButtonClick} />
      </div>
      <div style={{
        width: '100%',
        maxWidth: '1150px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: 'auto',
        gap: 35
      }}>
        {arrFib.map((el, i) => <Circle key={i} index={i} letter={`${el}`} />)}
      </div>

    </SolutionLayout>
  );
};
