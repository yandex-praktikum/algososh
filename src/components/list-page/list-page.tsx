import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import ArrowIcon from "../../utils/arrowIcon";
import LinkedList from "./list";
import { delay, randomLinkedList } from "../../utils/utils";
import { Circle } from "../ui/circle/circle";
import { ChangeEvent } from "react";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import {
  headPositionGetter,
  tailPositionGetter,
} from "../../utils/linked-list";
import { disableButtonSetter } from "../../utils/utils";

export const ListPage: React.FC = () => {
  const [list] = useState(new LinkedList<string>(randomLinkedList()));
  const [contentArray, setContentArray] = useState(list.toArray());
  const [inputValue, setInputValue] = useState("");
  const [smallCircleState, setSmallCircleState] = useState("");
  const [indexInputValue, setIndexInputValue] = useState<number>(0);
  const [loader, setLoader] = useState({
    addHeadButton: false,
    addTailButton: false,
    deleteHeadButton: false,
    deleteTailButton: false,
    addByIndexButton: false,
    deleteByIndexButton: false,
  });
  const [circleState, setCircleState] = useState<Array<ElementStates>>([]);
  const [sortedState, setSortedState] = useState({
    headState: -1,
    tailState: -1,
  });

  function handleInputChanger(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }
  function handleIndexInputChanger(e: ChangeEvent<HTMLInputElement>) {
    let value = parseInt(e.target.value);
    setIndexInputValue(value);
  }

  async function listPrependMethod() {
    setLoader({ ...loader, addHeadButton: true });
    setSortedState({ ...sortedState, headState: 0 });
    list.prepend(inputValue);
    await delay(DELAY_IN_MS);
    const newArray = [...list.toArray()];
    setContentArray(newArray);
    setCircleState(() =>
      newArray.map((item, index) =>
        index === 0 ? ElementStates.Modified : ElementStates.Default
      )
    );
    setSortedState({ ...sortedState, headState: -1 });
    await delay(DELAY_IN_MS);
    setCircleState([]);
    setInputValue("");
    setLoader({ ...loader, addHeadButton: false });
  }

  async function listAppendMethod() {
    setLoader({ ...loader, addTailButton: true });
    setSortedState({ ...sortedState, headState: contentArray.length - 1 });
    list.append(inputValue);
    await delay(DELAY_IN_MS);
    const newArray = [...list.toArray()];
    setContentArray(newArray);
    setCircleState(() =>
      newArray.map((item, index, arr) =>
        index === arr.length - 1
          ? ElementStates.Modified
          : ElementStates.Default
      )
    );
    setSortedState({ ...sortedState, headState: -1 });
    await delay(DELAY_IN_MS);
    setCircleState([]);
    setInputValue("");
    setLoader({ ...loader, addTailButton: false });
  }
  async function listDeleteHeadMethod() {
    setLoader({ ...loader, deleteHeadButton: true });
    setSortedState({ ...sortedState, tailState: 0 });
    setSmallCircleState(contentArray[0].value);
    list.deleteHead();
    contentArray[0].value = "";
    await delay(DELAY_IN_MS);
    setContentArray([...list.toArray()]);
    setSortedState({ ...sortedState, tailState: -1 });
    await delay(SHORT_DELAY_IN_MS);
    setInputValue("");
    setLoader({ ...loader, deleteHeadButton: false });
  }

  async function listDeleteTailMethod() {
    setLoader({ ...loader, deleteTailButton: true });
    setSortedState({ ...sortedState, tailState: contentArray.length - 1 });
    setSmallCircleState(contentArray[contentArray.length - 1].value);
    list.deleteTail();
    contentArray[contentArray.length - 1].value = "";
    await delay(DELAY_IN_MS);
    setContentArray([...list.toArray()]);
    setSortedState({ ...sortedState, tailState: -1 });
    await delay(SHORT_DELAY_IN_MS);
    setInputValue("");
    setLoader({ ...loader, deleteTailButton: false });
  }
  async function listInsertAtIndexMethod() {
    setLoader({ ...loader, addByIndexButton: true });
    let index = 0;
    while (index <= indexInputValue) {
      await delay(DELAY_IN_MS);
      setCircleState((prev) => {
        const newCircleState = [...prev];
        if (index === indexInputValue) {
          newCircleState[index] = ElementStates.Default;
          return newCircleState;
        }
        newCircleState[index] = ElementStates.Changing;
        return newCircleState;
      });
      setSortedState({ ...sortedState, headState: index });
      index++;
    }
    await delay(DELAY_IN_MS);
    setSortedState({ ...sortedState, headState: -1 });
    list.insertAtIndex(indexInputValue, inputValue);
    const newArray = [...list.toArray()];
    setContentArray(newArray);
    setCircleState(() =>
      newArray.map((item, index) =>
        index === indexInputValue
          ? ElementStates.Modified
          : ElementStates.Default
      )
    );
    await delay(DELAY_IN_MS);
    setCircleState([]);
    setInputValue("");
    setIndexInputValue(0);
    setLoader({ ...loader, addByIndexButton: false });
  }
  async function listDeleteAtIndexMethod() {
    if (indexInputValue > contentArray.length - 1) {
      return;
    } else {
      list.deleteAtIndex(indexInputValue);
      setLoader({ ...loader, deleteByIndexButton: true });
      let index = 0;
      while (index <= indexInputValue) {
        await delay(DELAY_IN_MS);
        setCircleState((prev) => {
          const newCircleState = [...prev];
          newCircleState[index] = ElementStates.Changing;
          return newCircleState;
        });
        index++;
      }
      await delay(DELAY_IN_MS);
      setCircleState((prev) => [
        ...prev,
        (prev[indexInputValue] = ElementStates.Default),
      ]);
      setSmallCircleState(contentArray[indexInputValue].value);
      contentArray[indexInputValue].value = "";
      setSortedState({ ...sortedState, tailState: indexInputValue });
      await delay(DELAY_IN_MS);

      setContentArray([...list.toArray()]);
      setSortedState({ ...sortedState, tailState: -1 });
      setCircleState([]);
      setIndexInputValue(0);
      setLoader({ ...loader, deleteByIndexButton: false });
    }
  }
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.form}>
        <div className={styles.formContainer}>
          <Input
            value={inputValue}
            onChange={handleInputChanger}
            extraClass={styles.listInput}
            maxLength={4}
            isLimitText={true}
            disabled={Object.values(loader).some((value) => value === true)}
          />
          <Button
            onClick={listPrependMethod}
            extraClass={styles.topButtons}
            text="Добавить в head"
            disabled={
              !inputValue || disableButtonSetter("addHeadButton", loader)
            }
            isLoader={loader.addHeadButton}
          />
          <Button
            onClick={listAppendMethod}
            extraClass={styles.topButtons}
            text="Добавить в tail"
            disabled={
              !inputValue || disableButtonSetter("addTailButton", loader)
            }
            isLoader={loader.addTailButton}
          />
          <Button
            onClick={listDeleteHeadMethod}
            extraClass={styles.topButtons}
            text="Удалить из head"
            isLoader={loader.deleteHeadButton}
            disabled={
              !contentArray.length ||
              disableButtonSetter("deleteHeadButton", loader)
            }
          />
          <Button
            onClick={listDeleteTailMethod}
            extraClass={styles.topButtons}
            text="Удалить из tail"
            isLoader={loader.deleteTailButton}
            disabled={
              !contentArray.length ||
              disableButtonSetter("deleteTailButton", loader)
            }
          />
        </div>
        <div className={styles.formContainer}>
          <Input
            value={indexInputValue}
            onChange={handleIndexInputChanger}
            type="number"
            placeholder="Введите индекс"
            extraClass={styles.listInput}
            disabled={Object.values(loader).some((value) => value === true)}
          />
          <Button
            onClick={listInsertAtIndexMethod}
            extraClass={styles.bottomButtons}
            text={
              indexInputValue > contentArray.length
                ? "Индекс за пределами допустимого"
                : "Добавить по индексу"
            }
            disabled={
              !inputValue ||
              indexInputValue <= 0 ||
              disableButtonSetter("addByIndexButton", loader) ||
              indexInputValue > contentArray.length
            }
            isLoader={loader.addByIndexButton}
          />
          <Button
            onClick={listDeleteAtIndexMethod}
            extraClass={styles.bottomButtons}
            text={
              indexInputValue > contentArray.length - 1
                ? "Индекс за пределами допустимого"
                : "Удалить по индексу"
            }
            disabled={
              indexInputValue <= 0 ||
              disableButtonSetter("deleteByIndexButton", loader) ||
              indexInputValue > contentArray.length - 1 ||
              !indexInputValue
            }
            isLoader={loader.deleteByIndexButton}
          />
        </div>
        <div className={styles.listContent}>
          {contentArray.map((item, index) => {
            return (
              <div key={index} className={styles.listCircleContainer}>
                <Circle
                  head={headPositionGetter(
                    sortedState.headState,
                    index,
                    inputValue
                  )}
                  tail={tailPositionGetter(
                    sortedState.tailState,
                    index,
                    smallCircleState,
                    contentArray
                  )}
                  letter={item ? item.value : ""}
                  index={index}
                  state={circleState[index]}
                />
                {index !== contentArray.length - 1 && <ArrowIcon />}
              </div>
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
