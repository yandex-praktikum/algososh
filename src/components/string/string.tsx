import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import styles from "./string.module.css"
import { useForm } from "../hooks/useForm"


export const StringComponent: React.FC = () => {

  type TFormData = {
    [key: string]: string;
  }

  type TElement = {
    value: string;
    color: ElementStates
  }

  const { values, handleChange } = useForm<TFormData>({ sourceString: '' });
  const [loader, setLoader] = useState<boolean>(false);
  const [strArray, setStrArray] = useState<TElement[]>([]);

  const swapElements = (arr: TElement[], firstIndex: number, secondIndex: number) => {

    const tmp = arr[firstIndex];    
       
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = tmp;

    return arr;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const newArr = values.sourceString.split('').map((value => ({ value, color: ElementStates.Default })));
    reverse(newArr);
  }

  const reverse = async (arr: TElement[]) => {
    setLoader(true);
    const middle = Math.round(arr.length / 2);

    for (let i = 0; i < middle; i++) {
      let j = arr.length - 1 - i;

      if (i !== j) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setStrArray([...arr]);
        await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
      };

      swapElements(arr, i, j); 

      arr[i].color = ElementStates.Modified;
      arr[j].color = ElementStates.Modified;

      setStrArray([...arr]);
    }

    setLoader(false);
  };
  
  

  return (
    <SolutionLayout title="Строка">
      <section className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            isLimitText={true}
            maxLength={11}
            value={values.sourceString}
            onChange={handleChange}
            name={"sourceString"}
          />
          <Button
            extraClass={styles.button}
            text="Развернуть"
            type='submit'
            isLoader={loader}
            disabled={values.sourceString.length < 2}
          />
        </form>
        <ul className={styles.circleList}>
          {strArray && strArray.map((item, index) => (
            <li key={index}>
              <Circle
                letter={item.value}
                state={item.color}
              />
            </li>
          ))
          }
        </ul>
      </section>
    </SolutionLayout>
  );
};
