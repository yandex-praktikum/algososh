import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { FlexForm } from "../flex-form/flex-form";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

import { Stack } from "../../utils/stack";

import styles from './stack-page.module.css'
import { wait } from "../../utils/utils";

export const StackPage: React.FC = () => {

  const [inputString, setInputString] = React.useState<string>('');
  const stack = React.useRef(new Stack<string>());
  const [stackToRender, setStackToRender] = React.useState<string[]>([]);
  const [stackElmHighlight, setStackElmHighlight] = React.useState<number>(-1);
  const [animationInProgress, setAnimationInProgress] =  React.useState<'push' | 'pop' | null>(null)


  const onChange = React.useCallback((evt) => {
    setInputString(evt.target.value);
  }, [])

  const highlightElm = React.useCallback(async (index: number): Promise<void> => {
    setStackElmHighlight(index)
    await wait(500);
    setStackElmHighlight(-1);
  }, [])

  const onSubmit = React.useCallback(async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setAnimationInProgress('push');
    stack.current.push(inputString);
    setStackToRender([...stack.current.container]);
    await highlightElm(stack.current.getSize() - 1);
    setAnimationInProgress(null);
    setInputString('');
  }, [inputString])

  const popStack = React.useCallback(async () => {
    setAnimationInProgress('pop');
    await highlightElm(stack.current.getSize() - 1);
    stack.current.pop();
    setStackToRender([...stack.current.container]);
    setAnimationInProgress(null);
  }, [])

  const resetStack = React.useCallback(async () => {
    setInputString('');
    stack.current.container = [];
    setStackToRender([...stack.current.container]);
  }, [])


  return (
    <SolutionLayout title="Стек">
      <FlexForm onSubmit={onSubmit} onReset={resetStack} extraClass={`mb-40`}>
        <Input maxLength={4} isLimitText={true} onChange={onChange} value={inputString} placeholder='Введите значение'  extraClass={`${styles.input} mr-6`} />
        <Button text='Добавить' isLoader={animationInProgress === 'push'} disabled={inputString.length === 0} type='submit' extraClass="mr-6" />
        <Button text='Удалить' isLoader={animationInProgress === 'pop'} disabled={stackToRender.length === 0 || !!animationInProgress} onClick={popStack} type='button' extraClass="mr-40" />
        <Button text='Очистить' isLoader={false} disabled={stackToRender.length === 0 || !!animationInProgress} type='reset' />
      </FlexForm>
      <div className={styles.circlesContainer} >
        {!!stackToRender.length && stackToRender.map((str, index) => {
          return (<Circle key={index.toString() + str} letter={str} head={index === stackToRender.length - 1 ? 'top' : null} tail={index.toString()} state={index === stackElmHighlight ? ElementStates.Changing : ElementStates.Default} extraClass="mr-8" />)
        })}
      </div>
    </SolutionLayout>
  );
};
