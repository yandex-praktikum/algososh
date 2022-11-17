import React, { ChangeEvent, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from './list-page.module.css'
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import {delay, getRandomInt} from "../../utils/utils";
import {LinkedList} from "../../data-structures/list";

type TItem = {
  value: string;
  color: ElementStates;
};

enum ButtonName {
  AddToHead = "add to head",
  AddToTail = "add to tail",
  DeleteFromTheHead = "delete from the head",
  DeleteFromTheTail = "delete from to tail",
  AddByIndex = "add by index",
  DeleteByIndex = "delete by index",
};

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [index, setIndex] = useState('');
  const [loading, setLoading] = useState(false);
  const [addToHeadOperation, setAddToHeadOperation] = useState(false);
  const [addToTailOperation, setAddToTailOperation] = useState(false);
  const [deleteFromTheHeadOperation, setDeleteFromTheHeadOperation] = useState(false);
  const [deleteFromTheTailOperation, setDeleteFromTheTailOperation] = useState(false);
  const [addByIndexOperation, setAddByIndexOperation] = useState(false);
  const [deleteByIndexOperation, setDeleteByIndexOperation] = useState(false);
  const [inputValueIndex, setInputValueIndex] = useState<number>();
  const [buttonName, setButtonName] = useState('');
  const [circleTempValue, setCircleTempValue] = useState('');
  
  const list = useMemo(() => {
    return new LinkedList<string>(
        Array.from(
            {length: 4},
            () => (getRandomInt(0, 99).toString())))
  }, []);

  const [arr, setArr] = useState<TItem[]>(list.getArrWithColor());

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onIndexChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIndex(e.target.value);
  };

  const addToHead = async () => {
    if (inputValue && list.listLength < 6) {
      setButtonName(ButtonName.AddToHead);
      setLoading(true);
      setInputValueIndex(0);
      setAddToHeadOperation(true);
      await delay(500);
      list.prepend(inputValue);
      setAddToHeadOperation(false);
      const newArr = list.getArrWithColor();
      newArr[0].color = ElementStates.Modified;
      setArr(newArr);
      await delay(500);
      newArr[0].color = ElementStates.Default;
      setArr(newArr);
    };
    setInputValue('');
    setLoading(false);
    setButtonName('');
  };

  const addToTail = async () => {
    if (inputValue && list.listLength < 6) {
      setButtonName(ButtonName.AddToTail)
      setLoading(true);
      setInputValueIndex(list.listLength - 1);
      setAddToTailOperation(true);
      await delay(500);
      list.append(inputValue);
      setAddToTailOperation(false);
      const newArr = list.getArrWithColor();
      newArr[newArr.length - 1].color = ElementStates.Modified;
      setArr(newArr);
      await delay(500);
      newArr[newArr.length - 1].color = ElementStates.Default;
      setArr(newArr);
    };
    setInputValue('');
    setLoading(false);
    setButtonName('');
  };

  const deleteFromTheHead = async () => {
    if (list.listLength > 0) {
      const newArr = list.getArrWithColor();
      setCircleTempValue(newArr[0].value);
      setButtonName(ButtonName.DeleteFromTheHead);
      setLoading(true);
      setDeleteFromTheHeadOperation(true);
      setInputValueIndex(0);
      newArr[0].value = '';
      setArr(newArr);
      await delay(500);
      list.deleteHead();
      setDeleteFromTheHeadOperation(false);
      setArr(list.getArrWithColor());
    }
    setLoading(false);
    setButtonName('');
  };

  const deleteFromTheTail = async () => {
    if (list.listLength > 0) {
      const newArr = list.getArrWithColor();
      setCircleTempValue(newArr[newArr.length - 1].value);
      setButtonName(ButtonName.DeleteFromTheTail);
      setLoading(true);
      setDeleteFromTheTailOperation(true);
      setInputValueIndex(list.listLength - 1);
      newArr[newArr.length - 1].value = '';
      setArr(newArr);
      await delay(500);
      list.deleteTail();
      setDeleteFromTheTailOperation(false);
      setArr(list.getArrWithColor());
    };
    setLoading(false);
    setButtonName('');
  };

  const addByIndex = async () => {
    if (Number(index) < 5 && list.listLength < 6) {
      setButtonName(ButtonName.AddByIndex);
      setLoading(true);
      setAddByIndexOperation(true);
      const newArr = list.getArrWithColor();
      for (let i = 0; i <= Number(index); i++) {
        setInputValueIndex(i);
        await delay(500);
        if (i < Number(index)) {
          newArr[i].color = ElementStates.Changing;
          setArr(newArr);
        };
      };
      setAddByIndexOperation(false);
      setInputValueIndex(Number(''));
      list.addByIndex(inputValue, Number(index));
      const finalArr = list.getArrWithColor();
      finalArr[Number(index)].color = ElementStates.Modified;

      setArr(finalArr);
      await delay(500);
      finalArr[Number(index)].color = ElementStates.Default;
      setArr(finalArr);
    };
    setLoading(false);
    setInputValue('');
    setIndex('');
    setButtonName('');
  };

  const deleteByIndex = async () => {
    if (Number(index) < list.listLength && Number(index) < 7) {
      setButtonName(ButtonName.DeleteByIndex);
      setLoading(true);
      const newArr = list.getArrWithColor();
      for (let i = 0; i <= Number(index); i++) {
        await delay(500);
        newArr[i].color = ElementStates.Changing;
        setArr([...newArr]);
      };
      await delay(500);
      setCircleTempValue(newArr[Number(index)].value);
      newArr[Number(index)].value = '';
      setDeleteByIndexOperation(true);
      newArr[Number(index)].color = ElementStates.Default;
      setInputValueIndex(Number(index));
      await delay(500);
      list.deleteByIndex(Number(index));
      setArr(list.getArrWithColor());
      setDeleteByIndexOperation(false);
      setLoading(false);
      setButtonName('');
      setIndex('');
    }
  };

  const showHead = (index: number) => {
    if (index === 0 && !addToHeadOperation && !addByIndexOperation) {
      return 'head';
    } else if (index === 0 && addByIndexOperation && inputValueIndex !== 0) {
      return 'head';
    } else {
      return '';
    };
  };

  const showTail = (index: number) => {
    if (index === arr.length - 1 && !deleteFromTheTailOperation && !deleteByIndexOperation) {
      return 'tail';
    } else if (arr.length === 1) {
      return '';
    } else if (deleteByIndexOperation && index === arr.length - 1) {
      return '';
    } else {
      return '';
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.manageContainer}>
        <div>
          <div className={styles.manageContainer__item}>
            <Input
                extraClass={styles.input}
                placeholder="Введите значение"
                maxLength={4}
                isLimitText={true}
                value={inputValue}
                onChange={onInputChange}
                disabled={loading}
            />
            <Button
                extraClass={styles.button}
                text="Добавить в head"
                onClick={addToHead}
                isLoader={ loading && buttonName === ButtonName.AddToHead }
                disabled={inputValue === '' || loading}
            />
            <Button
                extraClass={styles.button}
                text="Добавить в tail"
                onClick={addToTail}
                isLoader={ loading && buttonName === ButtonName.AddToTail}
                disabled={inputValue === '' || loading}
            />
            <Button
                extraClass={styles.button}
                text="Удалить из head"
                onClick={deleteFromTheHead}
                isLoader={ loading && buttonName === ButtonName.DeleteFromTheHead }
                disabled={ loading }
            />
            <Button
                extraClass={styles.button}
                text="Удалить из tail"
                onClick={deleteFromTheTail}
                isLoader={ loading && buttonName === ButtonName.DeleteFromTheTail  }
                disabled={ loading }
            />
          </div>
          <div className={styles.manageContainer__item}>
            <Input
                extraClass={styles.input}
                placeholder="Введите индекс"
                max={5}
                min='0'
                type="number"
                value={index}
                onChange={onIndexChange}
                disabled={loading}
            />
            <Button
                extraClass={styles.indexButton}
                text="Добавить по индексу"
                onClick={addByIndex}
                isLoader={loading && buttonName === ButtonName.AddByIndex }
                disabled={ loading || !inputValue || !index }
            />
            <Button
                extraClass={styles.indexButton}
                text="Удалить по индексу"
                onClick={deleteByIndex}
                isLoader={loading && buttonName === ButtonName.DeleteByIndex }
                disabled={loading || index === '' }
            />
          </div>
        </div>
      </div>
        <ul className={styles.circlesContainer}>
          {arr.map((item, index) =>
            <li className={styles.circleItem} key={index}>
              {loading && (addToHeadOperation || addToTailOperation || addByIndexOperation) && index === inputValueIndex &&
                  <Circle extraClass={styles.circle_position_top} letter={inputValue} state={ElementStates.Changing} isSmall/>}
              {loading && (deleteFromTheHeadOperation || deleteFromTheTailOperation || deleteByIndexOperation) && index === inputValueIndex &&
                  <Circle extraClass={styles.circle_position_bottom} letter={circleTempValue} state={ElementStates.Changing} isSmall/>}
              {arr.length - 1 !== index &&
                <div className={styles.arrow}>
                  <ArrowIcon/>
                </div>}
                <Circle
                  index={index}
                  letter={item.value}
                  state={item.color}
                  head={showHead(index)}
                  extraClass={styles.circle_size_big}
                  tail={showTail(index)}
                />
            </li>)}
        </ul>
    </SolutionLayout>
  );
};