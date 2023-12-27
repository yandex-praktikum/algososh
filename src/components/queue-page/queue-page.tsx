import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import styles from "./queue-page.module.css"
import { Circle } from "../ui/circle/circle"
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { QUEUE_MAX_SIZE, QUEUE_STRING_MAX_LENGTH } from "../../constants/restrictions"
import { ElementStates } from "../../types/element-states";
import { TFormData } from "../../types/form"
import { useForm } from "../../components/hooks/useForm"
import { Queue } from "./utils";

const queue = new Queue<string>(QUEUE_MAX_SIZE);

export const QueuePage: React.FC = () => {

  const { values, handleChange } = useForm<TFormData>({ sourceString: '' });
  const [loader, setLoader] = useState<boolean>(false);
  const [arr, setArr] = useState<(string | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  useEffect(() => {
    setArr(Array(QUEUE_MAX_SIZE).fill(null))
  }, []);


  const add = async () => {
    if (values.sourceString && queue.getLength < QUEUE_MAX_SIZE) {
      setLoader(true)
      queue.enqueue(values.sourceString);
      values.sourceString = '';
      setCurrentIndex(queue.tail);
      setArr([...queue.getItems]);
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      setCurrentIndex(-1);
      setLoader(false)
    } 
  }

  const remove = async () => {
    if (queue.getLength > 0) {
      setLoader(true)
      setCurrentIndex(queue.head);
      queue.dequeue();
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      setArr([...queue.getItems]);
      setCurrentIndex(-1);
      setLoader(false)
    }
  }

  const clear = () => {
    if (queue.getLength > 0) {
      setLoader(true)
      queue.clear();
      setArr([...queue.getItems]);
      setCurrentIndex(-1);
      setLoader(false)
    }
  }

  return (

    <SolutionLayout title="Очередь">
      <section className={styles.main}>
        <form className={styles.form}>
          <Input
            extraClass={styles.inputWidth}
            isLimitText={true}
            maxLength={QUEUE_STRING_MAX_LENGTH}
            value={values.sourceString}
            onChange={handleChange}
            name={"sourceString"}
            disabled={loader}
          />
          <Button
            extraClass={`${styles.button} ${styles.ml_50}`}
            text="Добавить"
            isLoader={loader}
            disabled={values.sourceString.length < 1 || queue.tail == QUEUE_MAX_SIZE - 1}
            onClick={() => add()}
          />
          <Button
            extraClass={styles.button}
            text="Удалить"
            isLoader={loader}
            disabled={queue.getLength === 0}
            onClick={() => remove()}
          />
          <Button
            extraClass={`${styles.button} ${styles.ml_80}`}
            text="Очистить"
            isLoader={loader}
            onClick={() => clear()}
            disabled={queue.getLength === 0}
          />
        </form>
        <ul className={styles.columnList}>
          {arr && arr.map((item, index) => (
            <li key={index}>
              <Circle
                index={index}
                state={currentIndex === index ? ElementStates.Changing : ElementStates.Default}
                head={queue.getLength && queue.head === index ? 'head' : ''}
                tail={queue.getLength && queue.tail === index ? 'tail' : ''}
                letter={item as string | undefined}
              />
            </li>
          ))
          }
        </ul>
      </section>
    </SolutionLayout>
  );
};
