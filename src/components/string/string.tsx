import React, {useState} from "react";
import stringStyle from "./stringStyle.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const StringComponent: React.FC = () => {
    const [stringArr, setStringArr] = useState<Array<string>>([])
    const [value, setValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentReverseStep, setCurrentReverseStep] = useState(0);

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    //Функция переворота
    const reverseString = async (value: string) => {
        const arr = value.split('');
        setCurrentReverseStep(0);
        setIsLoading(true);
        setStringArr([...arr]);
        await delay(1000);
        const string = [...arr];
        if (arr.length <= 1) {
            return [[...arr]];
        }
        const center = Math.ceil((arr.length - 1) / 2);
        for (let i = 0; i < center; i++) {
            const j = arr.length - 1 - i;
            //меняем местами swap
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            setCurrentReverseStep(i => i + 1);
            string.push(...arr);
            await delay(1000);
            setIsLoading(false);
        }
        return string;
    }

    // Функция отвечает за цвет при анимировании перехода
    const getElement = (index: number, maxIndex: number, currentStep: number) => {
        if (index < currentStep || index > maxIndex - currentStep) {
            return ElementStates.Modified;
        }
        if (index === currentStep || index === maxIndex - currentStep) {
            return ElementStates.Changing;
        }
        return ElementStates.Default;
    };

    const handleReverseString = (evt: React.FormEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        reverseString(value);
        setValue('');
    }

    return (
      <SolutionLayout title="Строка">
          <div className={stringStyle.container}>
          <form className={stringStyle.form}>
              <Input
                  maxLength={11}
                  extraClass={stringStyle.input}
                  isLimitText={true}
                  value={value}
                  onChange={handleChangeInput}
              />
              <Button
                  text="Развернуть"
                  extraClass={stringStyle.button}
                  disabled={!value.length}
                  isLoader={isLoading}
                  onClick={handleReverseString}
              />
          </form>
          <ul className={stringStyle.circle}>
              {stringArr.map((item, index) => {
                  return <Circle
                      key={index}
                      index={index + 1}
                      letter={item}
                      state={getElement(index, currentReverseStep, stringArr.length + 1)}
                  />
              })}
          </ul>
      </div>
      </SolutionLayout>
  );
};
