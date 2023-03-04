import { FC, useState, useRef } from "react";
import { useForm } from "../../hooks/useForm";
import { Functions, ElementStates } from "../../types";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Scroll } from "../ui/scroll/scroll";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { setDelay } from "../../utils-common/utils-common";
import styles from "./stack-page.module.css";

export const StackPage: FC = () => {
  const stackRef = useRef(new Stack());
  const { values, handleChange, clearValue } = useForm({ value: "" });
  const value =
    typeof values["value"] !== "string"
      ? String(values["value"])
      : values["value"];
  const [result, setResult] = useState<string[]>([]);
  const [action, setAction] = useState<Functions>(Functions.Waiting);
  const [loader, setLoader] = useState<boolean>(false);
  const [instant, setCurr] = useState<number>(-1);

  const showResult = () => {
    const stack = stackRef.current.toArray();
    setResult(stack.length > 0 ? stack.map((item) => String(item)) : []);
  };

  const handleAddClick = async () => {
    setLoader(true);
    stackRef.current.push(value);
    setCurr(stackRef.current.lastIndex);
    setAction(Functions.AddToTail);
    clearValue("value");
    showResult();

    await setDelay(DELAY_IN_MS);

    setCurr(-1);
    setAction(Functions.Waiting);
    setLoader(false);
    showResult();
  };

  const handleDeleteClick = async () => {
    setLoader(true);
    setCurr(stackRef.current.lastIndex);
    setAction(Functions.DeleteFromTail);

    await setDelay(DELAY_IN_MS);

    stackRef.current.pop();
    setCurr(-1);
    setAction(Functions.Waiting);
    setLoader(false);
    showResult();
  };

  const handleClearClick = () => {
    clearValue("value");
    stackRef.current.clear();
    showResult();
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.panel} onSubmit={(e) => e.preventDefault()}>
        <fieldset className={styles.panel__group}>
          <Input
            type={"text"}
            maxLength={4}
            isLimitText={true}
            value={value}
            name={"value"}
            onChange={handleChange}
            disabled={loader}
          />
          <Button
            type={"button"}
            text={"Добавить"}
            onClick={handleAddClick}
            isLoader={loader && action === Functions.AddToTail}
            disabled={
              value.length === 0 || (loader && action !== Functions.AddToTail)
            }
          />
          <Button
            type={"button"}
            text={"Удалить"}
            onClick={handleDeleteClick}
            isLoader={loader && action === Functions.DeleteFromTail}
            disabled={
              result.length === 0 ||
              (loader && action !== Functions.DeleteFromTail)
            }
          />
        </fieldset>
        <Button
          type={"button"}
          text={"Очистить"}
          onClick={handleClearClick}
          disabled={loader || result.length === 0}
        />
      </form>

      <Scroll>
        <ul className={styles.results}>
          {result.length > 0 &&
            result.map((item, index) => {
              return (
                <li key={index}>
                  <Circle
                    letter={item}
                    index={index}
                    head={index === result?.length - 1 ? "top" : undefined}
                    state={
                      index === instant
                        ? ElementStates.Changing
                        : ElementStates.Default
                    }
                  />
                </li>
              );
            })}
        </ul>
      </Scroll>
    </SolutionLayout>
  );
};
