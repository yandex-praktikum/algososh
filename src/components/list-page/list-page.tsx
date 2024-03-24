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
export const ListPage: React.FC = () => {
  const [list] = useState(new LinkedList<string>(randomLinkedList()));
  const [contentArray, setContentArray] = useState(list.toArray());
  const [inputValue, setInputValue] = useState("");
  const [indexInputValue, setIndexInputValue] = useState<number>(0);
  const [circleState, setCircleState] = useState<Array<ElementStates>>([]);

  function handleInputChanger(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }
  function handleIndexInputChanger(e: ChangeEvent<HTMLInputElement>) {
    let value = parseInt(e.target.value);
    setIndexInputValue(value);
  }

  async function listPrependMethod() {
    list.prepend(inputValue);
    await delay(SHORT_DELAY_IN_MS);
    setContentArray([...list.toArray()]);
    setInputValue("");
  }

  async function listAppendMethod() {
    list.append(inputValue);
    await delay(SHORT_DELAY_IN_MS);
    setContentArray([...list.toArray()]);
    setInputValue("");
  }
  async function listDeleteHeadMethod() {
    list.deleteHead();
    await delay(SHORT_DELAY_IN_MS);
    setContentArray([...list.toArray()]);
  }

  async function listDeleteTailMethod() {
    list.deleteTail();
    await delay(SHORT_DELAY_IN_MS);
    setContentArray([...list.toArray()]);
  }
  async function listInsertAtIndexMethod() {
    list.insertAtIndex(indexInputValue, inputValue);
    await delay(DELAY_IN_MS);
    setContentArray([...list.toArray()]);
    setInputValue("");
    setIndexInputValue(0);
  }
  async function listDeleteAtIndexMethod() {
    list.deleteAtIndex(indexInputValue);
    await delay(SHORT_DELAY_IN_MS);
    setContentArray([...list.toArray()]);
    setIndexInputValue(0);
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
          />
          <Button
            onClick={listPrependMethod}
            extraClass={styles.topButtons}
            text="Добавить в head"
            disabled={!inputValue}
          />
          <Button
            onClick={listAppendMethod}
            extraClass={styles.topButtons}
            text="Добавить в tail"
            disabled={!inputValue}
          />
          <Button
            onClick={listDeleteHeadMethod}
            extraClass={styles.topButtons}
            text="Удалить из head"
          />
          <Button
            onClick={listDeleteTailMethod}
            extraClass={styles.topButtons}
            text="Удалить из tail"
          />
        </div>
        <div className={styles.formContainer}>
          <Input
            value={indexInputValue}
            onChange={handleIndexInputChanger}
            type="number"
            placeholder="Введите индекс"
            extraClass={styles.listInput}
          />
          <Button
            onClick={listInsertAtIndexMethod}
            extraClass={styles.bottomButtons}
            text="Добавить по индексу"
            disabled={!inputValue || indexInputValue <= 0}
          />
          <Button
            onClick={listDeleteAtIndexMethod}
            extraClass={styles.bottomButtons}
            text="Удалить по индексу"
            disabled={indexInputValue <= 0}
          />
        </div>
        <div className={styles.listContent}>
          {contentArray.map((item, index) => {
            return (
              <div className={styles.listCircleContainer}>
                <Circle
                  head={index === 0 ? "head" : ""}
                  tail={index === contentArray.length - 1 ? "tail" : ""}
                  letter={item.value}
                  key={index}
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
