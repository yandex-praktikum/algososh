import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { swap, updateCircleState } from "../../utils/utils";
export const StringComponent: React.FC = () => {
  const [circleStates, setCircleStates] = useState<Array<ElementStates>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [reverseStringValue, setReverseStringValue] = useState("");

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }
  const reverseString = (string: string, currentIndex: number = 0) => {
    let stringArray = string.split("");
    let end = stringArray.length;
    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      if (currentIndex < Math.floor(end / 2)) {
        setCircleStates((prevCircleStates) => {
          return updateCircleState(
            prevCircleStates,
            currentIndex,
            ElementStates.Changing,
            stringArray
          );
        });

        setTimeout(() => {
          swap(stringArray, currentIndex, end - 1 - currentIndex);
          setReverseStringValue(stringArray.join(""));
          setCircleStates((prevCircleStates) => {
            return updateCircleState(
              prevCircleStates,
              currentIndex,
              ElementStates.Modified,
              stringArray
            );
          });

          reverseString(stringArray.join(""), currentIndex + 1);
        }, DELAY_IN_MS);
      } else {
        clearTimeout(timeoutId);
        setIsLoading(false);
        setCircleStates((prevCircleStates) => {
          return updateCircleState(
            prevCircleStates,
            currentIndex,
            ElementStates.Modified
          );
        });
      }
    }, DELAY_IN_MS);

    return string;
  };

  function handleButtonClick(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReverseStringValue(inputValue);
    setCircleStates([ElementStates.Default]);
    setTimeout(() => {
      const reversedString = reverseString(inputValue);
      setReverseStringValue(reversedString);
    }, DELAY_IN_MS);
  }

  return (
    <SolutionLayout title="Строка">
      <div className="formContent">
        <form onSubmit={handleButtonClick} className="formContainer">
          <Input
            onChange={handleInputChange}
            value={inputValue}
            maxLength={11}
            disabled={isLoading}
            isLimitText={true}
          />
          <Button
            disabled={!inputValue}
            type="submit"
            isLoader={isLoading}
            text="Развернуть"
          />
        </form>
        <div className="formContentContainer">
          {reverseStringValue.split("").map((text, index) => (
            <Circle
              state={circleStates[index]}
              letter={text}
              key={index}
            ></Circle>
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
