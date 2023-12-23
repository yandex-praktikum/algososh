import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css"
import { useForm } from "../hooks/useForm"
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { TElement } from "./utils";
import { TFormData } from "../../types/form"
import { getSourceString, swapElements } from "./utils";
import { STRING_MAX_LENGTH } from "../../constants/restrictions"

export const StringComponent: React.FC = () => {

  const { values, handleChange } = useForm<TFormData>({ sourceString: '' });
  const [loader, setLoader] = useState<boolean>(false);
  const [strArray, setStrArray] = useState<TElement[]>([]);
   
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();        
    reverse(getSourceString(values.sourceString));
  };

  const reverse = async (arr: TElement[]) => {
    setLoader(true);
    const middle = Math.round(arr.length / 2);

    for (let i = 0; i < middle; i++) {
      let j = arr.length - 1 - i;

      if (i !== j) {
        arr[i].state = ElementStates.Changing;
        arr[j].state = ElementStates.Changing;
        setStrArray([...arr]);
        await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
      };

      swapElements(arr, i, j); 

      arr[i].state = ElementStates.Modified;
      arr[j].state = ElementStates.Modified;

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
            maxLength={STRING_MAX_LENGTH}
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
                state={item.state}
              />
            </li>
          ))
          }
        </ul>
      </section>
    </SolutionLayout>
  );
};
