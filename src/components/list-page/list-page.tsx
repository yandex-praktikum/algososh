import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { stringCharsProps } from "../../types/types";
import { getNumber, delay } from "../../utils/utils";
import { InputContainer } from "../input-container/input-container";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { ILinkedList, LinkedList } from "./utils";

export const ListPage: React.FC = () => {
  const maxNum = 12;
  const minNum = 6;

  useEffect(() => {
    const stringsArray = Array.from({ length: minNum }, () => `${getNumber()}`);
    const basicState: stringCharsProps[] = [];
    const newLinkedList = new LinkedList<string>(stringsArray);
    stringsArray.forEach((el) => {
      basicState.push({
        char: el,
        state: ElementStates.Default,
      });
    });

    setLinkedList(newLinkedList);
    setArrayCircles(basicState.reverse());
  }, []);

  const [value, setValue] = useState<string>("");
  const [idx, setIdx] = useState<number>();
  const [arrayOfCircles, setArrayCircles] = useState<stringCharsProps[]>([]);
  const [linkedList, setLinkedList] = useState<ILinkedList<string>>();
  const [addingToHead, setAddingToHead] = useState(false);
  const [addingToTail, setAddingToTail] = useState(false);
  const [deletingFromHead, setDeletingFromHead] = useState(false);
  const [deletingFromTail, setDeletingFromTail] = useState(false);
  const [addingByIdx, setAddingByIdx] = useState(false);
  const [deletingByIdx, setDeletingByIdx] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const sortAndWait = async (arr: stringCharsProps[]) => {
    setArrayCircles([...arr]);
    await delay(SHORT_DELAY_IN_MS);
  };

  const addToHead = async () => {
    const copyArr = [...arrayOfCircles];
    setInProgress(true);
    setAddingToHead(true);
    linkedList!.print();
    // Добавляем новую голову в наш список
    linkedList!.insertAt(value, 0);
    // Сразу извлекаем для рендера из списка новый элемент
    const headValue = linkedList!.getNodeByIndex(0);
    linkedList!.print();
    // Подсвечиваем голову
    copyArr[0] = {
      ...copyArr[0],
      adding: true,
      extraCircle: {
        char: headValue ? headValue : "",
      },
    };
    await sortAndWait([...copyArr]);
    // Убираем подсветку и добавляем новую голову
    copyArr[0] = {
      ...copyArr[0],
      adding: false,
      extraCircle: undefined,
    };
    copyArr.unshift({
      char: headValue ? headValue : "",
      state: ElementStates.Modified,
    });
    await sortAndWait([...copyArr]);
    // Меняем стейт головы
    copyArr[0].state = ElementStates.Default;
    setInProgress(false);
    setAddingToHead(false);
    setValue("");
  };

  const addToTail = async () => {
    const copyArr = [...arrayOfCircles];
    setInProgress(true);
    setAddingToTail(true);
    linkedList!.print();
    // Добавляем элемент в хвост
    linkedList!.addToTail(value);
    // Получаем размер списка (он же индекс хвоста)
    const tailIdx = linkedList!.getSize() - 1;
    // Сразу извлекаем из хвоста списка новый элемент
    const TailValue = linkedList!.getNodeByIndex(tailIdx);
    linkedList!.print();
    // Запускаем цикл
    for (let i = 0; i <= tailIdx; i++) {
      copyArr[i] = {
        ...copyArr[i],
        adding: true,
        extraCircle: {
          char: TailValue ? TailValue : "",
        },
      };
      if (i > 0) {
        copyArr[i - 1] = {
          ...copyArr[i - 1],
          adding: false,
          extraCircle: undefined,
          state: ElementStates.Changing,
        };
      }
      await sortAndWait([...copyArr]);
    }
    // Добавляем в хвост списка новый элемент
    copyArr[copyArr.length - 1] = {
      ...copyArr[copyArr.length],
      char: TailValue ? TailValue : "",
      state: ElementStates.Modified,
      adding: false,
      extraCircle: undefined,
    };
    await sortAndWait([...copyArr]);
    // Меняем стейт хвоста
    copyArr.forEach((el) => (el.state = ElementStates.Default));
    await sortAndWait([...copyArr]);
    setInProgress(false);
    setAddingToTail(false);
    setValue("");
  };

  const removeFromHead = async () => {
    const copyArr = [...arrayOfCircles];
    setInProgress(true);
    setDeletingFromHead(true);
    linkedList!.print();
    // Удаляем элемент из списка и сразу берём его значение
    const deletedElement = linkedList!.removeFromPosition(0);
    linkedList!.print();
    // Смещаем голову в нижний кружок
    copyArr[0] = {
      ...copyArr[0],
      char: "",
      deleting: true,
      extraCircle: {
        char: deletedElement ? deletedElement : "",
      },
    };
    await sortAndWait([...copyArr]);
    // Удаляем элемент и подсвечиваем новую голову
    copyArr.shift();
    copyArr[0].state = ElementStates.Modified;
    await sortAndWait([...copyArr]);
    // Убираем подсветку с новой головы
    copyArr[0].state = ElementStates.Default;
    setInProgress(false);
    setDeletingFromHead(false);
  };

  const removeFromTail = async () => {
    const copyArr = [...arrayOfCircles];
    setInProgress(true);
    setDeletingFromTail(true);
    const { length } = copyArr;
    linkedList!.print();
    // Получаем индекс хвоста
    const tailIdx = linkedList!.getSize() - 1;
    // Удаляем элемент из списка и сразу берём его значение
    const deletedElement = linkedList!.removeFromPosition(tailIdx);
    linkedList!.print();
    // Смещаем хвост в нижний кружок
    copyArr[length - 1] = {
      ...copyArr[length - 1],
      char: "",
      deleting: true,
      extraCircle: {
        char: deletedElement ? deletedElement : "",
      },
    };
    await sortAndWait([...copyArr]);
    // Удаляем элемент и подсвечиваем новый хвост
    copyArr.pop();
    copyArr[length - 2].state = ElementStates.Modified;
    await sortAndWait([...copyArr]);
    // Убираем подсветку с нового хвоста
    copyArr[length - 2].state = ElementStates.Default;
    setInProgress(false);
    setDeletingFromTail(false);
  };

  const addByIdx = async (idx: number) => {
    const copyArr = [...arrayOfCircles];
    setInProgress(true);
    setAddingByIdx(true);
    linkedList!.print();
    // Добавляем новую элемент в наш список
    linkedList!.insertAt(value, idx);
    // Сразу извлекаем для рендера из списка новый элемент
    const newValue = linkedList!.getNodeByIndex(idx);
    linkedList!.print();
    // Запускаем перебор по элементам массива
    for (let i = 0; i <= idx!; i++) {
      copyArr[i] = {
        ...copyArr[i],
        adding: true,
        extraCircle: {
          char: newValue ? newValue : "",
        },
      };
      if (i > 0)
        copyArr[i - 1] = {
          ...copyArr[i - 1],
          adding: false,
          extraCircle: undefined,
          state: ElementStates.Changing,
        };
      await sortAndWait([...copyArr]);
    }
    // Добавляем элемент по индексу
    copyArr[idx!] = {
      ...copyArr[idx!],
      adding: false,
      extraCircle: undefined,
    };
    copyArr.splice(idx!, 0, {
      char: newValue ? newValue : "",
      state: ElementStates.Modified,
    });
    await sortAndWait([...copyArr]);
    // Убираем подсветку
    copyArr.forEach((el) => (el.state = ElementStates.Default));
    setInProgress(false);
    setAddingByIdx(false);
    setValue("");
    setIdx(undefined);
  };

  const removeByIdx = async (idx: number) => {
    const copyArr = [...arrayOfCircles];
    const deletingValue = copyArr[idx!].char;
    setInProgress(true);
    setDeletingByIdx(true);
    linkedList!.print();
    // Удаляем элемент из списка
    const deletedElement = linkedList!.removeFromPosition(idx);
    linkedList!.print();
    // Запускаем перебор по элементам массива
    for (let i = 0; i <= idx!; i++) {
      copyArr[i].state = ElementStates.Changing;
      if (i === idx) copyArr[i].noArrow = true;
      await sortAndWait([...copyArr]);
    }
    // Показываем удаляемый элемент
    copyArr[idx!] = {
      ...copyArr[idx!],
      char: "",
      deleting: true,
      extraCircle: {
        char: deletedElement ? deletedElement : "",
      },
    };
    await sortAndWait([...copyArr]);
    // Удаляем элемент
    copyArr.splice(idx!, 1);
    // Убираем подсветку
    copyArr.forEach((el) => (el.state = ElementStates.Default));
    setInProgress(false);
    setDeletingByIdx(false);
    setIdx(undefined);
    await sortAndWait([...copyArr]);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <InputContainer>
          <Input
            extraClass={styles.input}
            placeholder="Введите значение"
            min={1}
            value={value || ""}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setValue(e.currentTarget.value)
            }
            isLimitText={true}
            maxLength={4}
          />
          <Button
            extraClass={styles.button}
            disabled={inProgress || !value || arrayOfCircles.length > maxNum}
            isLoader={addingToHead}
            text="Добавить в head"
            type="button"
            onClick={() => addToHead()}
          />
          <Button
            extraClass={styles.button}
            isLoader={addingToTail}
            disabled={inProgress || !value || arrayOfCircles.length > maxNum}
            text="Добавить в tail"
            type="button"
            onClick={() => addToTail()}
          />
          <Button
            extraClass={styles.button}
            disabled={inProgress || arrayOfCircles.length <= 1}
            isLoader={deletingFromHead}
            text="Удалить из head"
            type="button"
            onClick={() => removeFromHead()}
          />
          <Button
            extraClass={styles.button}
            disabled={inProgress || arrayOfCircles.length <= 1}
            isLoader={deletingFromTail}
            text="Удалить из tail"
            type="button"
            onClick={() => removeFromTail()}
          />
        </InputContainer>
        <InputContainer>
          <Input
            type="text"
            extraClass={styles.input}
            placeholder="Введите индекс"
            maxLength={1}
            value={idx || ""}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setIdx(Number(e.currentTarget.value.replace(/[^0-9]/g, "")))
            }
          />
          <Button
            extraClass={styles.bigButton}
            disabled={
              !value ||
              !idx ||
              inProgress ||
              idx > arrayOfCircles.length - 1 ||
              arrayOfCircles.length > maxNum
            }
            isLoader={addingByIdx}
            text="Добавить по индексу"
            type="button"
            onClick={() => idx && addByIdx(idx)}
          />
          <Button
            extraClass={styles.bigButton}
            isLoader={deletingByIdx}
            disabled={!idx || inProgress || idx > arrayOfCircles.length - 1}
            text="Удалить по индексу"
            type="button"
            onClick={() => idx && removeByIdx(idx)}
          />
        </InputContainer>
      </div>
      <ul className={styles.circleList}>
        {arrayOfCircles.map((char, idx) => {
          return (
            <div className={styles.block} key={idx}>
              <Circle
                state={char.state}
                letter={char.char}
                index={idx}
                head={idx === 0 && !char.adding && !char.deleting ? "head" : ""}
                tail={
                  idx === arrayOfCircles.length - 1 &&
                  !char.adding &&
                  !char.deleting
                    ? "tail"
                    : ""
                }
              />
              {idx !== arrayOfCircles.length - 1 && (
                <ArrowIcon
                  fill={
                    char.state === ElementStates.Changing && !char.noArrow
                      ? "#d252e1"
                      : "#0032FF"
                  }
                />
              )}
              {char.adding && (
                <Circle
                  extraClass={styles.upperCircle}
                  state={ElementStates.Changing}
                  letter={char.extraCircle?.char}
                  isSmall={true}
                />
              )}
              {char.deleting && (
                <Circle
                  extraClass={styles.lowerCircle}
                  state={ElementStates.Changing}
                  letter={char.extraCircle?.char}
                  isSmall={true}
                />
              )}
            </div>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
