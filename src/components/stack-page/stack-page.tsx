import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack.module.css";
import { ChangeEvent } from "react";
import { Stack } from "./stack";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay, disableButtonSetter } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [stack, setStack] = useState(new Stack<string>());
  const [contentArray, setContentArray] = useState<Array<string>>([]);
  const [circleState, setCircleState] = useState<number | null>(null);
  const [loader, setLoader] = useState({
    addButton: false,
    deleteButton: false,
    clearButton: false,
  });
  function handleInputChanger(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  async function stackPush() {
    setLoader({ ...loader, addButton: true });
    stack.push(inputValue);
    setContentArray([...stack.getItems()]);
    setCircleState(contentArray.length);
    await delay(DELAY_IN_MS);
    setCircleState(null);
    setLoader({ ...loader, addButton: false });
    setInputValue("");
  }
  async function stackPop() {
    setLoader({ ...loader, deleteButton: true });
    setCircleState(contentArray.length - 1);
    await delay(DELAY_IN_MS);
    setCircleState(null);
    stack.pop();
    setContentArray([...stack.getItems()]);
    setLoader({ ...loader, deleteButton: false });
  }
  async function stackClear() {
    setLoader({ ...loader, clearButton: true });
    stack.clear();
    setContentArray([...stack.getItems()]);
    await delay(DELAY_IN_MS);
    setLoader({ ...loader, clearButton: false });
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.stackButtonContainer}>
        <Input
          value={inputValue}
          onChange={handleInputChanger}
          extraClass={styles.stackInput}
          maxLength={4}
          isLimitText={true}
        />
        <Button
          isLoader={loader.addButton}
          disabled={!inputValue || disableButtonSetter("addButton", loader)}
          onClick={stackPush}
          text="Добавить"
        />
        <Button
          isLoader={loader.deleteButton}
          disabled={
            !contentArray.length || disableButtonSetter("deleteButton", loader)
          }
          onClick={stackPop}
          text="Удалить"
        />
        <Button
          isLoader={loader.clearButton}
          disabled={
            !contentArray.length || disableButtonSetter("clearButton", loader)
          }
          onClick={stackClear}
          extraClass="ml-20"
          text="Очистить"
        />
      </div>
      <div className={styles.stackContentContainer}>
        {contentArray.map((item, index) => {
          return (
            <Circle
              head={index === contentArray.length - 1 ? "top" : ""}
              letter={item}
              key={index}
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
