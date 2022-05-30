import React, { useState } from "react";
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
import {
  addByIdx,
  addToHead,
  addToTail,
  deleteByIdx,
  deleteFromHead,
  deleteFromTail,
} from "./utils";

export const ListPage: React.FC = () => {
  const maxNum = 12;
  const minNum = 4;

  const basicState: stringCharsProps[] = Array.from({ length: minNum }, () => ({
    char: `${getNumber()}`,
    state: ElementStates.Default,
  }));

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
  const [inProgress, setInProgress] = useState(false);



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
            onClick={() =>
              addToHead(
                setInProgress,
                setAddingToHead,
                setValue,
                value,
                arrayOfCircles,
                setArrayCircles
              )
            }
          />
          <Button
            extraClass={styles.button}
            isLoader={addingToTail}
            disabled={inProgress || !value || arrayOfCircles.length > maxNum}
            text="Добавить в tail"
            type="button"
            onClick={() =>
              addToTail(
                setInProgress,
                setAddingToTail,
                setValue,
                value,
                arrayOfCircles,
                setArrayCircles
              )
            }
          />
          <Button
            extraClass={styles.button}
            disabled={inProgress || arrayOfCircles.length <= 1}
            isLoader={deletingFromHead}
            text="Удалить из head"
            type="button"
            onClick={() =>
              deleteFromHead(
                setInProgress,
                setDeletingFromHead,
                arrayOfCircles,
                setArrayCircles
              )
            }
          />
          <Button
            extraClass={styles.button}
            disabled={inProgress || arrayOfCircles.length <= 1}
            isLoader={deletingFromTail}
            text="Удалить из tail"
            type="button"
            onClick={() =>
              deleteFromTail(
                setInProgress,
                setDeletingFromTail,
                arrayOfCircles,
                setArrayCircles
              )
            }
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
            onClick={() =>
              addByIdx(
                setInProgress,
                setAddingByIdx,
                setValue,
                setIdx,
                idx,
                value,
                arrayOfCircles,
                setArrayCircles
              )
            }
          />
          <Button
            style={{ minWidth: "362px" }}
            extraClass={styles.button}
            isLoader={deletingByIdx}
            disabled={!idx || inProgress || idx > arrayOfCircles.length - 2}
            text="Удалить по индексу"
            type="button"
            onClick={() =>
              deleteByIdx(
                setInProgress,
                setDeletingByIdx,
                setIdx,
                idx,
                arrayOfCircles,
                setArrayCircles
              )
            }
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
