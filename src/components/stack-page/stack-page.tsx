import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import styles from "./stack-page.module.css"
import { Circle } from "../ui/circle/circle"
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { STACK_STRING_MAX_LENGTH, STACK_MAX_LENGTH } from "../../constants/restrictions"
import { ElementStates } from "../../types/element-states";
import { TFormData } from "../../types/form"
import { useForm } from "../../components/hooks/useForm"
import { Stack } from "./utils";

const stack = new Stack<string>();

export const StackPage: React.FC = () => {

  const { values, handleChange } = useForm<TFormData>({ sourceString: '' });
  const [loader, setLoader] = useState<boolean>(false);
  const [arr, setArr] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [state, setState] = useState(ElementStates.Default)

  const add = async () => {
    console.log("add action: values.sourceString: ", values.sourceString);

    if (values.sourceString && stack.size <= STACK_MAX_LENGTH) {
      stack.push(values.sourceString);
      setArr([...stack.getItems]);
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      switchState();
      values.sourceString = '';
      setCurrentIndex(stack.size);
    }
   
  }

  const remove = async () => {
    if (stack.size > 0) {
      switchState();
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      stack.pop();
      setArr([...stack.getItems]);
      setCurrentIndex(stack.size);
    }
  }

  const clear = () => {
    console.log("clear action: stack.size: ", stack.size);
    if (stack.size > 0) {
      stack.clear();
      setArr([...stack.getItems]);
      setCurrentIndex(-1);
    }
  }

  const switchState = async () => {
    setState(ElementStates.Changing)
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setState(ElementStates.Default)
  }

  return (
    <SolutionLayout title="Стек">
      <section className={styles.main}>
        <form className={styles.form}>
          <Input
            extraClass={styles.inputWidth}
            isLimitText={true}
            maxLength={STACK_STRING_MAX_LENGTH}
            value={values.sourceString}
            onChange={handleChange}
            name={"sourceString"}
          />
          <Button
            extraClass={`${styles.button} ${styles.ml_50}`}
            text="Добавить"
            isLoader={loader}
            disabled={values.sourceString.length < 1}
            onClick={() => add()}
          />
          <Button
            extraClass={styles.button}
            text="Удалить"
            isLoader={loader}
            disabled={arr.length < 1}
            onClick={() => remove()}
          />
          <Button
            extraClass={`${styles.button} ${styles.ml_80}`}
            text="Очистить"
            isLoader={loader}
            onClick={() => clear()}
            disabled={values.sourceString.length < 1 && arr.length < 1}
          />
        </form>
        <ul className={styles.columnList}>
          {arr && arr.map((item, index) => (
            <li key={index}>
              <Circle
                index={index}
                state={index === currentIndex - 1 ? state : ElementStates.Default}
                head={index === currentIndex - 1 ? 'top' : ''}
                letter={item}
              />
            </li>
          ))
          }
        </ul>
      </section>
    </SolutionLayout>
  );
};
