import React, { useState } from "react";
import { ElementStates } from "../../types/element-states";
import { stringCharsProps } from "../../types/types";
import { InputContainer } from "../input-container/input-container";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";

export const ListPage: React.FC = () => {
  const maxNum = 6;

  const basicState: stringCharsProps[] = [];
  for (let i = 0; i <= maxNum; i++) {
    basicState.push({
      char: "",
      state: ElementStates.Default,
    });
  }

  const [value, setValue] = useState<string>("");
  const [idx, setIdx] = useState<number>();
  const [arrayOfLetters, setArrayOfLetters] =
    useState<stringCharsProps[]>(basicState);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [headIdx, setHeadIdx] = useState(0);
  const [tailIdx, setTailIdx] = useState(0);

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
            disabled={!value || deleting || tailIdx > 6}
            isLoader={adding}
            text="Добавить в head"
            type="button"
            onClick={() => null}
          />
          <Button
            extraClass={styles.button}
            isLoader={deleting}
            disabled={adding || tailIdx === 0}
            text="Добавить в tail"
            type="button"
            onClick={() => null}
          />
          <Button
            extraClass={styles.button}
            disabled={adding || deleting || tailIdx === 0}
            text="Удалить из head"
            type="button"
            onClick={() => null}
          />
          <Button
            extraClass={styles.button}
            disabled={adding || deleting || tailIdx === 0}
            text="Удалить из tail"
            type="button"
            onClick={() => null}
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
            disabled={!value || deleting || tailIdx > maxNum}
            isLoader={adding}
            text="Добавить в head"
            type="button"
            onClick={() => null}
          />
          <Button
            style={{ minWidth: "362px" }}
            extraClass={styles.button}
            isLoader={deleting}
            disabled={adding || tailIdx === 0}
            text="Добавить в tail"
            type="button"
            onClick={() => null}
          />
        </InputContainer>
      </div>
    </SolutionLayout>
  );
};
