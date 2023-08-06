import React, { useState, useMemo, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./linked-list";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

interface IItem {
  value: string;
  color: ElementStates;
}

enum Operation {
  ADD_HEAD,
  ADD_TAIL,
  DELETE_HEAD,
  DELETE_TAIL,
  ADD_BY_INDEX,
  DELETE_BY_INDEX,
}

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputValueIndex, setInputValueIndex] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IItem[]>([]);
  const [operation, setOperation] = useState<Operation>(Operation.ADD_HEAD);
  const [operationIndex, setOperationIndex] = useState<number>(-1);
  const [operationDeleteElementValue, setOperationDeleteElementValue] =
    useState<string>("");

  const randomArr = () => {
    const arr: string[] = [];
    const length = Math.floor(Math.random() * 5) + 2;
    for (let i = 0; i < length; i++) {
      arr.push(String(Math.round(Math.random() * 100)));
    }
    return arr;
  };

  const list = useMemo(() => new LinkedList<string>(randomArr()), []);

  const maxCount = 4;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onChangeIndex = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueIndex(event.target.value);
  };

  const delay = (delayInms: number) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };

  const onHeadAddClick = async () => {
    setOperation(Operation.ADD_HEAD);
    setLoading(true);
    let newArr = list.getArrWithColor();
    setData([...newArr]);
    await delay(SHORT_DELAY_IN_MS);
    setInputValue("");
    list.pushFront(inputValue);
    newArr = list.getArrWithColor();
    newArr[0].color = ElementStates.Modified;
    setData([...newArr]);
    await delay(DELAY_IN_MS);
    newArr[0].color = ElementStates.Default;
    setData([...newArr]);
    setLoading(false);
  };

  const onTailAddClick = async () => {
    setOperation(Operation.ADD_TAIL);
    setLoading(true);
    let newArr = list.getArrWithColor();
    setData([...newArr]);
    await delay(SHORT_DELAY_IN_MS);
    setInputValue("");
    list.pushBack(inputValue);
    newArr = list.getArrWithColor();
    newArr[newArr.length - 1].color = ElementStates.Modified;
    setData([...newArr]);
    await delay(DELAY_IN_MS);
    newArr[newArr.length - 1].color = ElementStates.Default;
    setData([...newArr]);
    setLoading(false);
  };

  const onHeadDeleteClick = async () => {
    setOperation(Operation.DELETE_HEAD);

    setLoading(true);

    const newArr = list.getArrWithColor();
    setOperationDeleteElementValue(newArr[0].value);
    newArr[0].value = "";
    setData([...newArr]);
    await delay(DELAY_IN_MS);
    setOperationDeleteElementValue('');

    list.deleteHead();
    setData([...list.getArrWithColor()]);
    setLoading(false);
  };

  const onTailDeleteClick = async () => {
    setOperation(Operation.DELETE_TAIL);

    setLoading(true);

    const newArr = list.getArrWithColor();
    setOperationDeleteElementValue(newArr[newArr.length - 1].value);
    newArr[newArr.length - 1].value = "";
    setData([...newArr]);
    await delay(DELAY_IN_MS);
    setOperationDeleteElementValue("");
    list.deleteTail();
    setData([...list.getArrWithColor()]);
    setLoading(false);
  };

  const onAddByIndex = async () => {
    setOperation(Operation.ADD_BY_INDEX);

    setLoading(true);

    const newArr = list.getArrWithColor();
    setData([...newArr]);
    for (let i = 0; i <= Number(inputValueIndex); i++) {
      setOperationIndex(i);
      await delay(SHORT_DELAY_IN_MS);
      if (i < Number(inputValueIndex)) {
        newArr[i].color = ElementStates.Changing;
        setData([...newArr]);
      }
    }
    setInputValue("");
    setInputValueIndex("");
    list.addByIndex(inputValue, Number(inputValueIndex));
    const result = list.getArrWithColor();
    result[Number(inputValueIndex)].color = ElementStates.Modified;
    setData([...result]);
    await delay(SHORT_DELAY_IN_MS);
    result[Number(inputValueIndex)].color = ElementStates.Default;
    setData([...result]);
    setOperationIndex(-1);
    setLoading(false);
  };

  const onDeleteByIndex = async () => {
    setOperation(Operation.DELETE_BY_INDEX);

    setLoading(true);

    const newArr = list.getArrWithColor();
    setData([...newArr]);
    for (let i = 0; i <= Number(inputValueIndex); i++) {
      await delay(SHORT_DELAY_IN_MS);
      if (i < Number(inputValueIndex)) {
        newArr[i].color = ElementStates.Changing;
        setData([...newArr]);
      }
    }
    setOperationIndex(Number(inputValueIndex));

    let result = list.getArrWithColor();
    result[Number(inputValueIndex)].color = ElementStates.Modified;
    setOperationDeleteElementValue(result[Number(inputValueIndex)].value);
    result[Number(inputValueIndex)].value = '';

    setData([...result]);
    await delay(SHORT_DELAY_IN_MS);
    setOperationDeleteElementValue('');

    list.deleteByIndex(Number(inputValueIndex));
    result = list.getArrWithColor();
    setData([...result]);
    setOperationIndex(-1);
    setInputValueIndex('');

    setLoading(false);
  };

  const tailByIndex = (index: number) => {
    if (
      loading &&
      operationDeleteElementValue &&
      ((operation === Operation.DELETE_TAIL &&
        index + 1 === list.size()) ||
        (operation === Operation.DELETE_HEAD && index === 0) ||
        (operation === Operation.DELETE_BY_INDEX &&
          index === operationIndex))
    ) {
      return (
        <Circle
          isSmall
          letter={operationDeleteElementValue}
          state={ElementStates.Changing}
        />
      );
    }
    return list.size() === index + 1 ? "tail" : "";
  };

  const headByIndex = (index: number) => {
    if (
      loading &&
      inputValue &&
      ((operation === Operation.ADD_HEAD && index === 0) ||
        (operation === Operation.ADD_TAIL &&
          index + 1 === list.size()) ||
        (operation === Operation.ADD_BY_INDEX &&
          index === operationIndex))
    ) {
      return (
        <Circle
          isSmall
          letter={inputValue}
          state={ElementStates.Changing}
        />
      );
    }

    return index === 0 ? "head" : "";
  };

  useEffect(() => {
    setData(list.getArrWithColor());
    return () => setData([]);
  }, [])

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <Input
          value={inputValue}
          onChange={onChange}
          maxLength={maxCount}
          isLimitText
          disabled={loading}
        />
        <Button
          text="Добавить в head"
          type="button"
          onClick={onHeadAddClick}
          isLoader={loading && operation === Operation.ADD_HEAD}
          disabled={loading || inputValue.length === 0}
        />
        <Button
          text="Добавить в tail"
          type="button"
          onClick={onTailAddClick}
          isLoader={loading && operation === Operation.ADD_TAIL}
          disabled={loading || inputValue.length === 0}
        />
        <Button
          text="Удалить из head"
          type="button"
          onClick={onHeadDeleteClick}
          isLoader={loading && operation === Operation.DELETE_HEAD}
          disabled={loading || list.size() === 0}
        />
        <Button
          text="Удалить из tail"
          type="button"
          onClick={onTailDeleteClick}
          isLoader={loading && operation === Operation.DELETE_TAIL}
          disabled={loading || list.size() === 0}
        />
      </div>
      <div className={styles.indexContainer}>
        <Input
          value={inputValueIndex}
          onChange={onChangeIndex}
          placeholder="Введите индекс"
          max={5}
          min={0}
          type="number"
          disabled={loading}
        />
        <Button
          text="Добавить по индексу"
          type="button"
          onClick={onAddByIndex}
          isLoader={loading && operation === Operation.ADD_BY_INDEX}
          disabled={
            loading ||
            Number(inputValueIndex) >= list.size() ||
            inputValue.length === 0 || inputValueIndex.length === 0
          }
        />
        <Button
          text="Удалить по индексу"
          type="button"
          onClick={onDeleteByIndex}
          isLoader={
            loading && operation === Operation.DELETE_BY_INDEX
          }
          disabled={loading || Number(inputValueIndex) >= list.size() || !inputValueIndex}
        />
      </div>
      <div className={styles.circles}>
        {data.map((item, index) => (
          <div key={index} className={styles.circleWithArrow}>
            <Circle
              letter={item.value}
              index={index}
              state={item.color}
              head={headByIndex(index)}
              tail={tailByIndex(index)}
            />
            {data.length - 1 !== index && <ArrowIcon />}
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
