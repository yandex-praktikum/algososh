import { FC, useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { TString } from "../../types/string";
import { onSubmit } from "../utils/utils";
import { revDirection } from "../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: FC = () => {
  const [stringArr, setStringArr] = useState<TString[]>([]);
  const [inputString, setInputString] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputString(evt.target.value);
  };

  const onClick = () => {
    let firstIndex = 0;
    let secondIndex = inputString.length - 1;
    let time = DELAY_IN_MS;

    const inputArr = Array.from(inputString);
    const outputArr: TString[] = [];

    setInputString("");
    setIsLoading(true);

    inputArr.forEach((item) => {
      const node = {
        letter: item,
        state: ElementStates.Default,
      };
      outputArr.push(node);
    });

    setStringArr([...outputArr]);

    setTimeout(() => {
      while (firstIndex <= secondIndex) {
        reverseString(outputArr, firstIndex, secondIndex, time);
        firstIndex++;
        secondIndex--;
        time += 1000;
      }
    }, 1000);

    const reverseString = (
      arr: TString[],
      firstIndex: number,
      secondIndex: number,
      time: number
    ) => {
      setTimeout(() => {
        arr[firstIndex].state = ElementStates.Changing;
        arr[secondIndex].state = ElementStates.Changing;
        setStringArr([...arr]);
      }, time);
      setTimeout(() => {
        revDirection(arr, firstIndex, secondIndex);
        arr[firstIndex].state = ElementStates.Modified;
        arr[secondIndex].state = ElementStates.Modified;
        setStringArr([...arr]);
      }, time + 1000);
      if (firstIndex + 1 === secondIndex || firstIndex === secondIndex) {
        setTimeout(() => {
          setIsLoading(false);
        }, time + 1000);
      }
    };
  };

  
  return (
    <SolutionLayout title="Строка">
      <form className={styles.input} onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          maxLength={11}
          max={11}
          min={1}
          placeholder="Введите текст"
          isLimitText={true}
          id="string"
          value={inputString}
        />
        <Button
          onClick={onClick}
          text={"Развернуть"}
          disabled={inputString.length > 0 ? false : true}
          isLoader={isLoading}
        />
      </form>
      <div className={styles.letters}>
        {stringArr.map((item, index) => {
          return (
            <Circle state={item?.state} letter={item?.letter} key={index} />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
