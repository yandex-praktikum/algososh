import { useEffect, useRef, useState, FC } from "react";
import { calculateFibonacciNumbers } from "./utils";
import { useForm } from "../../hooks/useForm";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import styles from "./fibonacci-page.module.css";

export const FibonacciPage: FC = () => {
  const fibonacciNumbers = useRef<number[]>([]);
  const timerId = useRef<NodeJS.Timeout>();
  const { values, handleChange } = useForm({ value: 0 });
  const value =
    typeof values["value"] !== "number"
      ? Number.parseInt(values["value"])
      : values["value"];
  const [loader, setLoader] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  const showResult = () => {
    timerId.current = setInterval(() => {
      setStep((prevStep) => {
        const nextStep = prevStep + 1;
        if (nextStep >= fibonacciNumbers.current.length && timerId.current) {
          setLoader(false);
          clearInterval(timerId.current);
        }

        return nextStep;
      });
    }, SHORT_DELAY_IN_MS);
  };

  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    fibonacciNumbers.current = calculateFibonacciNumbers(value);
    setStep(0);
    setLoader(true);
    showResult();
  };

  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, []);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form}>
        <Input
          type={"number"}
          max={19}
          isLimitText={true}
          value={value}
          name={"value"}
          onChange={handleChange}
          disabled={loader}
        />
        <Button
          type={"submit"}
          text={"Рассчитать"}
          onClick={handleClick}
          disabled={value > 0 && value <= 19 ? false: true}
          isLoader={loader}
        />
      </form>
      <ul className={styles.results}>
        {fibonacciNumbers.current.length > 0 &&
          fibonacciNumbers.current.slice(0, step).map((item, index) => {
            return (
              <li key={index}>
                
                <Circle letter={item.toString()} index={index} />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
