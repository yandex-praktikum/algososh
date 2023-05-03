import { FC, ChangeEvent, FormEvent, useRef, useState } from "react";
import styles from "./stack.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Stack } from "./stack";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { IStackState } from "../../types/stack";

export const StackPage: FC = () => {
  const [value, setValue] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const stack = useRef(new Stack<typeof value>());
  const [stackState, setStackState] = useState<IStackState<typeof value>[]>([]);

  const addItem = (e: FormEvent, item: typeof value) => {
    e.preventDefault();
    if (!value || stackState.length > 19 || isLoad) return;
    setIsLoad(true);
    stack.current.push(value);
    const stackStateCopy = [...stackState];
    stackStateCopy.push({ item: item, state: ElementStates.Changing });
    const index = stackStateCopy.length - 1;
    setStackState([...stackStateCopy]);
    setTimeout(() => {
      stackStateCopy[index].state = ElementStates.Default;
      setStackState([...stackStateCopy]);
      setIsLoad(false);
    }, SHORT_DELAY_IN_MS);
    setValue("");
  };

  const deleteItem = () => {
    stack.current.pop();
    const stackStateCopy = [...stackState];
    stackStateCopy.pop();
    setStackState([...stackStateCopy]);
  };

  return (
    <SolutionLayout title="Стек">
      <section className={styles.main}>
        <form className={styles.form} onSubmit={(e) => addItem(e, value)}>
          <Input
            isLimitText={true}
            maxLength={4}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            value={value}
          />
          <Button
            disabled={value.length <= 0 || stackState.length > 19 || isLoad}
            onClick={(e) => {
              addItem(e, value);
            }}
            isLoader={false}
            text={"Добавить"}
          />
          <Button
            disabled={stack.current.getSize() <= 0 || isLoad}
            onClick={deleteItem}
            isLoader={false}
            text={"Удалить"}
          />
          <div className={styles.clear}>
            <Button
              disabled={stack.current.getSize() <= 0 || isLoad}
              text={"Очистить"}
              onClick={() => {
                stack.current.clear();
                setStackState([]);
              }}
            />
          </div>
        </form>
        <ul className={styles.stack}>
          {stackState.map((item, index) => (
            <li key={index} className={styles.item}>
              <Circle
                state={item.state}
                index={index}
                letter={item.item}
                head={stackState.length - 1 === index ? "top" : ""}
              />
            </li>
          ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
