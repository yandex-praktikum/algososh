import React, { useState, useEffect } from "react";
import styles from './fibonacci-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";


export const FibonacciPage: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [number, setNumber] = useState<number>(0);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  useEffect(() => {

    const interval = setInterval(() => {
      if (isButtonPressed && (index < (getFibonacciNumbers(number).length - 1))) {
        setIndex(prev => prev + 1);
      }
    }, 500);
    if (index === (getFibonacciNumbers(number).length - 1)) {
      setIsLoader(false)
    }

    return () => { clearInterval(interval); }

  }, [isButtonPressed, index, number])
  const getFibonacciNumbers = (number: number) => {
    const array: number[][] = []
    let arr: number[] = [0, 1];
    for (let i = 2; i <= number; i++) {
      arr.push(arr[i - 2] + arr[i - 1])
      array.push([...arr])
    }
    array.unshift([0,1])
    return array;

  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <Input max={19} type={"number"} isLimitText={true} onChange={(evt: any) => {
          if(0 < evt.target.value && evt.target.value < 20){
          setNumber(evt.target.value)}}
        } />
        < Button text={'Развернуть'} isLoader={isLoader ? true : false} onClick={() => {
          setIsButtonPressed(true)
          setIsLoader(true)
        }} />
      </div>
      <div className={styles.letterContainer}>
        {isButtonPressed && < CircleComponent number={getFibonacciNumbers(number)[index]} />}
      </div>
    </SolutionLayout>
  );
};

type CircleComponentProps = {
  number: number[];
}

const CircleComponent = ({ number }: CircleComponentProps) => {
  return (
    <>
      {number.map((item, index) => {
        if (item !== 0) {
          return <Circle letter={item.toString()} tail={(index - 1).toString()} key={index} />
        }
      })}
    </>

  )
} 