import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci.module.css"
import { useForm } from "../hooks/useForm"
import { TFormData } from "../../types/form"
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { FIBONACCI_MAX_NUMBER } from "../../constants/restrictions"
import { getFibonacciSequence } from "./utils"

export const FibonacciPage: React.FC = () => {
  const { values, handleChange } = useForm<TFormData>({ sourceString: '' });
  const [loader, setLoader] = useState<boolean>(false);
  const [strArray, setStrArray] = useState<string[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();    
    doProcess()
  };

  const doProcess = async () => {
    setLoader(true);
    const maxIndex = Number(values.sourceString);
    const arr: string[] = [];

    for (let i = 1; i <= maxIndex + 1; i++) {
      arr.push(String(getFibonacciSequence(i)))
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      setStrArray([...arr]);    
    }

    setLoader(false)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <section className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            type="number"
            isLimitText={true}
            max={FIBONACCI_MAX_NUMBER}
            value={values.sourceString}
            onChange={handleChange}
            name={"sourceString"}
          />
          <Button
            extraClass={styles.button}
            text="Развернуть"
            type='submit'
            isLoader={loader}
            disabled={Number(values.sourceString) < 1 || Number(values.sourceString) > FIBONACCI_MAX_NUMBER}
          />
        </form>
        <div className={styles.circleContainer}>
          <ul className={styles.circleList}>
            {strArray && strArray.map((item, index) => (
              <li key={index}>
                <Circle
                  index={index}
                  letter={item}
                />
              </li>
            ))
            }
          </ul>
        </div>
      </section>
    </SolutionLayout>
  );
};
