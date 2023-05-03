import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./queue.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Queue } from "./queue";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { IQueueState } from "../../types/queue";

export const QueuePage: React.FC = () => {
  const queue = useRef(new Queue<typeof value>(7));
  const [queueState, setQueueState] = useState<IQueueState<typeof value>[]>([]);
  const [value, setValue] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setQueueState([...setState()]);
  }, []);

  const setState = () => {
    const arr: IQueueState<typeof value>[] = [];
    const queueCopy = queue.current.getElements();
    for (let i = 0; i < queueCopy.length; i++) {
      arr.push({ item: queueCopy[i], state: ElementStates.Default });
    }
    return arr;
  };

  const addItem = (e: FormEvent, item: typeof value) => {
    e.preventDefault();
    if (
      !value ||
      isLoad ||
      queueState[queueState.length - 1].item ||
      queueState[queueState.length - 1].item === ""
    )
      return;
    setIsLoad(true);
    const queueStateCopy = [...queueState];
    queueStateCopy[queue.current.getTailIndex()].state = ElementStates.Changing;
    setQueueState([...queueStateCopy]);
    setTimeout(() => {
      queue.current.enqueue(item);
      queueStateCopy[queue.current.getTailIndex() - 1].item = item;
      setQueueState([...queueStateCopy]);
      setValue("");
      setIsLoad(false);
    }, SHORT_DELAY_IN_MS);
    setTimeout(() => {
      queueStateCopy[queue.current.getTailIndex() - 1].state =
        ElementStates.Default;
      setQueueState([...queueStateCopy]);
    }, DELAY_IN_MS);
  };

  const deleteItem = () => {
    setIsLoad(true);
    const queueStateCopy = [...queueState];
    queueStateCopy[queue.current.getHeadIndex()].state = ElementStates.Changing;
    setQueueState([...queueStateCopy]);
    if (queue.current.getLength() === 1) {
      setTimeout(() => {
        const queueStateCopy = [...queueState];
        queueStateCopy[queue.current.getHeadIndex()].item = "";
        queueStateCopy[queue.current.getHeadIndex()].state =
          ElementStates.Default;
        setQueueState([...queueStateCopy]);
        queue.current.dequeue();
        setIsLoad(false);
      }, SHORT_DELAY_IN_MS);
    } else {
      setTimeout(() => {
        queue.current.dequeue();
        setQueueState([...setState()]);
        setIsLoad(false);
      }, SHORT_DELAY_IN_MS);
    }
  };

  const clearQueue = () => {
    queue.current.clearQueue();
    setQueueState([...setState()]);
  };

  return (
    <SolutionLayout title="Очередь">
      <section className={styles.main}>
        <form className={styles.form} onSubmit={(e) => addItem(e, value)}>
          <Input
            isLimitText={true}
            placeholder={"Введите значение"}
            maxLength={4}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            value={value}
          />
          <Button
            disabled={value.length <= 0 || isLoad}
            onClick={(e) => {
              addItem(e, value);
            }}
            isLoader={false}
            text={"Добавить"}
          />
          <Button
            disabled={queue.current.getLength() <= 0 || isLoad}
            onClick={deleteItem}
            isLoader={false}
            text={"Удалить"}
          />
          <div className={styles.clear}>
            <Button
              disabled={
                (queue.current.getLength() <= 0 &&
                  !queueState.map((item) => item.item).includes("")) ||
                isLoad
              }
              text={"Очистить"}
              onClick={clearQueue}
            />
          </div>
        </form>
        <ul className={styles.queue}>
          {queueState.map((item, index) => {
            return (
              <li key={index} className={styles.item}>
                <Circle
                  state={item.state}
                  index={index}
                  letter={item.item || ""}
                  head={
                    item.item === ""
                      ? "head"
                      : item.item && index === queue.current.getHeadIndex()
                      ? "head"
                      : ""
                  }
                  tail={
                    item.item && index === queue.current.getTailIndex() - 1
                      ? "tail"
                      : ""
                  }
                />
              </li>
            );
          })}
        </ul>
      </section>
    </SolutionLayout>
  );
};
