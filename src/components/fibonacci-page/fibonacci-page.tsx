import { FC, useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fib.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { onSubmit } from "../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: FC = () => {
  const [fibArr, setFibArr] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<number | string>("");

  const [disableButton, setDisableButton] = useState(true);
  const [disableInput, setDisableInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value: number = Number(evt.target.value);

    if (value && !isNaN(value)) {
      setDisableButton(false);
      if (value < 20) {
        setInputValue(value);
      }
    } else {
      if (value === 0) {
        setInputValue(0);
      }
      setDisableButton(true);
    }
  };

  const delay = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const onClick = () => {
    const fibonacci = async (num: number) => {
      const arrFib: number[] = [];
      let time = SHORT_DELAY_IN_MS;

      setIsLoading(true);
      setDisableInput(true);

      for (let i = 0; i <= num; i++) {
        if (i === 0) {
          arrFib.push(i);
          setFibArr([...arrFib]);
        } else if (i === 1) {
          arrFib.push(i);
          setFibArr([...arrFib]);
        } else if (i > 1) {
          arrFib.push(arrFib[i - 2] + arrFib[i - 1]);
          setFibArr([...arrFib]);
        }

        if (i === num) {
          setIsLoading(false);
          setDisableButton(false);
          setDisableInput(false);
        }
        await delay(time);
      }
    };

    fibonacci(inputValue as number);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.input} onSubmit={onSubmit}>
        <Input
          maxLength={19}
          max={19}
          min={1}
          type={"number"}
          placeholder="Введите число"
          isLimitText={true}
          id="fibonacci"
          onChange={onChange}
          value={inputValue || ""}
          disabled={disableInput}
        />
        <Button
          onClick={onClick}
          text={"Рассчитать"}
          disabled={disableButton}
          isLoader={isLoading}
        />
      </form>
      <div className={styles.numbers}>
        {fibArr.map((item, index) => {
          return <Circle letter={"" + item} key={index} index={index} />;
        })}
      </div>
    </SolutionLayout>
  );
};
