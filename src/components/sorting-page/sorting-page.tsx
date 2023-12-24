import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from "./sorting-page.module.css"
import { Column } from "../ui/column/column"
import { DELAY_IN_MS } from "../../constants/delays";
//import { } from "./utils";
import { Direction } from "../../types/direction";

export const SortingPage: React.FC = () => {

  const [loader, setLoader] = useState<boolean>(false);

  function handleChange(e: React.FormEvent) {
    e.preventDefault();
    console.log('handleChange e: ', e.target)
  };

  const doProcess = (direction: Direction) => {
    console.log('doProcess: direction: ', direction);
  }

  const createNewArray = () => {
    console.log('createNewArray called')
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <section className={styles.main}>
        <form className={styles.form}>
          <RadioInput
            label="Выбор"
            name="chooseYourDestiny"
            value="selection"
            checked
            disabled={false}
            onClick={(e) => handleChange(e)}
          />
          <RadioInput
            name="chooseYourDestiny"
            label="Пузырек"
            value="bubble"
            extraClass="ml-20"
            disabled={false}
            onClick={(e) => handleChange(e)}
          />
          <Button
            extraClass={`${styles.button} ${styles.ml_50}`}
            text="По возрастанию"            
            sorting={Direction.Ascending}
            isLoader={loader}
            disabled={false}
            onClick={() => doProcess(Direction.Ascending)}
          />
          <Button
            extraClass={styles.button}
            text="По убыванию"            
            sorting={Direction.Descending}
            isLoader={loader}
            disabled={false}
            onClick={() => doProcess(Direction.Descending)}
          />
          <Button
            extraClass={`${styles.button} ${styles.ml_80}`}
            text="Новый массив"
            type='submit'
            isLoader={loader}
            disabled={false}
            onClick={() => createNewArray()}
          />
        </form>
        <ul className={styles.columnList}>
            <li>
              <Column
                index={20}
              />
            </li>
            <li>
              <Column
                index={50}
              />
            </li>
            <li>
              <Column
                index={90}
              />
            </li>

          {/* {strArray && strArray.map((item, index) => (
            <li key={index}>
              <Circle
                letter={item.value}
                state={item.state}
              />
            </li>
          ))
          } */}
        </ul>
      </section>
    </SolutionLayout>
  );
};
