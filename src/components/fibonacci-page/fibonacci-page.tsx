import React, {useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import fibonacciStyles from "./fibonacciStyles.module.css"
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import {delay} from '../../utils/constDelay';

export const FibonacciPage: React.FC = () => {
  const [fibonacciArr, setFibonacciArr] = useState<number[]>([]); // начальное состояние функции и его обновление, возвращает массив чисел
  const [input, setInput] = useState<number | string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(Number(e.currentTarget.value))
  }

  const fibonacciHandler = async (input: number) => {
    setIsLoading(true)
    let fibArr: number[] = [0, 1];
    for (let i = 2; i <= input; i++) {
      const a = fibArr[i - 1];
      const b = fibArr[i - 2];
      fibArr.push(a + b);
    }
    for (let i = 0; i < input; i++) {
      fibArr.push(fibArr[i - 2] + fibArr[i - 1]); // добавляет следующий элемент последовательности
      setFibonacciArr(fibArr.slice(0, i + 1))
      await delay(500)
  }
    setIsLoading(false)
  };

    const handleClick= (e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>) =>  {
      e.preventDefault();
      fibonacciHandler(Number(input));
      setInput('');
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={fibonacciStyles.form}>
        <Input
            min={1}
            max={19}
            type="number"
            placeholder="Введите число"
            isLimitText={true}
            value={input}
            onChange={handleChangeInput}
        />
        <Button
            text="Рассчитать"
            isLoader={isLoading}
            disabled={!input || input > 19}
            onClick={handleClick}
        />
      </form>
      <div className={fibonacciStyles.circles}>
        {fibonacciArr && fibonacciArr.map((item, index) => {
          return <Circle letter={`${item}`} key={index} index={index}/>
        })}
      </div>
    </SolutionLayout>
  );
};
