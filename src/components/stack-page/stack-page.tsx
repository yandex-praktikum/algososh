import React, { useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack-page.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { v4 as uuidv4 } from "uuid";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "./stack";

interface IArray {
  value: string;
  color: ElementStates;
}

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState('');
  const [data, setData] = useState<IArray[]>([]);
  const stack = useMemo(() => new Stack<string>(), []);

  const maxCount = 4;

  const delay = (delayInms: number) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const defaultDataAdapter = () => {
    return stack.toArray().map(elem => ({ value: elem || '', color: ElementStates.Default }));
  }

  const onClickAddButton = async () => {
    setInputValue('');
    setLoading('addButton');
    const tmp = [...defaultDataAdapter()];
    setData([...tmp, { value: '', color: ElementStates.Changing }]);
    await delay(SHORT_DELAY_IN_MS);
    stack.push(inputValue);
    setData([...defaultDataAdapter()]);
    setLoading('');
  }

  const onClickDeleteButton = async () => {
    setLoading('deleteButton');
    const tmp = [...defaultDataAdapter()];
    tmp[tmp.length - 1].color = ElementStates.Changing;
    setData([...tmp]);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setData([...defaultDataAdapter()]);
    setLoading('');
  }

  const onClickClearButton = async () => {
    setLoading('clearButton');
    stack.clear();
    setData([]);
    setLoading('');
  }


  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <Input value={inputValue} onChange={onChange} maxLength={maxCount} isLimitText />
        <Button text="Добавить" type="button" onClick={onClickAddButton} isLoader={Boolean(loading) && loading === 'addButton'} disabled={(Boolean(loading) && loading !== 'addButton') || inputValue.length === 0} />
        <Button text="Удалить" type="button" onClick={onClickDeleteButton} isLoader={Boolean(loading) && loading === 'deleteButton'} disabled={(Boolean(loading) && loading !== 'deleteButton') || data.length === 0} />
        <div className={styles.cleanButton}>
          <Button text="Очистить" type="button" onClick={onClickClearButton} isLoader={Boolean(loading) && loading === 'clearButton'} disabled={(Boolean(loading) && loading !== 'clearButton') || data.length === 0} />
        </div>
      </div>
      <div className={styles.circles}>
        {data.map((element, index) => <Circle key={index} letter={element.value}
          state={element.color} index={index} head={index === data.length - 1 ? 'top' : ''} />)}
      </div>
    </SolutionLayout>
  );
};
