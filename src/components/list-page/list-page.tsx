import React, { useState, ChangeEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './list-page.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { Circle } from '../ui/circle/circle';
import { IElement } from './class-linked-list';
import { list } from './random-array-numbers';
import { delay, DELAY_MILLISECONDS_500 } from '../../utils/delay';
import { ElementStates } from '../../types/element-states';

interface IListLoader {
  isAddHead: boolean;
  isAddTail: boolean;
  isDelHead: boolean;
  isDelTail: boolean;
  isAddByIndex: boolean;
  isDelByIndex: boolean;
  disabled: boolean;
}

const SIZE_LINKED_LIST = 7;

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputValueIndex, setInputValueIndex] = useState<number>(-1);
  const [array, setListArray] = useState<Array<IElement>>(list.getArrColor());
  const [isFullList, setIsFullList] = useState<boolean>(false);
  const [isEmptyList, setisEmptyList] = useState<boolean>(false);
  const [isloader, setIsLoader] = useState<IListLoader>({
    isAddHead: false,
    isAddTail: false,
    isDelHead: false,
    isDelTail: false,
    isAddByIndex: false,
    isDelByIndex: false,
    disabled: false,
  });

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValueIndex(Number(e.target.value));
  };

  const handleAddHead = async () => {
    if (list.getSize() <= SIZE_LINKED_LIST) {
      setisEmptyList(false);
      setIsLoader({
        ...isloader,
        isAddHead: true,
        disabled: true,
      });
      const headNewElement: IElement = {
        value: inputValue,
        state: ElementStates.Modified,
        state_m: ElementStates.Changing,
        position: null,
      };
      array[0] = {
        ...array[0],
        state: ElementStates.Default,
        position: 'add',
      };
      setListArray([...array]);
      await delay(DELAY_MILLISECONDS_500);
      array[0] = {
        ...array[0],
        state: ElementStates.Modified,
        position: null,
      };
      list.prepend(inputValue);
      array.unshift(headNewElement);
      array[1] = {
        ...array[1],
        state: ElementStates.Default,
        position: null,
      };
      setListArray([...array]);
      await delay(DELAY_MILLISECONDS_500);
      array[0] = {
        ...array[0],
        state: ElementStates.Default,
        position: null,
      };
      setListArray(array);
      await delay(DELAY_MILLISECONDS_500);
      setIsLoader({
        ...isloader,
        isAddHead: false,
        disabled: false,
      });
    } else {
      setIsFullList(true);
    }
    setInputValue('');
  };

  const handleAddTail = async () => {
    const indexTail = list.getSize();
    if (indexTail <= SIZE_LINKED_LIST) {
      setIsLoader({
        ...isloader,
        isAddTail: true,
        disabled: true,
      });
      const headNewElement: IElement = {
        value: inputValue,
        state: ElementStates.Modified,
        state_m: ElementStates.Changing,
        position: null,
      };
      array[indexTail - 1] = {
        ...array[indexTail - 1],
        state: ElementStates.Default,
        position: 'add',
      };
      setListArray([...array]);
      await delay(DELAY_MILLISECONDS_500);
      array[indexTail - 1] = {
        ...array[indexTail - 1],
        state: ElementStates.Modified,
        position: null,
      };
      list.append(inputValue);
      array.push(headNewElement);
      array[indexTail - 1] = {
        ...array[indexTail - 1],
        state: ElementStates.Default,
        position: null,
      };
      setListArray(array);
      await delay(DELAY_MILLISECONDS_500);
      array[indexTail] = {
        ...array[indexTail],
        state: ElementStates.Default,
        position: null,
      };
      setListArray([...array]);
      await delay(DELAY_MILLISECONDS_500);
      setIsLoader({
        ...isloader,
        isAddTail: false,
        disabled: false,
      });
    } else {
      setIsFullList(true);
    }
    setInputValue('');
  };

  const handleDelHead = async () => {
    if (list.getSize() >= 1) {
      setisEmptyList(false);
      setIsLoader({
        ...isloader,
        isDelTail: true,
        disabled: true,
      });
      array[0] = {
        ...array[0],
        state: ElementStates.Default,
        state_m: ElementStates.Changing,
        position: 'remove',
      };
      setListArray(array);
      await delay(DELAY_MILLISECONDS_500);
      list.popHead();
      array.shift();
      setListArray(array);
      setIsLoader({
        ...isloader,
        isDelTail: false,
        disabled: false,
      });
    } else {
      setisEmptyList(true);
    }
    setInputValue('');
  };

  const handleDelTail = async () => {
    const indexTail = list.getSize();
    if (indexTail >= 1) {
      setIsLoader({
        ...isloader,
        isDelTail: true,
        disabled: true,
      });
      array[indexTail - 1] = {
        ...array[indexTail - 1],
        state: ElementStates.Default,
        state_m: ElementStates.Changing,
        position: 'remove',
      };
      setListArray(array);
      await delay(DELAY_MILLISECONDS_500);
      if (indexTail - 1 === 0) {
        setisEmptyList(true);
      }
      list.popTail();
      array.pop();
      setListArray(array);
      setIsLoader({
        ...isloader,
        isDelTail: false,
        disabled: false,
      });
    }
    setInputValue('');
  };

  const handleAddIndex = async () => {
    const indexTail = list.getSize();
    const indexInsert = Number(inputValueIndex);
    if (inputValueIndex === 0) {
      handleAddHead();
      return;
    }
    if (0 < indexInsert && indexInsert <= indexTail) {
      setIsLoader({
        ...isloader,
        isAddByIndex: true,
        disabled: true,
      });
      for (let i = 1; i <= indexInsert; i++) {
        array[i - 1] = {
          ...array[i - 1],
          state: ElementStates.Default,
          position: 'add',
        };
        setListArray([...array]);
        await delay(DELAY_MILLISECONDS_500);
        array[i - 1] = {
          ...array[i - 1],
          state: ElementStates.Changing,
          position: null,
        };
        setListArray([...array]);
        await delay(DELAY_MILLISECONDS_500);
      }
      array[indexInsert] = {
        ...array[indexInsert],
        state: ElementStates.Default,
        position: 'add',
      };
      setListArray([...array]);
      await delay(DELAY_MILLISECONDS_500);
      array[indexInsert] = {
        ...array[indexInsert],
        state: ElementStates.Default,
        position: null,
      };
      setListArray([...array]);
      await delay(DELAY_MILLISECONDS_500);
      const newElement: IElement = {
        value: inputValue,
        state: ElementStates.Modified,
        state_m: ElementStates.Changing,
        position: null,
      };
      list.addByIndex(inputValue, indexInsert);
      array.splice(indexInsert, 0, newElement);
      setListArray(array);
      await delay(DELAY_MILLISECONDS_500);
      array[indexInsert] = {
        ...array[indexInsert],
        state: ElementStates.Default,
        position: null,
      };
      setListArray(array);
      await delay(DELAY_MILLISECONDS_500);
      setListArray(list.getArrColor());
      setIsLoader({
        ...isloader,
        isAddByIndex: false,
        disabled: false,
      });
    } else {
      setIsFullList(true);
    }
    setInputValueIndex(-1);
    setInputValue('');
  };

  const handleDelIndex = async () => {
    const indexElemement = Number(inputValueIndex);
    if (inputValueIndex === 0) {
      handleDelHead();
      return;
    }
    if (0 < indexElemement && indexElemement <= list.getSize()) {
      setIsLoader({
        ...isloader,
        isDelByIndex: true,
        disabled: true,
      });
      for (let i = 1; i <= indexElemement; i++) {
        setListArray([...array]);
        await delay(DELAY_MILLISECONDS_500);
        array[i - 1] = {
          ...array[i - 1],
          state: ElementStates.Changing,
          position: null,
        };
        setListArray([...array]);
        await delay(DELAY_MILLISECONDS_500);
      }
      array[indexElemement] = {
        ...array[indexElemement],
        state: ElementStates.Changing,
        position: null,
      };
      setListArray([...array]);
      await delay(DELAY_MILLISECONDS_500);
      array[indexElemement] = {
        ...array[indexElemement],
        state: ElementStates.Default,
        position: 'remove',
      };
      setListArray([...array]);
      await delay(DELAY_MILLISECONDS_500);
      list.delByIndex(indexElemement);
      array.splice(indexElemement, 1);
      setListArray([...array]);
      setListArray(list.getArrColor());
      setIsLoader({
        ...isloader,
        isDelByIndex: false,
        disabled: false,
      });
    } else {
      setisEmptyList(true);
    }
    setInputValueIndex(-1);
    setInputValue('');
  };

  return (
    <SolutionLayout title='Связный список'>
      <div className={styles.container}>
        <form className={styles.form}>
          <Input
            placeholder='Введите значение'
            onChange={onChangeValue}
            value={inputValue}
            maxLength={4}
            isLimitText={true}
            extraClass={styles.input}
            autoFocus
          />
          <Button
            text={'Добавить в Head'}
            type='button'
            onClick={handleAddHead}
            extraClass={styles.button_m}
            isLoader={isloader.isAddHead}
            disabled={inputValue === '' || isloader.disabled || isFullList}
          />
          <Button
            text={'Добавить в tail'}
            type='button'
            extraClass={styles.button_m}
            onClick={handleAddTail}
            isLoader={isloader.isAddTail}
            disabled={inputValue === '' || isloader.disabled || isFullList}
          />
          <Button
            text={'Удалить из head'}
            type='button'
            extraClass={styles.button_m}
            onClick={handleDelHead}
            isLoader={isloader.isDelHead}
            disabled={isloader.disabled || isEmptyList}
          />
          <Button
            text={'Удалить из tail'}
            type='button'
            extraClass={styles.button_m}
            onClick={handleDelTail}
            isLoader={isloader.isDelTail}
            disabled={isloader.disabled || isEmptyList}
          />
        </form>
        <form className={styles.form}>
          <Input
            placeholder='Введите индекс'
            type='number'
            max={list.getSize() - 1}
            min={-1}
            extraClass={styles.input}
            onChange={onChangeIndex}
            value={inputValueIndex}
          />
          <Button
            text={'Добавить по индексу'}
            type='button'
            extraClass={styles.button_l}
            onClick={handleAddIndex}
            isLoader={isloader.isAddByIndex}
            disabled={
              inputValue === '' ||
              inputValueIndex < 0 ||
              inputValueIndex > list.getSize() ||
              isloader.disabled ||
              isFullList
            }
          />
          <Button
            text={'Удалить по индексу'}
            type='button'
            extraClass={styles.button_l}
            onClick={handleDelIndex}
            isLoader={isloader.isDelByIndex}
            disabled={
              inputValueIndex < 0 ||
              inputValueIndex > list.getSize() ||
              isloader.disabled ||
              isEmptyList
            }
          />
        </form>
      </div>
      <ul className={styles.showlist}>
        {array.map((item, index) => (
          <li className={styles.item} key={index}>
            {!!item.position && (
              <Circle
                extraClass={`${styles.circle_m} ${styles[`${item.position}`]}`}
                letter={item.position === 'add' ? inputValue : item.value}
                state={item.state_m}
                isSmall={true}
              />
            )}
            <Circle
              letter={item.position === 'remove' ? '' : item.value}
              index={index}
              head={index === 0 && !item.position ? 'head' : ''}
              tail={index === array.length - 1 && !item.position ? 'tail' : ''}
              isSmall={false}
              state={item.state}
            />
            <div className={styles.arrow}>
              {index < array.length - 1 && (
                <ArrowIcon
                  fill={
                    item.state !== ElementStates.Changing
                      ? '#0032ff'
                      : '#d252e1'
                  }
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
