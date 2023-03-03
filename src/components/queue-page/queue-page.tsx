import { FC, useState, useRef } from 'react';
import { useForm } from '../../hooks/useForm';
import { QUEUE_LENGTH } from '../../constants/queue';
import { Queue } from './utils';
import { setDelay } from '../../utils-common/utils-common';
import { Functions, ElementStates } from '../../types';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './queue-page.module.css';

export const QueuePage: FC = () => {

  const queue = useRef(new Queue(QUEUE_LENGTH));
  const { values, handleChange, clearValue } = useForm({ value: '' });
  const value =
    typeof values['value'] !== 'string'
      ? String(values['value'])
      : values['value'];
  const [result, setResult] = useState<(string | null)[]>(
    new Array(QUEUE_LENGTH).fill(null)
  );
  const [action, setAction] = useState<Functions>(Functions.Waiting);
  const [instant, setCurrent] = useState<number>(-1);
  const [loader, setLoader] = useState<boolean>(false);

  const showResult = () => {
    setResult(
      queue.current.toArray().map((item) => (item !== null ? String(item) : ''))
    );
  };

  const displayAddedElQueue = async () => {
    const currentValue = value;
    clearValue('value');

    setCurrent(
      queue.current.isEmpty
        ? queue.current.tail
        : queue.current.tail + 1
    );

    await setDelay(SHORT_DELAY_IN_MS);

    queue.current.enqueue(currentValue);
    showResult();

    await setDelay(SHORT_DELAY_IN_MS);

    setCurrent(-1);
    setLoader(false);
    setAction(Functions.Waiting);
  };

  const displayRemovedElQueue = async () => {
    setCurrent(queue.current.head);

    await setDelay(SHORT_DELAY_IN_MS);

    queue.current.dequeue();
    showResult();
    setCurrent(queue.current.head);

    await setDelay(SHORT_DELAY_IN_MS);

    setCurrent(-1);
    setLoader(false);
    setAction(Functions.Waiting);
  };

  const handleAddClick = () => {
    setLoader(true);
    setAction(Functions.AddToTail);
    displayAddedElQueue();
  };

  const handleRemoveClick = () => {
    setLoader(true);
    setAction(Functions.DeleteFromHead);
    displayRemovedElQueue();
  };

  const handleClearClick = () => {
    clearValue('value');
    queue.current.clear();
    showResult();
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.panel} onSubmit={(e) => e.preventDefault()}>
        <fieldset className={styles.panel__group}>
          <Input
            type={'text'}
            maxLength={4}
            isLimitText={true}
            value={value}
            name={'value'}
            onChange={handleChange}
            disabled={loader}
          />
          <Button
            type={'button'}
            text={'Добавить'}
            onClick={handleAddClick}
            isLoader={loader && action === Functions.AddToTail}
            disabled={
              (loader && action !== Functions.AddToTail) ||
              value.length === 0 ||
              queue.current.isFull
            }
          />
          <Button
            type={'button'}
            text={'Удалить'}
            onClick={handleRemoveClick}
            isLoader={loader && action === Functions.DeleteFromHead}
            disabled={
              (loader && action !== Functions.DeleteFromHead) ||
              queue.current.isEmpty
            }
          />
        </fieldset>
        <Button
          type={'button'}
          text={'Очистить'}
          onClick={handleClearClick}
          disabled={
            loader ||
            (queue.current.tail === 0 && queue.current.length === 0)
          }
        />
      </form>

      <ul className={styles.results}>
        {result.length > 0 &&
          result.map((item, index) => {
            let isHead: boolean;
            let isTail: boolean;
            let isEmpty = queue.current.isEmpty;
            let clearedQueue =
              queue.current.head === 0 &&
              queue.current.tail === 0;
            if (isEmpty && clearedQueue) {
              isHead = false;
              isTail = false;
            } else {
              isHead = index === queue.current.head;
              isTail = index === queue.current.tail;
            }

            return (
              <li key={index}>
                <Circle
                  letter={item ? item : ''}
                  index={index}
                  head={isHead ? 'head' : undefined}
                  tail={isTail ? 'tail' : undefined}
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
    </SolutionLayout>
  );
};
