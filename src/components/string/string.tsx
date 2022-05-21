import React, { useRef, useState } from "react";
import { reverseString, swapChars } from "../../algorythms-toolkit/toolkit";
import { waitForMe } from "../../utils/utils";
import { InputContainer } from "../input-container/input-container";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [arrayOfLetters, setArrayOfLetters] = useState<string[]>([]);

  const handleAnimation = async (string: string) => {
    const arrayOfChars = string.split("");
    setArrayOfLetters(arrayOfChars);
    await waitForMe();
    let startIdx = 0;
    let endIdx = arrayOfChars.length - 1;
    while (endIdx > startIdx) {
      await waitForMe(300);
      const temp = arrayOfChars[startIdx];
      arrayOfChars[startIdx] = arrayOfChars[endIdx];
      arrayOfChars[endIdx] = temp;
      console.log(arrayOfChars);
      setArrayOfLetters(arrayOfChars);
      startIdx++;
      endIdx--;
    }
  };

  return (
    <SolutionLayout title="Строка">
      <InputContainer>
        <Input
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          isLimitText={true}
          maxLength={11}
        />
        <Button
          text="Развернуть"
          type="submit"
          onClick={() => handleAnimation(inputValue)}
        />
      </InputContainer>
      <ul className={styles.circleList}>
        {arrayOfLetters.map((char, idx) => {
          return <Circle letter={char} key={idx} />;
        })}
      </ul>
    </SolutionLayout>
  );
};
