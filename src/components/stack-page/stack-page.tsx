import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack.module.css";
import { ChangeEvent } from "react";
import { Stack } from "./stack";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import ArrowIcon from "../../utils/arrowIcon";
export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [stack, setStack] = useState(new Stack<string>());
  const [contentArray, setContentArray] = useState<Array<string>>([]);
  const [circleState, setCircleState] = useState<number | null>(null);

  function handleInputChanger(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  async function stackPush() {
    stack.push(inputValue);
    setContentArray([...stack.getItems()]);
    setCircleState(contentArray.length);
    await delay(SHORT_DELAY_IN_MS);
    setCircleState(null);
    setInputValue("");
  }
  async function stackPop() {
    setCircleState(contentArray.length - 1);
    await delay(SHORT_DELAY_IN_MS);
    setCircleState(null);
    stack.pop();
    setContentArray([...stack.getItems()]);
  }
  function stackClear() {
    stack.clear();
    setContentArray([...stack.getItems()]);
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
        <Button onClick={stackPush} text="Добавить" />
        <Button onClick={stackPop} text="Удалить" />
        <Button onClick={stackClear} extraClass="ml-20" text="Очистить" />
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
