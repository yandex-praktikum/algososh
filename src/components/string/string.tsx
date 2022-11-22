import React, { SyntheticEvent, useState } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TElementState } from "../../types/types";
import { delay, swapString } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./string.module.css";

export const StringComponent: React.FC = () => {
  const [valueInput, setValueInput] = useState<string>('');
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [valueString, setValueString] = useState<Array<TElementState>>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value);
  }

  const handleClick = async (event: SyntheticEvent) => {
    event.preventDefault();
    setIsLoad(true);
    await reversString(valueInput);
    setIsLoad(false);
    setValueInput('');
  }

  const reversString = async ( str: string) => {
    const arrString: Array<TElementState> = [];
    str.split('').forEach((item) => {
      arrString.push({item: item, state: ElementStates.Default})
    })
    setValueString(arrString);
    let start = 0;
    let end = arrString.length - 1;
    while (start < end) {
      if(end < 3) {
        arrString[start].state = ElementStates.Changing
        arrString[end].state = ElementStates.Changing
      }
      await delay(DELAY_IN_MS);
      swapString(arrString, start, end);
      arrString[start].state = ElementStates.Modified
      arrString[end].state = ElementStates.Modified
      start++;
      end--;
      arrString[start].state = ElementStates.Changing
      arrString[end].state = ElementStates.Changing
      setValueString([...arrString])
    }
    arrString[start].state = ElementStates.Modified
    arrString[end].state = ElementStates.Modified
    setValueString([...arrString])
  }

  return (
    <SolutionLayout title="Строка">
      <div className={style.content}>
        <Input  value={valueInput} isLimitText = {true} maxLength={11} extraClass={'mr-4'} onChange={handleChange}/>
        <Button  text={'Развернуть'} isLoader={isLoad} disabled={valueInput === ''} onClick={handleClick} />
      </div>
      <ul className={style.list}>
       {valueString?.map((item, index) => (
          <li key = {index}>
            <Circle
              letter={item.item + ''}
              state={item.state}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
