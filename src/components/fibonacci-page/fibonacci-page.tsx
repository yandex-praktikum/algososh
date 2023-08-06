import React, { useState, useEffect } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import styles from './fibonacci.module.css';
import { v4 as uuidv4 } from "uuid";

export const FibonacciPage: React.FC = () => {
  const [data, setData] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const maxNumber = 19;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const delay = (delayInms: number) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  }

  const calculateFibonacci = async (index: number) => {
    const fibonacci: number[] = [];

    for (let i = 0; i <= index; ++i) {
      let result = 1;
      if (i >= 2) {
        result = fibonacci[i - 1] + fibonacci[i - 2];
      }
      fibonacci.push(result);
      await delay(SHORT_DELAY_IN_MS);
      setData([...fibonacci]);
    }

  }

  const onFibonacciClick = async () => {
    setLoading(true);
    await calculateFibonacci(Number(inputValue));
    setLoading(false);
  }

  useEffect(() => {
    return () => setData([]);
  }, [])

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <Input value={inputValue} onChange={onChange} max={maxNumber} min={1} isLimitText type='number' disabled={loading} />
        <Button text="Рассчитать" type="button" onClick={onFibonacciClick} isLoader={loading} disabled={loading || Number(inputValue) < 1 || Number(inputValue) > 19} />
      </div>
      <div className={styles.circles}>
        {data.map((symbol, index) => <Circle key={uuidv4()} letter={`${symbol}`} index={index} />)}
      </div>
    </SolutionLayout>
  );
};
