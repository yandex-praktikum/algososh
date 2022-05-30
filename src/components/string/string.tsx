import React, { useRef, useState } from "react";
import { swapElements } from "../../algorythms-toolkit/toolkit";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { stringCharsProps } from "../../types/types";
import { delay } from "../../utils/utils";
import { InputContainer } from "../input-container/input-container";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { swapWithAnimation } from "./utils";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [arrayOfLetters, setArrayOfLetters] = useState<stringCharsProps[]>([]);
  const [inProgress, setInProgress] = useState(false);

  return (
    <SolutionLayout title="Строка">
      <InputContainer>
        <Input
          value={inputValue}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setInputValue(e.currentTarget.value)
          }
          isLimitText={true}
          maxLength={11}
        />
        <Button
          disabled={!inputValue}
          isLoader={inProgress}
          text="Развернуть"
          type="submit"
          onClick={() =>
            swapWithAnimation(
              inputValue,
              setInputValue,
              setArrayOfLetters,
              setInProgress,
              arrayOfLetters
            )
          }
        />
      </InputContainer>
      <ul className={styles.circleList}>
        {arrayOfLetters.map((char, idx) => {
          return <Circle state={char.state} letter={char.char} key={idx} />;
        })}
      </ul>
    </SolutionLayout>
  );
};
