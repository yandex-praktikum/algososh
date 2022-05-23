import React from "react";
import { InputContainer } from "../input-container/input-container";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";

export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
      <InputContainer>
        <div className={styles.radioContainer}>
          <RadioInput label="Выбор" />
          <RadioInput label="Пузырёк" />
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            sorting={Direction.Ascending}
            disabled={false}
            isLoader={false}
            text="По возрастанию"
            type="submit"
            onClick={() => null}
          />
          <Button
            sorting={Direction.Descending}
            disabled={false}
            isLoader={false}
            text="По убыванию"
            type="submit"
            onClick={() => null}
          />
        </div>
        <Button
          disabled={false}
          isLoader={false}
          text="Новый массив"
          type="submit"
          onClick={() => null}
        />
      </InputContainer>
    </SolutionLayout>
  );
};
