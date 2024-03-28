import React, { useState, useEffect } from "react";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./utils";

export const QueuePage: React.FC = () => {
  const [string, setString] = useState<string>('');
  const [flag, setFlag] = useState(true);
  const [colorState, setColorState] = useState<number>(-1);
  const [queue, setQueue] = useState<string[]>(['', '', '', '', '', '', '',]);
  const [head, setHead] = useState<number>(-1);
  const [tail, setTail] = useState(-1);
  const qu = new Queue(queue);
  useEffect(() => {
    setFlag(true)
    queue.forEach((item) => {
      if (item !== '') {
        setFlag(false)
      }
    })
    const interval = setInterval(() => {
      setColorState(-1);
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [queue, colorState])

  const handlePush = (e: any) => {
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    const string: any = formJson.MyInput
    setString('')
    setColorState(tail + 1)
    setTimeout(() => {
      qu.enqueue(string, tail + 1)
      qu.head()
      qu.tail()
      setTail(qu.tail())
      setHead(qu.head())
      setQueue([...queue])
    }, 1000)
  }

  const handlePop = () => {
    setColorState(head)
    setTimeout(() => {
      qu.dequeue()
      qu.head()
      qu.tail()
      setTail(qu.tail())
      setHead(qu.head())
      setQueue([...queue])
    }, 1000);
  }

  const handleClear = () => {
    qu.clear()
    setQueue(['', '', '', '', '', '', '',])
    setTail(-1)
    setHead(-1)
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.container} onSubmit={handlePush} >
        <Input maxLength={4} isLimitText={true} name={"MyInput"} type={'text'} value={string} onChange={(evt: any) => {
          setString(evt.target.value)
        }} />
        <Button text={"Добавить"} type={"submit"} disabled={!string} />
        <Button text={"Удалить"} type={"button"} disabled={flag ? true : false} onClick={() => handlePop()} />
        <Button text={"Очистить"} type={"button"} disabled={flag ? true : false} onClick={() => handleClear()} />
      </form>
      <div className={styles.letterContainer}>
        <CircleComponent array={[...queue]} colorState={colorState} head={head} tail={tail} />
      </div>
    </SolutionLayout>
  );
};

type CircleComponentProps = {
  array: string[];
  colorState: number;
  head: number;
  tail: number | undefined;
}

const CircleComponent = ({ array, colorState, head, tail }: CircleComponentProps) => {
  const [flag, setFlag] = useState<number>(0);
  useEffect(() => {
    setFlag(colorState)
  }, [colorState])
  return (
    <>
      {array && array.map((item, index) => {
        return <Circle letter={item.toString()} head={index === head ? "top" : null} tail={index === tail ? "tail" : null} key={index}
          state={index === flag ? ElementStates.Changing : ElementStates.Default} />
      })}
    </>

  )
}