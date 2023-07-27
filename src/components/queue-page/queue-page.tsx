import React, { useState, useMemo, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { v4 as uuidv4 } from "uuid";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";
import { Queue } from "./queue";

interface IArray {
  value: string;
  color: ElementStates;
}

enum Operation {
  ADD,
  DELETE,
  CLEAR
};

export const QueuePage: React.FC = () => {
  const MAX_SIZE = 7;
  const queue = useMemo(() => new Queue<string>(MAX_SIZE), []);

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IArray[]>([]);
  const [operation, setOperation] = useState<Operation>(Operation.ADD)

  const maxCount = 4;

  const defaultDataAdapter = () => {
    return queue.toArray().map(elem => ({ value: elem || '', color: ElementStates.Default }));
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const delay = (delayInms: number) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };

  const enqueue = async () => {
    setLoading(true);
    setOperation(Operation.ADD);

    let newArr = defaultDataAdapter();

    newArr[queue.isEmpty() ? Math.max(queue.getUnsafeHead()) : (queue.getTail() + 1) % MAX_SIZE].color = ElementStates.Changing;
    setData([...newArr]);
    await delay(SHORT_DELAY_IN_MS);
    queue.enqueue(inputValue);
    setInputValue('');
    newArr = defaultDataAdapter();

    newArr[Math.max(queue.getTail(), 0)].color = ElementStates.Modified;
    setData([...newArr]);
    await delay(SHORT_DELAY_IN_MS);
    setData(defaultDataAdapter());

    setLoading(false);
  }

  const dequeue = async () => {
    setOperation(Operation.DELETE);
    setLoading(true);

    let newArr = defaultDataAdapter();
    newArr[queue.getHead()].color = ElementStates.Changing;
    setData([...newArr]);
    await delay(SHORT_DELAY_IN_MS);
    queue.dequeue();

    setData(defaultDataAdapter());

    setLoading(false);
  }

  const clear = async () => {
    setOperation(Operation.CLEAR);

    setLoading(true);
    queue.clear();
    setData(defaultDataAdapter());
    setLoading(false);
  }

  useEffect(() => {
    setData(defaultDataAdapter());
  }, [])

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <Input value={inputValue} onChange={onChange} maxLength={maxCount} isLimitText />
        <Button text="Добавить" type="button" onClick={enqueue} isLoader={loading && operation === Operation.ADD} disabled={loading || queue.getCountElement() === MAX_SIZE || !inputValue} />
        <Button text="Удалить" type="button" onClick={dequeue} isLoader={loading && operation === Operation.DELETE} disabled={loading || queue.isEmpty()} />
        <div className={styles.cleanButton}>
          <Button text="Очистить" type="button" onClick={clear} isLoader={loading && operation === Operation.CLEAR} disabled={loading} />
        </div>
      </div>
      <div className={styles.circles}>
        {data.map(({ value, color }, index) => <Circle key={uuidv4()} letter={value} state={color} index={index} head={index === queue.getHead() ? HEAD : ''} tail={index === queue.getTail() ? TAIL : ''} />)}
      </div>
    </SolutionLayout>
  );
};
