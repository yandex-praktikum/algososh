import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import styles from "./list-page.module.css"
import { Circle } from "../ui/circle/circle"
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { LIST_INIT_VALUES, LIST_MAX_LENGTH_ARR, LIST_STRING_MAX_LENGTH } from "../../constants/restrictions"
import { ElementStates } from "../../types/element-states";
import { TFormData } from "../../types/form"
import { useForm } from "../../components/hooks/useForm"
import { LinkedList } from "./utils";
import { NodeHead, NodeTail } from "./node-small";

const list = new LinkedList<string>(LIST_INIT_VALUES);

export const ListPage: React.FC = () => {

  const { values, handleChange } = useForm<TFormData>({ sourceString: '', sourceIndex: '' });

  const [arr, setArr] = useState<(string | null)[]>([]);
  const [state, setState] = useState(ElementStates.Default)
  const [node, setNode] = useState<{ value: string, index: null | number, head: boolean }>({ value: '', index: null, head: true })
  const [circleText, setCircleText] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [loader, setIsLoader] = useState({
    buttonAddHead: false,
    buttonAddTail: false,
    buttonRemoveHead: false,
    buttonRemoveTail: false,
    buttonInsertAt: false,
    bottonRemoveAt: false,
  })

  const MIN_INDEX = 1;
  const MAX_INDEX = arr.length - 1;
 
  useEffect(() => {
    setArr([...list.getItems()])
  }, []);

  const addHead = async () => {
    setIsLoader({ ...loader, buttonAddHead: true })
    list.prepend(values.sourceString)
    setNode({ value: values.sourceString, index: 0, head: true })
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setArr([...list.getItems()])
    setNode({ value: '', index: 0, head: true })
    values.sourceString = '';
    values.sourceIndex = '';
    await switchState()
    setIsLoader({ ...loader, buttonAddHead: false })
  }

  const addTail = async () => {
    setIsLoader({ ...loader, buttonAddTail: true })
    list.append(values.sourceString)
    setNode({ value: values.sourceString, index: arr.length - 1, head: true })
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setArr([...list.getItems()])
    setNode({ value: '', index: arr.length, head: true })
    values.sourceString = '';
    values.sourceIndex = '';
    await switchState()
    setIsLoader({ ...loader, buttonAddTail: false })
  }

  const removeHead = async () => {
    setIsLoader({ ...loader, buttonRemoveHead: true })
    setCircleText(true)
    list.removeHead()
    setNode({ value: '', index: 0, head: false })
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setArr([...list.getItems()])
    setNode({ value: '', index: null, head: false })
    setIsLoader({ ...loader, buttonRemoveHead: false })
    setCircleText(false)
  }

  const removeTail = async () => {
    setIsLoader({ ...loader, buttonRemoveTail: true })
    setCircleText(true)
    list.removeTail()
    setNode({ value: '', index: arr.length - 1, head: false })
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setArr([...list.getItems()])
    setNode({ value: '', index: null, head: false })
    setIsLoader({ ...loader, buttonRemoveTail: false })
    setCircleText(false)
  }

  const insertAt = async () => {
    const index = +values.sourceIndex
    setIsLoader({ ...loader, buttonInsertAt: true })
    list.insertAt(values.sourceString, index)
    for (let i = 0; i <= index; i++) {
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      setCurrentIndex(i)
      setNode({ value: values.sourceString, index: i, head: true })
      setState(ElementStates.Changing)
    }
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setCurrentIndex(-1)
    setNode({ value: '', index: index, head: true })
    setState(ElementStates.Modified)
    setArr([...list.getItems()])
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setNode({ value: '', index: null, head: true })
    values.sourceString = '';
    values.sourceIndex = '';
    setState(ElementStates.Default)
    setIsLoader({ ...loader, buttonInsertAt: false })
  }

  const removeAt = async () => {
    const index = +values.sourceIndex
    setIsLoader({ ...loader, bottonRemoveAt: true })
    list.removeAt(index)
    for (let i = 0; i <= index; i++) {
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      setCurrentIndex(i)
      setNode({ value: values.sourceIndex, index: i, head: false })
      setState(ElementStates.Changing)
    }
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setCurrentIndex(-1)
    setNode({ value: '', index: index, head: false })
    setCircleText(true)
    setState(ElementStates.Default)
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setArr([...list.getItems()])
    setNode({ value: '', index: null, head: true })
    values.sourceString = '';
    values.sourceIndex = '';
    setCircleText(false)
    setIsLoader({ ...loader, bottonRemoveAt: false })
  }

  const loaderButtons =
    loader.buttonAddHead ||
    loader.buttonAddTail ||
    loader.buttonRemoveHead ||
    loader.buttonRemoveTail ||
    loader.buttonInsertAt ||
    loader.bottonRemoveAt ? true : false

  const stateAddButtons = !values.sourceString || loaderButtons || arr.length >= LIST_MAX_LENGTH_ARR ? true : false;
  const stateDeleteButtons = !arr.length || loaderButtons ? true : false;  
  const stateButtonInsertAt = !values.sourceString || !values.sourceIndex || loaderButtons || +values.sourceIndex < 0 || +values.sourceIndex > arr.length - 1 || arr.length >= LIST_MAX_LENGTH_ARR ? true : false;
  const stateButtonRemoveAt = !arr.length || !values.sourceIndex || loaderButtons || +values.sourceIndex < 0 || +values.sourceIndex > arr.length - 1 ? true : false;

  const switchState = async () => {
    setState(ElementStates.Modified)
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setState(ElementStates.Default)
  }

  return (
    <SolutionLayout title="Связный список">
      <section className={styles.main}>
        <form className={styles.form}>
          <div className={styles.controlContainer}>
            <Input
              placeholder="Введите значение"
              extraClass={styles.inputWidth}
              isLimitText={true}
              maxLength={LIST_STRING_MAX_LENGTH}
              value={values.sourceString}
              onChange={handleChange}
              name={"sourceString"}
              disabled={loaderButtons}
            />
            <Button
              extraClass={styles.buttonWidth_175}
              text="Добавить в head"
              isLoader={loader.buttonAddHead}
              disabled={stateAddButtons}
              onClick={() => addHead()}
            />
            <Button
              extraClass={styles.buttonWidth_175}
              text="Добавить в tail"
              isLoader={loader.buttonAddTail}
              disabled={stateAddButtons}
              onClick={() => addTail()}
            />
            <Button
              extraClass={styles.buttonWidth_175}
              text="Удалить из head"
              isLoader={loader.buttonRemoveHead}
              disabled={stateDeleteButtons}
              onClick={() => removeHead()}
            />
            <Button
              extraClass={styles.buttonWidth_175}
              text="Удалить из tail"
              isLoader={loader.buttonRemoveTail}
              disabled={stateDeleteButtons}
              onClick={() => removeTail()}
            />
          </div>
          <div className={styles.controlContainer}>
            <Input
              placeholder="Введите индекс"
              extraClass={styles.inputWidth}
              value={values.sourceIndex}
              onChange={handleChange}
              name={"sourceIndex"}
              min={MIN_INDEX}
              max={MAX_INDEX}
              type={"number"}
              disabled={loaderButtons}
            />
            <Button
              extraClass={styles.buttonWidth_362}
              text="Добавить по индексу"
              isLoader={loader.buttonInsertAt}
              disabled={stateButtonInsertAt}
              onClick={() => insertAt()}
            />
            <Button
              extraClass={styles.buttonWidth_362}
              text="Удалить по индексу"
              isLoader={loader.bottonRemoveAt}
              disabled={stateButtonRemoveAt}
              onClick={() => removeAt()}
            />
          </div>

        </form>
        <ul className={styles.columnList}>
          {arr && arr.map((item, index) => (
            <li key={index} className={styles.circleChevron}>
              <Circle
                index={index}
                state={currentIndex > index || index === node.index ? state : ElementStates.Default}
                head={NodeHead(index, node)}
                tail={NodeTail(index, node, item as string, arr.length)}
                letter={((index === node.index && circleText) ? '' : item) as string | undefined}
              />
            </li>
          ))
          }
        </ul>
      </section>
    </SolutionLayout>
  );
};
