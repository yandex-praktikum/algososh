import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./queue-page.module.css";
import { Circle } from "../ui/circle/circle";
import { Queue } from "./queue";
import { ChangeEvent } from "react";
import { ElementStates } from "../../types/element-states";
import { delay, disableButtonSetter } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
export const QueuePage: React.FC = () => {
  const [arr, setArr] = useState(new Queue<string>(7));
  const [inputValue, setInputValue] = useState("");
  const [circleState, setCircleState] = useState<number | null>(null);
  const [contentArray, setContentArray] = useState<Array<string | null>>([
    ...arr.getItems(),
  ]);
  const [loader, setLoader] = useState({
    addButton: false,
    deleteButton: false,
    clearButton: false,
  });

  async function enqueue() {
    setLoader({ ...loader, addButton: true });
    setCircleState(arr.tail % arr.size);
    arr.enqueue(inputValue);
    setContentArray([...arr.getItems()]);
    await delay(DELAY_IN_MS);
    setCircleState(null);
    setInputValue("");
    setLoader({ ...loader, addButton: false });
  }

  async function dequeue() {
    setLoader({ ...loader, deleteButton: true });
    setCircleState(arr.head);
    await delay(DELAY_IN_MS);
    arr.dequeue();
    setContentArray([...arr.getItems()]);
    setCircleState(null);
    setLoader({ ...loader, deleteButton: false });
  }

  async function queueClear() {
    setLoader({ ...loader, clearButton: true });
    arr.clear();
    setContentArray([...arr.getItems()]);
    await delay(DELAY_IN_MS);
    setLoader({ ...loader, clearButton: false });
  }

  function handleInputChanger(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.queueButtonContainer}>
        <Input
          value={inputValue}
          onChange={handleInputChanger}
          extraClass={styles.queueInput}
        />
        <Button
          disabled={
            !inputValue ||
            arr.tail === 7 ||
            disableButtonSetter("addButton", loader)
          }
          onClick={enqueue}
          text="Добавить"
          isLoader={loader.addButton}
        />
        <Button
          isLoader={loader.deleteButton}
          disabled={!arr.lenght || disableButtonSetter("deleteButton", loader)}
          onClick={dequeue}
          text="Удалить"
        />
        <Button
          isLoader={loader.clearButton}
          disabled={!arr.lenght || disableButtonSetter("clearButton", loader)}
          onClick={queueClear}
          extraClass="ml-20"
          text="Очистить"
        />
      </div>
      <div className={styles.queueContentContainer}>
        {contentArray.map((item, index) => {
          return (
            <Circle
              head={item && index === arr.head ? "head" : ""}
              tail={item && index === arr.tail - 1 ? "tail" : ""}
              key={index}
              letter={item ? item : ""}
              index={index}
              state={
                circleState === index
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
