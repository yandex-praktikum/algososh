import React, {useState} from "react";
import stringStyle from "./stringStyle.module.css";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {delay} from '../../utils/constDelay';

export type TStringArray = {
    value: string;
    color: ElementStates;
};

export const StringComponent: React.FC = () => {
    const [stringArr, setStringArr] = useState<Array<TStringArray>>([])
    const [input, setInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    //Функция swap меняет местами
    const swap = (arr: TStringArray[], i: number, j: number): void => {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    };

    //Функция переворота
    const reverseString = async (arr: TStringArray[]) => {
        setIsLoading(true);
        for (let i = 0; i < Math.ceil(arr.length / 2); i++) {
            const j = arr.length - 1 - i;

            if (arr.length === 1) {
                arr[i].color = ElementStates.Modified;
            } else if (i < j) {

                arr[i].color = ElementStates.Changing;
                arr[j].color = ElementStates.Changing;
                //Прорисовка
                setStringArr([...arr]);
                await delay(1000);
            }
            swap(arr, i, j);
            arr[i].color = ElementStates.Modified;
            arr[j].color = ElementStates.Modified;
            //Прорисовка
            setStringArr([...arr]);
        }
        setIsLoading(false);
    }

    const handleReverseString = () => {
        const arr = input
            .split('').map((value) => ({value, color: ElementStates.Default}));
        reverseString(arr);
    };

    return (
      <SolutionLayout title="Строка">
          <div className={stringStyle.container}>
          <form className={stringStyle.form}>
              <Input
                  maxLength={11}
                  extraClass={stringStyle.input}
                  isLimitText={true}
                  value={input}
                  onChange={handleChangeInput}
              />
              <Button
                  text="Развернуть"
                  extraClass={stringStyle.button}
                  disabled={!input}
                  isLoader={isLoading}
                  onClick={handleReverseString}
              />
          </form>
          <ul className={stringStyle.circle}>
              {stringArr.map((item, index) => {
                  return <Circle
                      key={index} letter={item.value} state={item.color}
                  />
              })}
          </ul>
      </div>
      </SolutionLayout>
  );
};
