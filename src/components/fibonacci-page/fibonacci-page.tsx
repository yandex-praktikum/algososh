import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ChangeEvent } from "react";
import { FormEvent } from "react";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { fibonacci } from "../../utils/fibonacci";
export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState(0);
  const [fibonacciNumber, setFibonacciNumber] = useState<Array<number>>([]);
  const [isLoading, setIsLoading] = useState(false);
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    let value = parseInt(event.target.value);
    setInputValue(value);
  }

  function handleButtonClick(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setFibonacciNumber([]);
    let cur = 0;
    const interval = setInterval(() => {
      if (cur <= inputValue) {
        let fiblist: number = fibonacci(cur);
        setFibonacciNumber((prev) => [...prev, fiblist]);
        cur++;
      } else {
        setIsLoading(false);
        clearInterval(interval);
      }
    }, SHORT_DELAY_IN_MS);
  }
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className="formContent">
        <form onSubmit={handleButtonClick} className="formContainer">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            type="number"
            max={19}
            isLimitText={true}
          />
          <Button
            isLoader={isLoading}
            type="submit"
            disabled={!inputValue}
            text="Рассчитать"
          />
        </form>
        <div className="formContentContainer">
          {fibonacciNumber.map((n, index) => {
            return <Circle key={index} letter={`${n}`} index={index}></Circle>;
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
