import React, { ChangeEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TStack } from "../../types/types";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./class";
import style from './stack-page.module.css';

export const StackPage: React.FC = () => {

  const stack = new Stack<string>();

  const [arr, setArr] = useState<Array<TStack>>([]);
  const [valueInput, setValueInput] = useState<string>('');
  
  const [disabledPush, setDisabledPush] = useState<boolean>(false);
  const [disabledPop, setDisabledPop] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  }

  const getPush = async () => {
    setValueInput('');
    setDisabledPush(true);

    const arrTemp = [...arr];
    stack.push(valueInput);

    arrTemp.push({
      item: stack.peak(),
      state: ElementStates.Default,
    });
    
    arrTemp[arrTemp.length-1].state = ElementStates.Changing;
    setArr([...arrTemp]);

    await delay(SHORT_DELAY_IN_MS);
    arrTemp[arrTemp.length - 1].state = ElementStates.Default;
   
    setDisabledPush(false);
  };

  const getPop = async () => {
    setDisabledPop(true);
    const arrTemp = [...arr];

    if (stack.getSize() > 1) {
      stack.pop();
      arrTemp[arrTemp.length - 1].state = ElementStates.Changing;
      await delay(SHORT_DELAY_IN_MS);

      arrTemp.pop();
      setArr([...arrTemp]);
    } else {
      arrTemp[arrTemp.length - 1].state = ElementStates.Changing;
      await delay(SHORT_DELAY_IN_MS);
      
      arrTemp.pop();
      getClear();
      setArr([...arrTemp]);
    }

    if(arrTemp.length > 0) {
      arrTemp[arrTemp.length - 1].state = ElementStates.Default;
    }

    setDisabledPop(false);
  };

  const getClear = async () => {
    stack.clear();
    setArr([]);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={style.content}>
        <Input value={valueInput} isLimitText = {true} maxLength={4} onChange={handleChange} />
        <Button text={'Добавить'} extraClass="mr-4 ml-4" disabled={valueInput === ''} isLoader={disabledPush} onClick={getPush} />
        <Button text={'Удалить'} extraClass="mr-40" disabled={ !arr.length || disabledPop || disabledPush} isLoader={disabledPop} onClick={getPop} />
        <Button text={'Очистить'} disabled={!arr.length || disabledPop || disabledPush } onClick={getClear} />
      </div>
      <ul className={style.list}>
        {arr?.map((item, index) => {
          return (
            <li key={index}>
              <Circle
              letter={`${item.item}`}
              state={item.state}
              head={index === arr.length - 1 ? "top" : ""}
              index={index}
              extraClass={'mt-15'}
            />
          </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
