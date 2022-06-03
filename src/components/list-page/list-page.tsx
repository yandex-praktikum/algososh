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
    setArrayCircles(basicState);
    console.log(newLinkedList)
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
    // Подсвечиваем голову
    copyArr[0] = {
      ...copyArr[0],
      adding: true,
      extraCircle: {
        char: value,
      },
    };
    // Добавляем в голову списка новый элемент
    console.log(linkedList)
    linkedList?.insertAt(value, 0);
    await sortAndWait([...copyArr]);
    // Извлекаем для рендера из списка новый элемент
    const headValue = linkedList?.getNodeByIndex(0);
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

  const addToTail = async () => {};

  const removeFromHead = async () => {};

  const removeFromTail = async () => {};

  const addByIdx = async () => {};

  const removeByIdx = async () => {};

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
              idx > arrayOfCircles.length - 2 ||
              arrayOfCircles.length > maxNum
            }
            isLoader={addingByIdx}
            text="Добавить по индексу"
            type="button"
            onClick={() => addByIdx()}
          />
          <Button
            extraClass={styles.bigButton}
            isLoader={deletingByIdx}
            disabled={!idx || inProgress || idx > arrayOfCircles.length - 2}
            text="Удалить по индексу"
            type="button"
            onClick={() => removeByIdx()}
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
