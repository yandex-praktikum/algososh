import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from './stack'
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

const stack = new Stack<string>();

type propsType = {
  stack: string[]
}

type stateType = {
  input: boolean,
  addBtn: boolean,
  removeBtn: boolean,
  clearBtn: boolean,
}

export const StackPage: React.FC = () => {


  const [input, setValue] = useState('')
  const [stackContent, setStackContent] = useState([] as string[]);
  const [current, setCurrent] = useState<number>(0);
  const [disable, setDisable] = useState<stateType>({
    input: false,
    addBtn: false,
    removeBtn: false,
    clearBtn: false,
  });

  const onInputChange = (e: FormEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;
    setValue(value.trim());
  }
 
  function clear() {  
    setDisable({ ...disable, clearBtn: true, input: true });

    setValue('');
    stack.clear()
    setStackContent(stack.printStack());
    setCurrent(0);

    setDisable({ ...disable, clearBtn: false, input: false });
  }


  async function pop() {
    setDisable({ ...disable, removeBtn: true, input: true });

    setCurrent(stack.getSize() - 1);
    await timeOut();
    stack.pop();
    setStackContent([...stack.printStack()]);

    setDisable({ ...disable, removeBtn: false, input: false });
  }

  async function push(item: string) {
    if (!input) return

    setDisable({ ...disable, addBtn: true, input: true });

    stack.push(item);
    setStackContent([...stack.printStack()]);
    setValue('');
    await timeOut();
    setCurrent(current + 1);

    setDisable({ ...disable, addBtn: false, input: false });
    
  }


  const timeOut = () => new Promise<void>(
    resolve => setTimeout(resolve, 300)
);

  const peak = () => {
    return stack.peak();
  }

  
  function NewStack({ stack }: propsType): any{
    return stack.map((item, index: number) => {
          return (
            <Circle
              key={index}
              letter={item}
              index={index}
              head={peak() === index ? "top" : ''}
              state={index === current ? ElementStates.Changing : ElementStates.Default}
            />)
        })
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.context}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.conditions}>
            <Input name={'stack'} type="text" maxLength={4} onChange={onInputChange}
              value={input} extraClass="mr-6" disabled={disable.input} />
            <Button text="Добавить"
              onClick={() => push(input)}
              disabled={!input || disable.input }
              isLoader={disable.addBtn}></Button>
            <Button text="Удалить"  
              disabled={stack.getSize() < 1 || disable.input}
              isLoader={disable.removeBtn} onClick={pop}></Button>
          </div>
          <Button 
            text="Очистить" 
            type="button"
            onClick={clear} 
            disabled={stack.getSize() < 1 || disable.input}
            isLoader={disable.clearBtn}/>

        </form>
        <p className={styles.limit}> Максимум - 4 символа</p>
      </div>
      <ul className={styles.stack}>
        <NewStack stack={stackContent} /> 
      </ul >
    </SolutionLayout>
  );
};
