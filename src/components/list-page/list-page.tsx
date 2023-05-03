import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./list.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./list";
import { ElementStates } from "../../types/element-states";
import { randomArray } from "../utils/utils";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { IListState } from "../../types/list";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputIndex, setInputIndex] = useState("");
  const [listState, setListState] = useState<IListState<typeof inputValue>[]>(
    []
  );
  const [addHeadProgress, setAddHeadProgress] = useState(false);
  const [addTailProgress, setAddTailProgress] = useState(false);
  const [deleteHeadProgress, setDeleteHeadProgress] = useState(false);
  const [deleteTailProgress, setDeleteTailProgress] = useState(false);
  const [addIndexProgress, setAddIndexProgress] = useState(false);
  const [deleteIndexProgress, setDeleteIndexProgress] = useState(false);

  const list = useRef(
    new LinkedList<typeof inputValue>(
      randomArray([0, 9999], [1, 7]).map((item) => item.toString())
    )
  );

  useEffect(() => {
    setListState([...setState()]);
    //
  }, []);

  const setState = () => {
    const arr: IListState<typeof inputValue>[] = [];
    const queueCopy = list.current.toArray();
    for (let i = 0; i < queueCopy.length; i++) {
      arr.push({
        item: queueCopy[i],
        state: ElementStates.Default,
        addProgress: false,
        deleteProgress: false,
        tempItem: "",
      });
    }
    return arr;
  };

  const addHead = (value: typeof inputValue) => {
    setAddHeadProgress(true);
    const listStateCopy = [...listState];
    listStateCopy[0].addProgress = true;
    listStateCopy[0].tempItem = value;
    setListState([...listStateCopy]);
    setTimeout(() => {
      listStateCopy[0].addProgress = false;
      listStateCopy[0].tempItem = "";
      listStateCopy.unshift({
        item: value,
        state: ElementStates.Modified,
        addProgress: false,
        deleteProgress: false,
        tempItem: "",
      });
      setListState([...listStateCopy]);
    }, SHORT_DELAY_IN_MS);
    setTimeout(() => {
      listStateCopy[0].state = ElementStates.Default;
      list.current.prepend(value);
      setListState([...listStateCopy]);
      setInputValue("");
      setAddHeadProgress(false);
    }, DELAY_IN_MS);
  };

  const addTail = (value: typeof inputValue) => {
    setAddTailProgress(true);
    const listStateCopy = [...listState];
    listStateCopy[listStateCopy.length - 1].addProgress = true;
    listStateCopy[listStateCopy.length - 1].tempItem = value;
    setListState([...listStateCopy]);
    setTimeout(() => {
      listStateCopy[listStateCopy.length - 1].addProgress = false;
      listStateCopy[listStateCopy.length - 1].tempItem = "";
      listStateCopy.push({
        item: value,
        state: ElementStates.Modified,
        addProgress: false,
        deleteProgress: false,
        tempItem: "",
      });
      setListState([...listStateCopy]);
    }, SHORT_DELAY_IN_MS);
    setTimeout(() => {
      listStateCopy[listStateCopy.length - 1].state = ElementStates.Default;
      list.current.append(value);
      setListState([...listStateCopy]);
      setInputValue("");
      setAddTailProgress(false);
    }, DELAY_IN_MS);
  };

  const deleteHead = () => {
    setDeleteHeadProgress(true);
    const listStateCopy = [...listState];
    listStateCopy[0].deleteProgress = true;
    listStateCopy[0].tempItem = listStateCopy[0].item;
    listStateCopy[0].item = "";
    setListState([...listStateCopy]);
    setTimeout(() => {
      listStateCopy[0].deleteProgress = false;
      listStateCopy[0].tempItem = "";
      listStateCopy.shift();
      list.current.deleteHead();
      setListState([...listStateCopy]);
      setDeleteHeadProgress(false);
    }, SHORT_DELAY_IN_MS);
  };

  const deleteTail = () => {
    setDeleteTailProgress(true);
    const listStateCopy = [...listState];
    listStateCopy[listStateCopy.length - 1].deleteProgress = true;
    listStateCopy[listStateCopy.length - 1].tempItem =
      listStateCopy[listStateCopy.length - 1].item;
    listStateCopy[listStateCopy.length - 1].item = "";
    setListState([...listStateCopy]);
    setTimeout(() => {
      listStateCopy[listStateCopy.length - 1].deleteProgress = false;
      listStateCopy[listStateCopy.length - 1].tempItem = "";
      listStateCopy.pop();
      list.current.deleteTail();
      setListState([...listStateCopy]);
      setDeleteTailProgress(false);
    }, SHORT_DELAY_IN_MS);
  };

  const addByIndex = (value: typeof inputValue, index: number) => {
    setAddIndexProgress(true);
    const listStateCopy = [...listState];
    let currentIndex = 0;
    const cycle = setInterval(() => {
      if (currentIndex < index + 1) {
        if (currentIndex > 0) {
          listStateCopy[currentIndex - 1].addProgress = false;
          listStateCopy[currentIndex - 1].tempItem = "";
          listStateCopy[currentIndex - 1].state = ElementStates.Changing;
        }
        listStateCopy[currentIndex].addProgress = true;
        listStateCopy[currentIndex].tempItem = value;
        setListState([...listStateCopy]);
        currentIndex++;
      } else {
        setTimeout(() => {
          listStateCopy[currentIndex - 1].addProgress = false;
          listStateCopy[currentIndex - 1].tempItem = "";
          listStateCopy.splice(index, 0, {
            item: value,
            state: ElementStates.Modified,
            addProgress: false,
            deleteProgress: false,
            tempItem: "",
          });
          for (let i = 0; i < index; i++) {
            listStateCopy[i].state = ElementStates.Default;
          }
          setListState([...listStateCopy]);
        }, SHORT_DELAY_IN_MS);
        setTimeout(() => {
          listStateCopy[index].state = ElementStates.Default;
          list.current.addByIndex(value, index);
          setListState([...listStateCopy]);
          setInputValue("");
          setAddIndexProgress(false);
        }, DELAY_IN_MS);
        clearInterval(cycle);
      }
    }, SHORT_DELAY_IN_MS);
  };

  const deleteByIndex = (index: number) => {
    setDeleteIndexProgress(true);
    const listStateCopy = [...listState];
    let currentIndex = 0;
    const cycle = setInterval(() => {
      if (currentIndex < index + 1) {
        listStateCopy[currentIndex].state = ElementStates.Changing;
        setListState([...listStateCopy]);
        currentIndex++;
      } else {
        setTimeout(() => {
          listStateCopy[currentIndex - 1].state = ElementStates.Default;
          listStateCopy[currentIndex - 1].deleteProgress = true;
          listStateCopy[currentIndex - 1].tempItem =
            listStateCopy[currentIndex - 1].item;
          listStateCopy[currentIndex - 1].item = "";
          setListState([...listStateCopy]);
        }, SHORT_DELAY_IN_MS);
        setTimeout(() => {
          listStateCopy.splice(index, 1);
          for (let i = 0; i < index; i++) {
            listStateCopy[i].state = ElementStates.Default;
          }
          list.current.deleteByIndex(index);
          setListState([...listStateCopy]);
          setInputValue("");
          setDeleteIndexProgress(false);
        }, DELAY_IN_MS);
        clearInterval(cycle);
      }
    }, SHORT_DELAY_IN_MS);
  };

  return (
    <SolutionLayout title="Связный список">
      <section className={styles.main}>
        <form className={styles.form}>
          <div className={styles.formValue}>
            <Input
              placeholder={"Введите значение"}
              isLimitText={true}
              maxLength={4}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
              value={inputValue}
            />
            <Button
              disabled={
                inputValue.length <= 0 ||
                addIndexProgress ||
                addTailProgress ||
                deleteHeadProgress ||
                deleteIndexProgress ||
                deleteTailProgress
              }
              onClick={() => addHead(inputValue)}
              isLoader={addHeadProgress}
              text={"Добавить в head"}
            />
            <Button
              disabled={
                inputValue.length <= 0 ||
                addIndexProgress ||
                addHeadProgress ||
                deleteHeadProgress ||
                deleteIndexProgress ||
                deleteTailProgress
              }
              onClick={() => addTail(inputValue)}
              isLoader={addTailProgress}
              text={"Добавить в tail"}
            />
            <Button
              disabled={
                listState.length < 2 ||
                addIndexProgress ||
                addHeadProgress ||
                addTailProgress ||
                deleteIndexProgress ||
                deleteTailProgress
              }
              isLoader={deleteHeadProgress}
              text={"Удалить из head"}
              onClick={deleteHead}
            />
            <Button
              disabled={
                listState.length < 2 ||
                addIndexProgress ||
                addHeadProgress ||
                addTailProgress ||
                deleteIndexProgress ||
                deleteHeadProgress
              }
              isLoader={deleteTailProgress}
              text={"Удалить из tail"}
              onClick={deleteTail}
            />
          </div>
          <div className={styles.formIndex}>
            <Input
              type={"number"}
              placeholder={"Введите индекс"}
              max={list.current.toArray().length - 1}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (!(Number(e.target.value) < 0))
                  setInputIndex(e.target.value);
              }}
              value={inputIndex}
            />
            <Button
              disabled={
                inputValue.length <= 0 ||
                !inputIndex ||
                addHeadProgress ||
                addTailProgress ||
                deleteHeadProgress ||
                deleteIndexProgress ||
                deleteTailProgress
              }
              onClick={() => {
                if (Number(inputIndex) > listState.length) {
                  setInputIndex((listState.length - 1).toString());
                  addByIndex(inputValue, Number(listState.length - 1));
                } else {
                  addByIndex(inputValue, Number(inputIndex));
                }
              }}
              isLoader={addIndexProgress}
              text={"Добавить по индексу"}
            />
            <Button
              disabled={
                listState.length < 2 ||
                !inputIndex ||
                addIndexProgress ||
                addHeadProgress ||
                addTailProgress ||
                deleteTailProgress ||
                deleteHeadProgress
              }
              onClick={() => {
                if (Number(inputIndex) > listState.length) {
                  setInputIndex((listState.length - 1).toString());
                  deleteByIndex(Number(listState.length - 1));
                } else {
                  deleteByIndex(Number(inputIndex));
                }
              }}
              isLoader={deleteIndexProgress}
              text={"Удалить по индексу"}
            />
          </div>
        </form>
        <ul className={styles.list}>
          {listState.map((item, index, array) => {
            if (index === array.length - 1) {
              return (
                <li
                  data-testid="listItem"
                  className={styles.listItem}
                  key={index}
                >
                  <div
                    className={`${
                      item.addProgress
                        ? `${styles.topCircle} ${styles.topCircle__visible}`
                        : `${styles.topCircle}`
                    }`}
                  >
                    <Circle
                      isSmall={true}
                      letter={item.tempItem}
                      state={ElementStates.Changing}
                    />
                  </div>
                  <div className={styles.circle}>
                    <Circle
                      head={item.addProgress ? "" : index === 0 ? "head" : ""}
                      index={index}
                      state={item.state}
                      letter={item.item}
                      tail={item.deleteProgress ? "" : "tail"}
                    />
                  </div>
                  <div
                    className={`${
                      item.deleteProgress
                        ? `${styles.bottomCircle} ${styles.bottomCircle__visible}`
                        : `${styles.bottomCircle}`
                    }`}
                  >
                    <Circle
                      isSmall={true}
                      letter={item.tempItem}
                      state={ElementStates.Changing}
                    />
                  </div>
                </li>
              );
            }
            return (
              <li
                data-testid="listItem"
                className={styles.listItem}
                key={index}
              >
                <div
                  className={`${
                    item.addProgress
                      ? `${styles.topCircle} ${styles.topCircle__visible}`
                      : `${styles.topCircle}`
                  }`}
                >
                  <Circle
                    isSmall={true}
                    letter={item.tempItem}
                    state={ElementStates.Changing}
                  />
                </div>
                <div className={styles.circle}>
                  <Circle
                    head={item.addProgress ? "" : index === 0 ? "head" : ""}
                    index={index}
                    state={item.state}
                    letter={item.item}
                  />
                  <div className={styles.arrow}>
                    <ArrowIcon />
                  </div>
                </div>

                <div
                  className={`${
                    item.deleteProgress
                      ? `${styles.bottomCircle} ${styles.bottomCircle__visible}`
                      : `${styles.bottomCircle}`
                  }`}
                >
                  <Circle
                    isSmall={true}
                    letter={item.tempItem}
                    state={ElementStates.Changing}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </SolutionLayout>
  );
};
