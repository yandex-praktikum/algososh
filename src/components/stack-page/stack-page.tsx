import React, { useEffect, useState } from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./utils";


export const StackPage: React.FC = () => {
  const [string, setString] = useState<string>('');
  const [stack, setStack] = useState<string[]>([]);
  const [flag, setFlag] = useState<boolean>(true);
  const [colorState, setColorState] = useState<boolean>(false);
  const st = Stack(stack);
  useEffect(() => {
    if (stack.length > 0) {
      setFlag(false)
    } else {
      setFlag(true)
    }
    const interval = setInterval(() => {
      setColorState(false);
    }, 1000);
    return () => { 
      clearInterval(interval); }
  }, [stack.length, colorState])

  const handlePush = (e: any) => {
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    const string: any = formJson.MyInput;
    st.push(string)
    setString('')
    setStack(st.elements())
    setColorState(true)
  }

  const handlePop = () => {
    
    setColorState(true)
    //  setStack(st.elements()) почему так не рабтает?
 //   setStack([...stack])  // а так работает?
    setTimeout(() => {
      st.pop()
      setStack([...stack])
    }, 1000);
  }

  const handleClear = () => {
    st.clear()
    setStack(st.elements())
  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.container} onSubmit={handlePush} >
        <Input maxLength={4} isLimitText={true} name={"MyInput"} type={'text'} value={string} onChange={(evt: any) => {
          setString(evt.target.value)
        }} />
        <Button text={"Добавить"} type={"submit"} disabled={!string} />
        <Button text={"Удалить"} type={"button"} disabled={flag ? true : false} onClick={() => handlePop()} />
        <Button text={"Очистить"} type={"button"} disabled={flag ? true : false} onClick={() => handleClear()} />
      </form>
      <div className={styles.letterContainer}>
        <CircleComponent array={[...stack]} colorState={colorState} />
      </div>
    </SolutionLayout>
  )
};

type CircleComponentProps = {
  array: string[];
  colorState: boolean;
}

const CircleComponent = ({ array, colorState }: CircleComponentProps) => {
  const [flag, setFlag] = useState<boolean>(false);
  useEffect(() => {
    setFlag(colorState)
  }, [colorState])
  return (
    <>
      {array && array.map((item, index) => {
        return <Circle letter={item.toString()} head={index === array.length - 1 ? "top" : null} tail={(index).toString()} key={index}
          state={flag && index === array.length - 1 ? ElementStates.Changing : ElementStates.Default} />
      })}
    </>

  )
}
