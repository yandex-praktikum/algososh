import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { stringCharsProps } from "../../types/types";
import { waitForMe } from "../../utils/utils";
import { InputContainer } from "../input-container/input-container";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {
  const maxNum = 6;

  const basicState: stringCharsProps[] = [];
  for (let i = 0; i <= maxNum; i++) {
    basicState.push({
      char: `${Math.floor(Math.random() * 100)}`,
      state: ElementStates.Default,
    });
  }

  const [value, setValue] = useState<string>("");
  const [idx, setIdx] = useState<number>();
  const [arrayOfCircles, setArrayCircles] =
    useState<stringCharsProps[]>(basicState);
  const [addingToHead, setAddingToHead] = useState(false);
  const [addingToTail, setAddingToTail] = useState(false);
  const [deletingFromHead, setDeletingFromHead] = useState(false);
  const [deletingFromTail, setDeletingFromTail] = useState(false);
  const [addingByIdx, setAddingByIdx] = useState(false);
  const [deletingByIdx, setDeletingByIdx] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [headIdx, setHeadIdx] = useState(0);
  const [tailIdx, setTailIdx] = useState(0);
  const [inProgress, setInProgress] = useState(false);

  const sortAndWait = async (arr: stringCharsProps[]) => {
    setArrayCircles([...arr]);
    await waitForMe(SHORT_DELAY_IN_MS);
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
    await sortAndWait([...copyArr]);
    // Убираем подсветку и добавляем новую голову
    copyArr[0] = {
      ...copyArr[0],
      adding: false,
      extraCircle: undefined,
    };
    copyArr.unshift({
      char: value,
      state: ElementStates.Modified,
    });
    await sortAndWait([...copyArr]);
    // Меняем стейт головы
    copyArr[0].state = ElementStates.Default;
    await sortAndWait([...copyArr]);
    setInProgress(false);
    setAddingToHead(false);
  };

  const deleteFromHead = async () => {
    const copyArr = [...arrayOfCircles];
    const deletingValue = copyArr[0].char;
    setInProgress(true);
    setDeletingFromHead(true);
    // Смещаем голову в нижний кружок
    copyArr[0] = {
      ...copyArr[0],
      char: "",
      deleting: true,
      extraCircle: {
        char: deletingValue ? deletingValue : "",
      },
    };
    await sortAndWait([...copyArr]);
    // Удаляем элемент и подсвечиваем новую голову
    copyArr.shift();
    copyArr[0].state = ElementStates.Modified;
    await sortAndWait([...copyArr]);
    // Убираем подсветку с новой головы
    copyArr[0].state = ElementStates.Default;
    await sortAndWait([...copyArr]);
    setInProgress(false);
    setDeletingFromHead(false);
  };

  const deleteFromTail = async () => {
    const copyArr = [...arrayOfCircles];
    const { length } = copyArr;
    const deletingValue = copyArr[length - 1].char;

    setInProgress(true);
    setDeletingFromTail(true);
    // Смещаем хвост в нижний кружок
    copyArr[length - 1] = {
      ...copyArr[length - 1],
      char: "",
      deleting: true,
      extraCircle: {
        char: deletingValue ? deletingValue : "",
      },
    };
    await sortAndWait([...copyArr]);
    // Удаляем элемент и подсвечиваем новый хвост
    copyArr.pop();
    copyArr[length - 2].state = ElementStates.Modified;
    await sortAndWait([...copyArr]);
    // Убираем подсветку с нового хвоста
    copyArr[length - 2].state = ElementStates.Default;
    await sortAndWait([...copyArr]);
    setInProgress(false);
    setDeletingFromTail(false);
  };

  const addToTail = async () => {
    const copyArr = [...arrayOfCircles];
    const { length } = copyArr;
    setInProgress(true);
    setAddingToTail(true);
    // Подсвечиваем хвост
    copyArr[length - 1] = {
      ...copyArr[length - 1],
      adding: true,
      extraCircle: {
        char: value,
      },
    };
    await sortAndWait([...copyArr]);
    // Убираем подсветку и добавляем новый хвост
    copyArr[length - 1] = {
      ...copyArr[length - 1],
      adding: false,
      extraCircle: undefined,
    };
    copyArr.push({
      char: value,
      state: ElementStates.Modified,
    });
    await sortAndWait([...copyArr]);
    // Меняем стейт головы
    copyArr[length].state = ElementStates.Default;
    await sortAndWait([...copyArr]);
    setInProgress(false);
    setAddingToTail(false);
  };

  const addByIdx = async () => {
    const copyArr = [...arrayOfCircles];
    setInProgress(true);
    setAddingByIdx(true);
    // Запускаем перебор по элементам массива
    for (let i = 0; i <= idx!; i++) {
      copyArr[i] = {
        ...copyArr[i],
        adding: true,
        extraCircle: {
          char: value,
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
      char: value,
      state: ElementStates.Modified,
    });
    await sortAndWait([...copyArr]);
    // Убираем подсветку
    copyArr.forEach((el) => (el.state = ElementStates.Default));
    await sortAndWait([...copyArr]);
    setInProgress(false);
    setAddingByIdx(false);
  };

  const deleteByIdx = async () => {
    const copyArr = [...arrayOfCircles];
    const deletingValue = copyArr[idx!].char;
    setInProgress(true);
    setDeletingByIdx(true);
    // Запускаем перебор по элементам массива
    for (let i = 0; i <= idx!; i++) {
      copyArr[i].state = ElementStates.Changing;
      if (i === idx) copyArr[i].deleting = true;
      await sortAndWait([...copyArr]);
    }
    // Показываем удаляемый элемент
    copyArr[idx!] = {
      ...copyArr[idx!],
      char: "",
      deleting: true,
      extraCircle: {
        char: deletingValue ? deletingValue : "",
      },
    };
    await sortAndWait([...copyArr]);
    // Удаляем элемент
    copyArr.splice(idx!, 1);
    // Убираем подсветку
    copyArr.forEach((el) => (el.state = ElementStates.Default));
    await sortAndWait([...copyArr]);
    setInProgress(false);
    setDeletingByIdx(false);
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
            disabled={inProgress || deleting || tailIdx > 6}
            isLoader={addingToHead}
            text="Добавить в head"
            type="button"
            onClick={() => addToHead()}
          />
          <Button
            extraClass={styles.button}
            isLoader={addingToTail}
            disabled={inProgress}
            text="Добавить в tail"
            type="button"
            onClick={() => addToTail()}
          />
          <Button
            extraClass={styles.button}
            disabled={inProgress}
            isLoader={deletingFromHead}
            text="Удалить из head"
            type="button"
            onClick={() => deleteFromHead()}
          />
          <Button
            extraClass={styles.button}
            disabled={inProgress}
            isLoader={deletingFromTail}
            text="Удалить из tail"
            type="button"
            onClick={() => deleteFromTail()}
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
            style={{ minWidth: "362px" }}
            extraClass={styles.button}
            disabled={!value || inProgress}
            isLoader={addingByIdx}
            text="Добавить по индексу"
            type="button"
            onClick={() => addByIdx()}
          />
          <Button
            style={{ minWidth: "362px" }}
            extraClass={styles.button}
            isLoader={deletingByIdx}
            disabled={inProgress}
            text="Удалить по индексу"
            type="button"
            onClick={() => deleteByIdx()}
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
                    char.state === ElementStates.Changing && !char.deleting
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
