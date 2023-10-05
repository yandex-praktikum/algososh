import React, { ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { ElementStates } from "../../types/element-states";

import { LinkedList } from "../../utils/linked-list";
import { wait } from "../../utils/utils";
import styles from './list-page.module.css'
import { ArrowIcon } from "../ui/icons/arrow-icon";

import { useForm } from "../../hooks/useForm";

interface ICirclesState {
  head: number,
  tail: number,
  toReplace: number,
  succesReplaced: number,
  toRemove: number,
  toCheck: number
}
interface ICircleState {
  head?: 'head' | null,
  tail?: 'tail' | null,
  toReplace?: (value: string | undefined) => React.ReactElement | React.ReactElement,
  succesReplaced?: ElementStates,
  toRemove?: (value: string | undefined) => React.ReactElement | React.ReactElement,
  toCheck?: (index: number) => number
}
interface TCircleVisualState {
  head: 'head' | null | React.ReactElement,
  tail: 'tail' | null | React.ReactElement,
  state: ElementStates
}

type TAnimation = 'addHead' | 'addTail' | 'removeHead' | 'removeTail' | 'addByIndex' | 'removeByIndex';

export const ListPage: React.FC = () => {
  const {formValues, setFormValues, onChangeHandler: onChange} = useForm({ nodeValue: '', nodeIndex: '' })
  const list = React.useRef((new LinkedList<string>()).push('0').push('34').push('8').push('1'));
  const [listToRender, setListToRender] = React.useState<Array<string | null>>(['0', '34', '8', '1']);

  const circlesInitialStateIndexes = React.useMemo(() => ({
    head: 0,
    get tail() { return list.current.getSize() - 1 },
    toReplace: -1,
    succesReplaced: -1,
    toRemove: -1,
    toCheck: -1
  }), [])

  const [circlesStateIndexes, setCirclesState] = React.useState<ICirclesState>(circlesInitialStateIndexes);
  const [animationInProgress, setAnimationInProgress] = React.useState<TAnimation | false>(false);

  const resetFormValues = React.useCallback(() => {
    setFormValues({ nodeValue: '', nodeIndex: '' });
  }, [])

  const addTail = React.useCallback(async () => {
    setAnimationInProgress('addTail');
    setCirclesState({ ...circlesStateIndexes, toReplace: list.current.getSize() - 1 })
    list.current.push(formValues.nodeValue);
    await wait(500);
    setListToRender(list.current.getList());
    setCirclesState({ ...circlesInitialStateIndexes, succesReplaced: list.current.getSize() - 1 })
    await wait(500);
    setCirclesState({ ...circlesInitialStateIndexes });
    resetFormValues();
    setAnimationInProgress(false);
  }, [formValues]);

  const addHead = React.useCallback(async () => {
    setAnimationInProgress('addHead');
    setCirclesState({ ...circlesStateIndexes, toReplace: 0 });
    list.current.unshift(formValues.nodeValue);
    await wait(500);
    setListToRender(list.current.getList());
    setCirclesState({ ...circlesInitialStateIndexes, succesReplaced: 0 });
    await wait(500);
    setCirclesState({ ...circlesInitialStateIndexes });
    resetFormValues();
    setAnimationInProgress(false);
  }, [formValues, circlesStateIndexes, circlesInitialStateIndexes]);

  const removeHead = React.useCallback(async () => {
    setAnimationInProgress('removeHead');
    setCirclesState({ ...circlesStateIndexes, toRemove: 0 });
    await wait(500);
    list.current.shift();
    setListToRender(list.current.getList());
    setCirclesState({ ...circlesInitialStateIndexes });
    resetFormValues();
    setAnimationInProgress(false);
  }, []);

  const removeTail = React.useCallback(async () => {
    setAnimationInProgress('removeTail');
    setCirclesState({ ...circlesInitialStateIndexes, toRemove: list.current.getSize() - 1 });
    await wait(500);
    list.current.pop();
    setListToRender(list.current.getList());
    setCirclesState({ ...circlesInitialStateIndexes });
    resetFormValues();
    setAnimationInProgress(false);
  }, []);

  const addByIndex = React.useCallback(async () => {
    setAnimationInProgress('addByIndex');
    for (let i = 0; i <= parseInt(formValues.nodeIndex); i++) {
      setCirclesState({ ...circlesStateIndexes, toReplace: i, toCheck: i })
      await wait(500);
    }
    list.current.insertAt(formValues.nodeValue, parseInt(formValues.nodeIndex));
    setListToRender(list.current.getList());
    setCirclesState({ ...circlesInitialStateIndexes, succesReplaced: parseInt(formValues.nodeIndex) })
    await wait(500);
    setCirclesState({ ...circlesInitialStateIndexes });
    resetFormValues();
    setAnimationInProgress(false);
  }, [formValues]);

  const removeByIndex = React.useCallback(async () => {
    setAnimationInProgress('removeByIndex');
    for (let i = 0; i <= parseInt(formValues.nodeIndex); i++) {
      setCirclesState({ ...circlesStateIndexes, toCheck: i });
      await wait(500);
    }
    setCirclesState({ ...circlesInitialStateIndexes, toRemove: parseInt(formValues.nodeIndex) });
    await wait(500);
    list.current.removeAt(parseInt(formValues.nodeIndex));
    setListToRender(list.current.getList());
    setCirclesState({ ...circlesInitialStateIndexes });
    resetFormValues();
    setAnimationInProgress(false);
  }, [formValues]);


  const circleState = React.useMemo((): ICircleState => {
    return {
      head: 'head',
      tail: 'tail',
      toReplace: (value) => (<Circle letter={value} state={ElementStates.Changing} isSmall={true} />),
      succesReplaced: ElementStates.Modified,
      toRemove: (value) => (<Circle letter={value} state={ElementStates.Changing} isSmall={true} />),
      toCheck: (index: number) => index
    }
  }, [])

  const getCircleState = React.useCallback((index: number, value?: string | null | undefined) => {
    const state: Record<string, any> = {}
    const visualState: TCircleVisualState = {
      head: null,
      tail: null,
      state: ElementStates.Default
    }

    for (let key in circlesStateIndexes) {
      if (circlesStateIndexes.hasOwnProperty(key) && circleState.hasOwnProperty(key)) {
        if (index === (circlesStateIndexes as any)[key]) {
          state[key] = (circleState as any)[key]
        }
      }
    }

    for (let key in state) {
      switch (key) {
        case 'head':
          visualState.head = circleState.head || null;
          break;
        case 'tail':
          visualState.tail = circleState.tail || null;
          break;
        case 'toReplace':
          visualState.head = (circleState as any).toReplace(value);
          break;
        case 'toRemove':
          visualState.tail = (circleState as any).toRemove(value);
          break;
        case 'succesReplaced':
          visualState.state = circleState.succesReplaced || ElementStates.Default;
          break;
        default:
          (visualState as any)[key] = null;
      }
    }

    if (index <= circlesStateIndexes.toCheck) visualState.state = ElementStates.Changing;

    return visualState;
  }, [circlesStateIndexes])

  const isAddBtnDisabled = React.useCallback((): boolean => {
    return formValues.nodeValue === '' ? true : false;
  }, [formValues]);

  const isRemoveBtnDisabled = React.useCallback((): boolean => {
    return list.current.getSize() === 0 ? true : false;
  }, [formValues]);

  const isIndexBtnDisabled = React.useCallback((indexStringType: string): boolean => {
    const index = parseInt(indexStringType);
    if (indexStringType === '' || index < 0 || index > list.current.getSize() - 1) return true;
    return false;
  }, [])


  return (
    <SolutionLayout title="Связный список">
      <form name='LinkedListForm' className="mb-40">
        <fieldset className={`${styles.fieldset} mb-6`}>
          <Input maxLength={4} isLimitText={true} name={'nodeValue'} onChange={onChange} value={formValues.nodeValue} placeholder='Введите значение' extraClass={`${styles.input} mr-6`} />
          <Button text='Добавить в head' isLoader={animationInProgress === 'addHead'} disabled={!!animationInProgress || isAddBtnDisabled()} type='button' onClick={addHead} extraClass={`${styles.btn} mr-6`} />
          <Button text='Добавить в tail' isLoader={animationInProgress === 'addTail'} disabled={!!animationInProgress ||isAddBtnDisabled()} type='button' onClick={addTail} extraClass={`${styles.btn} mr-6`} />
          <Button text='Удалить из head' isLoader={animationInProgress === 'removeHead'} disabled={!!animationInProgress || isRemoveBtnDisabled()} type='button' onClick={removeHead} extraClass={`${styles.btn} mr-6`} />
          <Button text='Удалить из tail' isLoader={animationInProgress === 'removeTail'} disabled={!!animationInProgress || isRemoveBtnDisabled()} type='button' onClick={removeTail} extraClass={`${styles.btn}`} />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <Input type={'number'} name={'nodeIndex'} min={0} max={list.current.getSize() - 1} onChange={onChange} value={formValues.nodeIndex} placeholder='Введите индекс' extraClass={`${styles.input} mr-6`} />
          <Button text='Добавить по индексу' isLoader={animationInProgress === 'addByIndex'} disabled={!!animationInProgress || isIndexBtnDisabled(formValues.nodeIndex) || isAddBtnDisabled()} type='button' onClick={addByIndex} extraClass={`${styles.wideBtn} mr-6`} />
          <Button text='Удалить по индексу' isLoader={animationInProgress === 'removeByIndex'} disabled={!!animationInProgress || isIndexBtnDisabled(formValues.nodeIndex)} type='button' onClick={removeByIndex} extraClass={`${styles.wideBtn}`} />
        </fieldset>
      </form>

      <ul className={styles.circlesContainer} >
        {!!listToRender.length && listToRender.map((str, index) => {
          return (
            <li key={index.toString() + str} className={styles.listElm}>
              <Circle  letter={index === circlesStateIndexes.toRemove ? undefined : str?.toString()} head={getCircleState(index, formValues.nodeValue).head} index={index} tail={getCircleState(index, str).tail} state={getCircleState(index, str).state} extraClass="mr-8 ml-8" />
              {index !== listToRender.length - 1 && <ArrowIcon key={index.toString()} />}
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
