import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { FlexForm } from "../flex-form/flex-form";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import styles from './fibonacci-page.module.css';
import { wait } from "../../utils/utils";

export const FibonacciPage: React.FC = () => {

  const [inputFibNum, setInputFibNum] = React.useState<number>(0);
  const [fibonacciArr, setFibonacciArr] = React.useState<number[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onChange = React.useCallback((evt) => {
    setInputFibNum(parseInt(evt.target.value));
  }, [])

  const onSubmit = React.useCallback(async (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    const fibArr: number[] = [];
    setFibonacciArr(fibArr);
    for (let i = 0; i <= inputFibNum; i++) {
      await wait(500);
      fibArr.push(fibonacciCalc(i));
      setFibonacciArr([...fibArr]);
    }
    setIsLoading(false);
  }, [inputFibNum])

  const fibonacciCalc = React.useCallback((num: number): number => {
    let prev: number = 1;
    let prePrev: number = 1;
    let res: number = 1;

    if (num < 0 || num > 19) return -1;
    if (num === 0 || num === 1) return 1;

    for (let i = 2; i <= num; i++) {
      res = prev + prePrev;
      prePrev = prev;
      prev = res;
    }

    return res;
  }, [])

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <FlexForm onSubmit={onSubmit}>
        <Input type='number' max={19} min={0} isLimitText={true} onChange={onChange} value={inputFibNum} placeholder='Введите значение' extraClass={`${styles.input} mr-6`} />
        <Button text='Рассчитать' isLoader={isLoading} disabled={inputFibNum < 0 || inputFibNum > 19} type='submit' />
      </FlexForm>
      <div className={styles.circlesContainer} >
        {!!fibonacciArr?.length && fibonacciArr.map((fibVal, index) => {
          return (<Circle key={index + fibVal} letter={fibVal.toString()} index={index} extraClass="mr-8 mt-25" />)
        })}
      </div>
    </SolutionLayout>
  );
};
