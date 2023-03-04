import { FC, useEffect, useRef, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { DELAY_IN_MS } from '../../constants/delays';
import {  ReverseString } from './utils';
import type { TReverseStringResult } from '../../types';
import { ElementStates, TGetElementState } from "../../types";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './string.module.css';

export const StringComponent: FC = () => {
 
  const rangeRef = useRef(new ReverseString<string>());
  const { values, handleChange, clearValue } = useForm({ range: '' });
  const range =
    typeof values['range'] !== 'string'
      ? String(values['range'])
      : values['range'];
  const [result, setResult] = useState<TReverseStringResult>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const timerId = useRef<NodeJS.Timeout>();

  const showCurrentResult = () => {
    setResult(
      rangeRef.current.range.map((item, itemIndex) => {
        let itemId = Math.ceil(Math.random() * Date.now());
        return {
          id: itemId,
          value: item,
          state: getElementState({
            itemIndex,
            startPosition: rangeRef.current.start,
            endPosition: rangeRef.current.end,
            isReversed: rangeRef.current.isReversed,
            timerLaunched: timerId.current ? true : false,
          }),
        };
      })
    );
  };
  const reverseElements = () => {
    if (!rangeRef.current.isReversed) {
      rangeRef.current.nextStep();
      if (rangeRef.current.isReversed && timerId.current) {
        clearInterval(timerId.current);
        timerId.current = undefined;
        setLoader(false);
      }
    }
    showCurrentResult();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    rangeRef.current.range = range.split('');
    clearValue('range');
    showCurrentResult();
    if (!rangeRef.current.isReversed) {
      setLoader(true);
      window.setTimeout(() => {
        timerId.current = setInterval(reverseElements, DELAY_IN_MS);
        showCurrentResult();
      }, DELAY_IN_MS);
    }
  };

  const getElementState = ({
    itemIndex,
    startPosition,
    endPosition,
    isReversed,
    timerLaunched,
  }: TGetElementState): ElementStates => {
    if (itemIndex === startPosition || itemIndex === endPosition) {
      if (isReversed) {
        return ElementStates.Modified;
      } else {
        return timerLaunched ? ElementStates.Changing : ElementStates.Default;
      }
    }
      if (itemIndex < startPosition || itemIndex > endPosition) {
      return ElementStates.Modified;
    }
      return ElementStates.Default;
  };

  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, []);

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form}>
        <Input
          name={'range'}
          value={range}
          type={'text'}
          maxLength={11}
          isLimitText={true}
          onChange={handleChange}
          disabled={loader}
        />
        <Button
          type={'submit'}
          text={'Развернуть'}
          onClick={handleClick}
          isLoader={loader}
          disabled={!range || range?.length === 0}
        />
      </form>
      <ul className={styles.results}>
        {result.length > 0 &&
          result.map((item) => {
            return (
              <li key={item.id}>
                <Circle letter={item.value} state={item.state} />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
