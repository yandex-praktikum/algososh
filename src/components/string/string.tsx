import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import {
  getStringColumnState,
  reverseStringBySteps,
} from "../../utils/reverse-string";
export const StringComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [steps, setSteps] = useState<string[][] | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function reverseStringAlgorithm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const newSteps = reverseStringBySteps(inputValue);
    setSteps(newSteps);
    setCurrentStepIndex(0);
    if (!newSteps.length) {
      return;
    }
    let index = 0;
    const intervalId = setInterval(() => {
      if (index >= newSteps.length - 1) {
        clearInterval(intervalId);
        setIsLoading(false);
        return;
      }

      setCurrentStepIndex(++index);
    }, 1000);
  }

  return (
    <SolutionLayout title="Строка">
      <div className="formContent">
        <form onSubmit={reverseStringAlgorithm} className="formContainer">
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
          {steps?.[currentStepIndex].map((text, index) => (
            <Circle
              state={getStringColumnState({ index, steps, currentStepIndex })}
              letter={text}
              key={index}
            ></Circle>
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
