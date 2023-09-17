import React, { ChangeEvent, FormEvent, JSXElementConstructor } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { FlexForm } from "../flex-form/flex-form";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { Queue } from "../../utils/queue-arr";
import { wait } from "../../utils/utils";

import { ElementStates } from "../../types/element-states";

import styles from './queue-page.module.css'

type TOperation = 'enqueue' | 'dequeue';

export const QueuePage: React.FC = () => {

  const [inputString, setInputString] = React.useState<string>('');
  const queue = React.useRef(new Queue<string>(7));
  const [queueToRender, setQueueToRender] = React.useState<Array<string | null>>(Array(7).fill(null));
  const [highlightedElm, setHighlightedElm] = React.useState<{ index: number, operation: TOperation } | null>(null);
  const [animationInProgress, setAnimationInProgress] =  React.useState<'enqueue' | 'dequeue' | null>(null)


  const onChange = React.useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setInputString(evt.target.value);
  }, [])

  const highlightElm = React.useCallback(async (index: number, operation: TOperation): Promise<void> => {
    setHighlightedElm({ index, operation })
    await wait(500);
    setHighlightedElm(null);
  }, [])

  const onSubmit = React.useCallback(async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setAnimationInProgress('enqueue');
    queue.current.enqueue(inputString);
    await highlightElm(queue.current.tail, 'enqueue');
    setQueueToRender([...queue.current.container]);
    setInputString('');
    setAnimationInProgress(null);
  }, [inputString])

  const dequeue = React.useCallback(async () => {
    setAnimationInProgress('dequeue')
    await highlightElm(queue.current.head, 'dequeue');
    queue.current.dequeue();
    setQueueToRender([...queue.current.container]);
    setAnimationInProgress(null);
  }, [])

  const eraseQueue = React.useCallback(() => {
    setInputString('');
    queue.current = new Queue<string>(7);
    setQueueToRender([...queue.current.container]);
  }, [])

  const getCircleFeatures = React.useCallback((index) => {
    if (index === highlightedElm?.index && highlightedElm?.operation === 'enqueue') return { head: null, tail: null, state: ElementStates.Changing }
    if (index === highlightedElm?.index && highlightedElm?.operation === 'dequeue') return { head: 'head', tail: index === queue.current.tail ? 'tail' : null, state: ElementStates.Changing }
    return { head: index === queue.current.head ? 'head' : null, tail: index === queue.current.tail ? 'tail' : null, state: ElementStates.Default }
  }, [highlightedElm])


  return (
    <SolutionLayout title="Очередь">
      <FlexForm onSubmit={onSubmit} onReset={eraseQueue} extraClass={`mb-40`}>
        <Input maxLength={4} isLimitText={true} onChange={onChange} value={inputString} placeholder='Введите значение' extraClass={`${styles.input} mr-6`} />
        <Button text='Добавить' isLoader={animationInProgress === 'enqueue'} disabled={inputString.length === 0 || queue.current.head - queue.current.tail === 1 || (queue.current.head === 0 && queue.current.tail === queue.current.containerSize - 1) || !!animationInProgress} type='submit' extraClass="mr-6" />
        <Button text='Удалить' isLoader={animationInProgress === 'dequeue'} disabled={queue.current.head < 0 || !!animationInProgress} onClick={dequeue} type='button' extraClass="mr-40" />
        <Button text='Очистить' isLoader={false} disabled={!!animationInProgress || queue.current.head < 0} type='reset' />
      </FlexForm>
      <div className={styles.circlesContainer} >
        {!!queueToRender.length && queueToRender.map((str, index) => {
          return (<Circle key={index.toString() + str} letter={str?.toString()} head={getCircleFeatures(index)?.head} index={index} tail={getCircleFeatures(index)?.tail} state={getCircleFeatures(index)?.state} extraClass="mr-8" />)
        })}
      </div>
    </SolutionLayout>
  );
};
