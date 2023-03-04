import React, { useEffect, useRef, useState } from "react";
import { Functions  } from "../../types/linkedList-functions";
import { ElementStates } from "../../types/element-states";
import { ButtonPositions as Positions } from "../../types/button-positions";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Scroll } from '../ui/scroll/scroll';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./utils";
import {
  generateInitialArray,
  setDelay,
} from "../../utils-common/utils-common";
import { useForm } from "../../hooks/useForm";
import { DELAY_IN_MS } from "../../constants/delays";
import {
  MIN_LIST_LEN,
  MAX_LIST_LEN,
  MIN_LIST_VALUE,
  MAX_LIST_VALUE,
} from "../../constants/linked-list";
import styles from "./list.module.css";

export const ListPage: React.FC = () => {
  const linkedList = useRef(
    new LinkedList(
      generateInitialArray({
        minLength: MIN_LIST_LEN,
        maxLength: MAX_LIST_LEN,
        minVal: MIN_LIST_VALUE,
        maxVal: MAX_LIST_VALUE,
      }).map((item) => String(item))
    )
  );

  const [result, setResult] = useState<string[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [action, setAction] = useState<Functions | undefined>(undefined);
  const [currentElement, setCurrentElement] = useState("");
  const [modifiedIndex, setModifiedIndex] = useState(-1);
  const [changingIndex, setChangingIndex] = useState(-1);
  const [activeCircleIndex, setActiveCircleIndex] = useState(-1);
  const [activeCirclePosition, setActiveCirclePosition] = useState<
    Positions | undefined
  >(undefined);

  const { values, handleChange, clearValue } = useForm({
    value: "",
    index: -1,
  });

  const value =
    typeof values["value"] !== "string"
      ? String(values["value"])
      : values["value"];

  const index =
    typeof values["index"] === "string"
      ? Number.parseInt(values["index"])
      : values["index"];

  const displayResult = () => {
    setResult(
      linkedList.current.listToArray().map((item) => {
        return item;
      })
    );
  };

  const handleAddHeadClick = async () => {
    setLoader(true);
    setAction(Functions.AddToHead);
    linkedList.current.prepend(value);

    if (result.length > 0) {
      setCurrentElement(value);
      clearValue("value");
      setActiveCirclePosition(Positions.Top);
      setActiveCircleIndex(0);
      await setDelay(DELAY_IN_MS);
      setActiveCircleIndex(-1);
      setModifiedIndex(0);
      displayResult();
      await setDelay(DELAY_IN_MS);
      setModifiedIndex(-1);
      setActiveCirclePosition(undefined);
    } else {
      clearValue("value");
      displayResult();
      setModifiedIndex(0);
      await setDelay(DELAY_IN_MS);
      setModifiedIndex(-1);
    }
    setLoader(false);
    setAction(undefined);
  };

  const handleAddTailClick = async () => {
    setLoader(true);
    setAction(Functions.AddToTail);
    linkedList.current.append(value);
    if (result.length > 0) {
      setCurrentElement(value);
      clearValue("value");
      setActiveCirclePosition(Positions.Top);
      setActiveCircleIndex(linkedList.current.listLength - 2);
      await setDelay(DELAY_IN_MS);
      setActiveCircleIndex(-1);
      setModifiedIndex(linkedList.current.listLength - 1);
      displayResult();
      await setDelay(DELAY_IN_MS);
      setModifiedIndex(-1);
      setActiveCirclePosition(undefined);
    } else {
      clearValue("value");
      displayResult();
      setModifiedIndex(0);
      await setDelay(DELAY_IN_MS);
      setModifiedIndex(-1);
    }

    setLoader(false);
    setAction(undefined);
  };

  const handleDeleteHeadClick = async () => {
    setLoader(true);
    setAction(Functions.DeleteFromHead);
    setActiveCirclePosition(Positions.Bottom);
    setActiveCircleIndex(0);
    setCurrentElement(result[0]);
    setResult((prev) => ["", ...prev.slice(1)]);
    await setDelay(DELAY_IN_MS);
    setActiveCircleIndex(-1);
    setActiveCirclePosition(undefined);
    linkedList.current.deleteHead();
    displayResult();
    setLoader(false);
    setAction(undefined);
  };

  const handleDeleteTailClick = async () => {
    setLoader(true);
    setAction(Functions.DeleteFromTail);
    setActiveCirclePosition(Positions.Bottom);
    setActiveCircleIndex(result.length - 1);
    setCurrentElement(result[result.length - 1]);
    setResult((prev) => [...prev.slice(0, result.length - 1), ""]);
    await setDelay(DELAY_IN_MS);
    setActiveCircleIndex(-1);
    setActiveCirclePosition(undefined);
    linkedList.current.deleteTail();
    displayResult();
    setLoader(false);
    setAction(undefined);
  };

  const handleAddByIndex = async () => {
    setLoader(true);
    setAction(Functions.AddByIndex);
    let currentIndex = 0;
    while (currentIndex <= index) {
      setChangingIndex(currentIndex);
      await setDelay(DELAY_IN_MS);
      currentIndex++;
    }
    setActiveCirclePosition(Positions.Top);
    setActiveCircleIndex(index);
    setCurrentElement(value);
    await setDelay(DELAY_IN_MS);
    linkedList.current.addByIndex(value, index);
    setActiveCircleIndex(-1);
    setModifiedIndex(index);
    displayResult();
    await setDelay(DELAY_IN_MS);

    setModifiedIndex(-1);
    setChangingIndex(-1);
    setActiveCirclePosition(undefined);
    clearValue("value");
    clearValue("index");
    setLoader(false);
    setAction(undefined);
  };

  const handleDeleteByIndex = async () => {
    setLoader(true);
    setAction(Functions.DeleteByIndex);

    let currentIndex = 0;

    while (currentIndex <= index) {
      setChangingIndex(currentIndex);
      await setDelay(DELAY_IN_MS);
      currentIndex++;
    }
    setActiveCirclePosition(Positions.Bottom);
    setActiveCircleIndex(index);

    setCurrentElement(result[index]);
    setResult((prev) => [
      ...prev.slice(0, index),
      "",
      ...prev.slice(index + 1),
    ]);
    await setDelay(DELAY_IN_MS);

    setActiveCircleIndex(-1);
    setChangingIndex(-1);
    setActiveCirclePosition(undefined);
    linkedList.current.deleteByIndex(index);
    clearValue("index");
    displayResult();
    setLoader(false);
    setAction(undefined);
  };

  const isValidAddByIndex = (): boolean | undefined => {
    return !(
      value.length !== 0 &&
      index > -1 &&
      index < linkedList.current.listLength
    );
  };

  const isValidDeleteByIndex = (): boolean | undefined => {
    return !(index > -1 && index < linkedList.current.listLength);
  };

  const headListTitle = (index: number) => {
    return activeCircleIndex === index &&
      activeCirclePosition === Positions.Top ? (
      <Circle letter={currentElement} state={ElementStates.Changing} isSmall />
    ) : index === 0 ? (
      "head"
    ) : undefined;
  };

  const tailListTitle = (index: number) => {
    return activeCircleIndex === index &&
      activeCirclePosition === Positions.Bottom ? (
      <Circle letter={currentElement} state={ElementStates.Changing} isSmall />
    ) : index === result.length - 1 ? (
      "tail"
    ) : undefined;
  };

  useEffect(() => {
    displayResult();
  }, []);

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.list__wrap} onSubmit={(e) => e.preventDefault()}>
        <fieldset className={styles.list__group}>
          <Input
            type={"text"}
            placeholder={"Введите значение"}
            maxLength={4}
            isLimitText={true}
            value={value}
            name={"value"}
            onChange={handleChange}
            disabled={loader}
          />
          <Button
            type={"button"}
            text={"Добавить в head"}
            style={{ minWidth: "175px" }}
            onClick={handleAddHeadClick}
            isLoader={loader && action === Functions.AddToHead}
            disabled={
              (loader && action !== Functions.AddToHead) || value.length === 0
            }
          />
          <Button
            type={"button"}
            text={"Добавить в tail"}
            style={{ minWidth: "175px" }}
            onClick={handleAddTailClick}
            isLoader={loader && action === Functions.AddToTail}
            disabled={
              (loader && action !== Functions.AddToTail) || value.length === 0
            }
          />
          <Button
            type={"button"}
            text={"Удалить из head"}
            style={{ minWidth: "175px" }}
            onClick={handleDeleteHeadClick}
            isLoader={loader && action === Functions.DeleteFromHead}
            disabled={
              (loader && action !== Functions.DeleteFromHead) ||
              result.length === 0
            }
          />
          <Button
            type={"button"}
            text={"Удалить из tail"}
            style={{ minWidth: "175px" }}
            onClick={handleDeleteTailClick}
            isLoader={loader && action === Functions.DeleteFromTail}
            disabled={
              (loader && action !== Functions.DeleteFromTail) ||
              result.length === 0
            }
          />
        </fieldset>
        <fieldset className={styles.list__group}>
          <Input
            type={"number"}
            placeholder={"Введите индекс"}
            value={index === -1 ? "" : index}
            name={"index"}
            onChange={handleChange}
            disabled={loader}
          />
          <Button
            type={"button"}
            text={"Добавить по индексу"}
            style={{ minWidth: "362px" }}
            onClick={handleAddByIndex}
            isLoader={loader && action === Functions.AddByIndex}
            disabled={
              (loader && action !== Functions.AddByIndex) ||
              isValidAddByIndex()
            }
          />
          <Button
            type={"button"}
            text={"Удалить по индексу"}
            style={{ minWidth: "362px" }}
            onClick={handleDeleteByIndex}
            isLoader={loader && action === Functions.DeleteByIndex}
            disabled={
              (loader && action !== Functions.DeleteByIndex) ||
              isValidDeleteByIndex()
            }
          />
        </fieldset>
      </form>
      <Scroll>
      <div className={styles.container}>
        <ul className={styles.list__results}>
          {result.length > 0 &&
            result.map((item, index) => {
              const currentState =
                modifiedIndex === index
                  ? ElementStates.Modified
                  : changingIndex >= index
                  ? ElementStates.Changing
                  : ElementStates.Default;

              const head = headListTitle(index);
              const tail = tailListTitle(index);

              return (
               
                <li key={index} className={styles.list__item}>
                  <Circle
                    letter={`${item}`}
                    index={index}
                    state={currentState}
                    head={head}
                    tail={tail}
                  />

                  {index !== result.length - 1 && (
                    <ArrowIcon
                      fill={changingIndex - 1 >= index ? "#d252e1" : undefined}
                    />
                  )}
                </li>
              );
            })}
        </ul>
      </div>
      </Scroll>
    </SolutionLayout>
  );
};
