import React, { useState, useEffect } from "react";
import styles from './fibonacci-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { getFibonacciNumbers } from "./util";


export const FibonacciPage: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [number, setNumber] = useState<string>('');
  const [isValid, setIsValid] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  useEffect(() => {
    setIsValid(+number < 20 && +number > 0);
    const interval = setInterval(() => {
      if (isButtonPressed && (index < (getFibonacciNumbers(+number).length - 1))) {
        setIndex(prev => prev + 1);
        setIsLoader(true)
      }
    }, 500);
    if (index === (getFibonacciNumbers(+number).length - 1)) {
      setIsLoader(false)
    }

    return () => { clearInterval(interval); }

  }, [isButtonPressed, index, number])

  const handleInput = (evt: React.FormEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    setNumber(target.value)
    
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <Input max={19} type={"number"} isLimitText={true} onChange={(evt) => handleInput(evt) } />
        < Button text={'Развернуть'} isLoader={isLoader ? true : false} disabled = {!isValid} onClick={() => {
          setIsButtonPressed(true)
        }} />
      </div>
      <div className={styles.letterContainer}>
        {isValid && isButtonPressed && < CircleComponent number={getFibonacciNumbers(+number)[index]} />}
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