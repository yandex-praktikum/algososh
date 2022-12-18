import React, { useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { LinkedList, LinkedListNode } from "./LinkedList";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { initialArray } from "./utils";
import { ElementStates } from "../../types/element-states";

const linkedList = new LinkedList<LinkedListNode>(initialArray);

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputValueByIndex, setInputValueByIndex] = useState("");
  const [circleLetters, setCircleLetters] = useState<string[]>([]);
  const [topSmallCircleIndex, setTopSmallCircleIndex] = useState(-1);
  const [topSmallCircleLetter, setTopSmallCircleLetter] = useState("");
  const [bottomSmallCircleIndex, setBottomSmallCircleIndex] = useState(-1);
  const [bottomCircleLetter, setBottomSmallCircleLetter] = useState("");
  const [modifiedIndexes, setModifiedIndexes] = useState<number[]>([]);
  const [changedIndexes, setChangedIndexes] = useState<number[]>([]);
  const [isLoader, setIsLoader] = useState({
    addInHead: false,
    addInTail: false,
    deleteFromHead: false,
    deleteFromTail: false,
    addByIndex: false,
    deleteByIndex: false,
  });
  const [isDisabled, setIsDisabled] = useState({
    addInHead: false,
    addInTail: false,
    deleteFromHead: false,
    deleteFromTail: false,
    addByIndex: false,
    deleteByIndex: false,
  });

  useEffect(() => {
    setCircleLetters(linkedList.arrayedlistOfElements);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputByIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueByIndex(e.target.value);
  };

  const handleAddInHeadClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setIsLoader((prevState) => ({ ...prevState, addInHead: true }));
    setIsDisabled((prevstate) => ({
      ...prevstate,
      deleteFromHead: true,
      deleteFromTail: true,
    }));
    linkedList.prepend(inputValue);
    setTopSmallCircleIndex(0);
    setTopSmallCircleLetter(inputValue);
    setInputValue("");

    setTimeout(() => {
      setCircleLetters(linkedList.arrayedlistOfElements);
      setTopSmallCircleIndex(-1);
      setTopSmallCircleLetter("");

      setModifiedIndexes([0]);

      setTimeout(() => {
        setModifiedIndexes([]);
        setIsLoader((prevState) => ({ ...prevState, addInHead: false }));
        setIsDisabled((prevstate) => ({
          ...prevstate,
          deleteFromHead: false,
          deleteFromTail: false,
        }));
      }, 1000);
    }, 1000);
  };

  const handleAddInTailClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setIsLoader((prevState) => ({ ...prevState, addInTail: true }));
    setIsDisabled((prevstate) => ({
      ...prevstate,
      deleteFromHead: true,
      deleteFromTail: true,
    }));
    linkedList.append(inputValue);
    setTopSmallCircleIndex(linkedList.arrayedlistOfElements.length - 2);
    setTopSmallCircleLetter(inputValue);
    setInputValue("");

    setTimeout(() => {
      setCircleLetters(linkedList.arrayedlistOfElements);
      setTopSmallCircleIndex(-1);
      setTopSmallCircleLetter("");

      setModifiedIndexes([linkedList.arrayedlistOfElements.length - 1]);

      setTimeout(() => {
        setModifiedIndexes([]);
        setIsLoader((prevState) => ({ ...prevState, addInTail: false }));
        setIsDisabled((prevstate) => ({
          ...prevstate,
          deleteFromHead: false,
          deleteFromTail: false,
        }));
      }, 1000);
    }, 1000);
  };

  const handleDeleteFromHeadClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setIsLoader((prevState) => ({ ...prevState, deleteFromHead: true }));
    setIsDisabled((prevstate) => ({
      ...prevstate,
      deleteFromTail: true,
    }));
    setBottomSmallCircleIndex(0);
    setCircleLetters(
      circleLetters.map((el, index) => {
        if (index === 0) {
          return (el = "");
        } else {
          return el;
        }
      })
    );
    setBottomSmallCircleLetter(linkedList.headElement);
    linkedList.deleteHead();

    setTimeout(() => {
      setCircleLetters(linkedList.arrayedlistOfElements);
      setBottomSmallCircleIndex(-1);
      setBottomSmallCircleLetter("");
      setIsLoader((prevState) => ({ ...prevState, deleteFromHead: false }));
      setIsDisabled((prevstate) => ({
        ...prevstate,
        deleteFromTail: false,
      }));
    }, 1000);
  };

  const handleDeleteFromTailClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setIsLoader((prevState) => ({ ...prevState, deleteFromTail: true }));
    setIsDisabled((prevstate) => ({
      ...prevstate,
      deleteFromHead: true,
    }));
    setBottomSmallCircleIndex(linkedList.arrayedlistOfElements.length - 1);
    setCircleLetters(
      circleLetters.map((el, index) => {
        if (index === linkedList.arrayedlistOfElements.length - 1) {
          return (el = "");
        } else {
          return el;
        }
      })
    );
    setBottomSmallCircleLetter(linkedList.tailElement);
    linkedList.deleteTail();

    setTimeout(() => {
      setCircleLetters(linkedList.arrayedlistOfElements);
      setBottomSmallCircleIndex(-1);
      setBottomSmallCircleLetter("");
      setIsLoader((prevState) => ({ ...prevState, deleteFromTail: false }));
      setIsDisabled((prevstate) => ({
        ...prevstate,
        deleteFromHead: false,
      }));
    }, 1000);
  };

  const handleAddByIndexClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    let counter: number = 0;

    setIsLoader((prevState) => ({ ...prevState, addByIndex: true }));
    setIsDisabled({
      addInHead: true,
      addInTail: true,
      deleteFromHead: true,
      deleteFromTail: true,
      addByIndex: true,
      deleteByIndex: true,
    });
    const interval = setInterval(() => {
      if (counter + 1 <= Number(inputValueByIndex)) {
        setTimeout(() => {
          setChangedIndexes((prevState) => [...prevState, counter - 1]);
          setTopSmallCircleIndex(counter);
          setTopSmallCircleLetter(inputValue);
          counter++;
        }, 1000);
      } else {
        clearInterval(interval);

        linkedList.addByIndex(inputValue, Number(inputValueByIndex));

        setTimeout(() => {
          setCircleLetters(linkedList.arrayedlistOfElements);
          setTopSmallCircleIndex(-1);
          setTopSmallCircleLetter("");
          setModifiedIndexes([Number(inputValueByIndex)]);

          setTimeout(() => {
            setModifiedIndexes([]);
            setChangedIndexes([]);
            setIsLoader((prevState) => ({ ...prevState, addByIndex: false }));
            setIsDisabled({
              addInHead: false,
              addInTail: false,
              deleteFromHead: false,
              deleteFromTail: false,
              addByIndex: false,
              deleteByIndex: false,
            });
          }, 1000);
        }, 1000);
      }
    }, 1000);
    setInputValueByIndex("");
    setInputValue("");
  };

  const handleDeleteByIndexClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    let counter: number = 0;

    setIsLoader((prevState) => ({ ...prevState, deleteByIndex: true }));
    setIsDisabled({
      addInHead: true,
      addInTail: true,
      deleteFromHead: true,
      deleteFromTail: true,
      addByIndex: true,
      deleteByIndex: true,
    });
    const interval = setInterval(() => {
      if (counter + 1 <= Number(inputValueByIndex)) {
        setChangedIndexes((prevState) => [...prevState, counter]);

        counter++;
      } else {
        clearInterval(interval);

        setBottomSmallCircleIndex(counter);
        setChangedIndexes([counter]);
        setCircleLetters(
          circleLetters.map((el, index) => {
            if (index === counter) {
              return (el = "");
            } else {
              return el;
            }
          })
        );

        setBottomSmallCircleLetter(
          linkedList.elementByIndex(Number(inputValueByIndex))
        );

        linkedList.deleteByIndex(Number(inputValueByIndex));

        setTimeout(() => {
          setCircleLetters(linkedList.arrayedlistOfElements);
          setBottomSmallCircleIndex(-1);
          setBottomSmallCircleLetter("");

          setChangedIndexes([]);

          setTimeout(() => {
            setChangedIndexes([]);
            setIsLoader((prevState) => ({
              ...prevState,
              deleteByIndex: false,
            }));
            setIsDisabled({
              addInHead: false,
              addInTail: false,
              deleteFromHead: false,
              deleteFromTail: false,
              addByIndex: false,
              deleteByIndex: false,
            });
          }, 1000);
        }, 1000);
      }
    }, 1000);
    setInputValue("");
    setInputValueByIndex("");
  };

  const getActualState = (index: number): ElementStates => {
    if (modifiedIndexes.includes(index)) return ElementStates.Modified;
    if (changedIndexes.includes(index)) return ElementStates.Changing;
    return ElementStates.Default;
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.mainContainer}>
        <form className={styles.form}>
          <div className={styles.boxWrapper}>
            <div className={styles.inputWrapper}>
              <Input
                placeholder="Введите значение"
                maxLength={4}
                type="text"
                isLimitText={true}
                value={inputValue}
                onInput={handleInput}
              />
            </div>
            <Button
              text="Добавить в head"
              onClick={handleAddInHeadClick}
              disabled={
                (inputValue.length === 0 && inputValueByIndex.length === 0) ||
                isDisabled.addInHead ||
                (inputValue.length === 0 && inputValueByIndex.length !== 0)
              }
              isLoader={isLoader.addInHead}
            />
            <Button
              text="Добавить в tail"
              onClick={handleAddInTailClick}
              disabled={
                (inputValue.length === 0 && inputValueByIndex.length === 0) ||
                isDisabled.addInTail ||
                (inputValue.length === 0 && inputValueByIndex.length !== 0)
              }
              isLoader={isLoader.addInTail}
            />
            <Button
              text="Удалить из head"
              onClick={handleDeleteFromHeadClick}
              isLoader={isLoader.deleteFromHead}
              disabled={
                isDisabled.deleteFromHead ||
                (inputValue.length !== 0 && inputValueByIndex.length === 0)
              }
            />
            <Button
              text="Удалить из tail"
              onClick={handleDeleteFromTailClick}
              isLoader={isLoader.deleteFromTail}
              disabled={
                isDisabled.deleteFromTail ||
                (inputValue.length !== 0 && inputValueByIndex.length === 0)
              }
            />
          </div>
          <div className={styles.boxWrapper}>
            <div className={styles.inputWrapper}>
              <Input
                placeholder="Введите индекс"
                type="number"
                max={inputValue.length - 1}
                onInput={handleInputByIndex}
                value={inputValueByIndex}
              />
            </div>
            <div className={styles.boxWrapper}>
              <Button
                text="Добавить по индексу"
                onClick={handleAddByIndexClick}
                disabled={
                  (inputValue.length === 0 && inputValueByIndex.length === 0) ||
                  (inputValue.length === 0 && inputValueByIndex.length !== 0) ||
                  isDisabled.addByIndex
                }
                isLoader={isLoader.addByIndex}
                extraClass="mr-6"
              />
              <Button
                text="Удалить по индексу"
                onClick={handleDeleteByIndexClick}
                disabled={
                  (inputValue.length === 0 && inputValueByIndex.length === 0) ||
                  isDisabled.deleteByIndex
                }
                isLoader={isLoader.deleteByIndex}
              />
            </div>
          </div>
        </form>
        <div className={styles.circlesWrapper}>
          {circleLetters.map((letter, i, arr) => {
            return (
              <React.Fragment key={i}>
                <div className={styles.twoCirclesWrapper}>
                  {i === topSmallCircleIndex && (
                    <Circle
                      letter={topSmallCircleLetter}
                      isSmall={true}
                      state={ElementStates.Changing}
                      extraClass={styles.topCircle}
                    />
                  )}
                  <Circle
                    letter={letter}
                    index={i}
                    head={i === 0 && topSmallCircleIndex ? "head" : ""}
                    tail={
                      arr.length - 1 === i && !bottomCircleLetter ? "tail" : ""
                    }
                    state={getActualState(i)}
                  ></Circle>
                  {i === bottomSmallCircleIndex && (
                    <Circle
                      letter={bottomCircleLetter}
                      isSmall={true}
                      state={ElementStates.Changing}
                      extraClass={styles.bottomCircle}
                    />
                  )}
                </div>
                {arr.length - 1 !== i && <ArrowIcon></ArrowIcon>}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
