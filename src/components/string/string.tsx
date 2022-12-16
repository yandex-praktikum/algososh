import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { StringReverse } from "./StringReverse";
import { ElementStates } from "../../types/element-states";

const stringReverse = new StringReverse();

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [circleLetters, setCircleLetter] = useState<
    { letter: string; state: ElementStates }[]
  >([]);
  const [loader, setLoader] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    stringReverse.setActualArr(inputValue.split(""));
    setCircleLetter([...stringReverse.lettersInArray]);
    if (stringReverse.lettersInArray.length === 1) {
      return;
    }

    setLoader(true);

    let counter = 0;
    const interval = setInterval(() => {
      stringReverse.changeLetters(counter);
      setCircleLetter([...stringReverse.lettersInArray]);

      counter++;

      if (stringReverse.stringIsReversed(counter)) {
        clearInterval(interval);
        setTimeout(() => {
          stringReverse.setAllCirlesModified();
          setCircleLetter([...stringReverse.lettersInArray]);
          setLoader(false);
        }, 1000);
      }
    }, 1000);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.mainContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            maxLength={11}
            type="text"
            isLimitText={true}
            onInput={handleInput}
            value={inputValue}
          />
          <Button
            text="Развернуть"
            type="submit"
            isLoader={loader}
            disabled={!inputValue}
          ></Button>
        </form>
        <div className={styles.circlesWrapper}>
          {circleLetters.map((letter, i) => {
            return (
              <Circle
                letter={letter.letter}
                key={i}
                state={letter.state}
              ></Circle>
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
