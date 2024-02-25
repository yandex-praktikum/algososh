import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
export const StringComponent: React.FC = () => {
  const [circleState, setCircleState] = useState(ElementStates.Default);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [reveseValue, setReverseValue] = useState("");

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function reverseString(string: string) {
    let stringArray = string.split("");
    let currentIndex = 0;
///dsadsad
    const intervalId = setInterval(() => {
      if (currentIndex < Math.floor(stringArray.length / 2)) {
        let temp = stringArray[currentIndex];
        stringArray[currentIndex] =
          stringArray[stringArray.length - 1 - currentIndex];
        stringArray[stringArray.length - 1 - currentIndex] = temp;
       
      
        if (stringArray[currentIndex] !== temp[currentIndex]) {
          setCircleState(ElementStates.Changing);
        }

        setReverseValue(stringArray.join(""));

        currentIndex++;
      } else {
        clearInterval(intervalId);
        setCircleState(ElementStates.Modified);
      }
    }, DELAY_IN_MS);

    return string;
  }

  function handleButtonClick() {
    setCircleState(ElementStates.Default);
    setReverseValue(inputValue);
    setIsLoading(true);
    setTimeout(() => {
      const reversedString = reverseString(inputValue);
      setReverseValue(reversedString);
      setIsLoading(false);
    }, DELAY_IN_MS);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.content}>
        <div className={styles.inputContainer}>
          <Input
            onChange={handleInputChange}
            value={inputValue}
            maxLength={11}
          />
          <Button
            isLoader={isLoading}
            onClick={handleButtonClick}
            text="Развернуть"
          />
        </div>
        <div className={styles.contentContainer}>
          {reveseValue.split("").map((text, index) => (
            <Circle state={circleState} letter={text} key={index}></Circle>
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
