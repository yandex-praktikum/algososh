import React, {useState} from "react";
import stakeStyle from "./stakeStyle.module.css";
import { ElementStates } from "../../types/element-states"
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import Stack from "./utils";

export const StackPage: React.FC = () => {
  const [stackArr, setStackArr] = useState<string[]>([]); // начальное состояние
  const [input, setInput] = useState<string>('');
  const [color, setColor] = useState<ElementStates>(ElementStates.Changing)

    const stack = React.useMemo(() => {
        return new Stack<string>()
    }, [])

    const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setInput(e.target.value);
    }

    //Добавление
    const handleAdd = async () => {
        stack.push(input)
        setInput("")
        setTimeout(() => {
            setColor(ElementStates.Changing)
            setStackArr([...stack.getElements()])
            setTimeout(() => {
                setColor(ElementStates.Default)
                setStackArr([...stack.getElements()])
            }, 500)
        }, 500)
    }

    //Удаление
    const handleDelete = async () => {
        setTimeout(() => {
            setColor(ElementStates.Changing)
            setStackArr([...stack.getElements()])
            setTimeout(() => {
                stack.pop()
                setColor(ElementStates.Default)
                setStackArr([...stack.getElements()])
            }, 500)
        }, 500)
    }

    //Очистка
    const handleClear = async () => {
        stack.clear()
        setStackArr([])
    }

  return (
    <SolutionLayout title="Стек">
      <div className={stakeStyle.container}>
        <div className={stakeStyle.form}>
          <Input
              onChange={handleChangeInput}
              isLimitText={true}
              maxLength={4}
              value={input}
          />
          <Button
              text='Добавить'
              disabled={!input.length}
              onClick={handleAdd}
               />
          <Button
              text='Удалить'
              disabled={!stackArr.length}
              onClick={handleDelete}
               />
        </div>
        <Button
            text='Очистить'
            disabled={!stackArr.length}
            onClick={handleClear}
             />
      </div>
      <div className={stakeStyle.circle}>
          {stack.getElements().map((item, index) => {
              return (
                  <Circle
                      letter={item}
                      key={index}
                      head={index === stackArr.length - 1 ? "top" : ""}
                      state={stackArr.length === index ? color : ElementStates.Changing &&
                      stackArr.length - 1 === index ? color : ElementStates.Default}
                      index={index}
                  />
              )
          })}
      </div>
    </SolutionLayout>
  );
};
