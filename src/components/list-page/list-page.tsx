import React, { useEffect, useState } from "react";
import styles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon"
import { NodeList } from "./utils";


export const ListPage: React.FC = () => {
  const [string, setString] = useState<string>('');
  const [flag, setFlag] = useState(false);
  const [list, setList] = useState<string[]>(['0', '34', '8', '1']);
  const li = new NodeList(list);
  const [index, setIndex] = useState<number | string>('')
  const [yetAnIndex, setYetAnIndex] = useState<number>(-1) // это индекс для счетчика в useEffect
  const [flagForHead, setFlagForHead] = useState<string>('')
  const [flagForTail, setFlagForTail] = useState<string>('')
  const [flagForGreen, setFlagForGreen] = useState(false)
  const [circleContent, setCircleContent] = useState('')
  const [count, setCount] = useState<number>(-1)
  const [yetAnCount, setYetAnCount] = useState<number | string>('-1')
  const [anotherCount, setAnotherCount] = useState<number>(-1)// это счетчик для удаления по индексу
  const [isLoader, setIsLoader] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (yetAnIndex > -1 && anotherCount < yetAnIndex) {
        setAnotherCount(prev => prev + 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [anotherCount])

  const inHead = () => {
    setFlagForHead(string)
    setCount(0)
    setYetAnCount('0')
    setString('')
    li.prepend(string)
    setTimeout(() => {
      setFlagForHead('')
    }, 1000)
    setTimeout(() => {
      setCount(-1)
      setYetAnCount('-1')
    }, 2000)
    setTimeout(() => {
      setList(li.toArray())
    }, 1000)
  }

  const inTail = () => {
    setFlagForHead(string)
    setCount(list.length - 1)
    setYetAnCount(list.length)
    setString('')
    setIndex('')
    li.append(string)
    setTimeout(() => {
      setFlagForHead('')
    }, 1000)
    setTimeout(() => {
      setCount(-1)
      setYetAnCount('-1')
    }, 2000)
    setTimeout(() => {
      setList([...li.toArray()])
    }, 1000)
  }

  const fromHead = () => {
    setCount(0)
    setFlagForTail(list[0]);
    setCircleContent(list[0])
    list[0] = '';
    setList([...list]);
    li.shift();
    setTimeout(() => {
      setString('')
      setCount(-1)
      setList([...li.toArray()])
      setFlagForTail('');
      setCircleContent('')
    }, 1000);

  }

  const fromTail = () => {
    setCount(list.length - 1)
    setFlagForTail(list[list.length - 1]);
    setCircleContent(list[list.length - 1])
    list[list.length - 1] = '';
    setList([...list]);
    li.pop();
    setTimeout(() => {
      setString('')
      setCount(-1)
      setList([...li.toArray()])
    }, 1000);

  }

  const insertByIndex = () => {
    setAnotherCount(0)
    setFlagForHead(list[yetAnIndex]);
    setFlag(true)
    li.insert(index, string)
    setString('')
    setIndex('')
    setTimeout(() => {
      setYetAnIndex(-1)
    }, 1000 * yetAnIndex);
    setTimeout(() => {
      setList([...li.toArray()])
      setFlagForHead('');
      setFlagForGreen(true)
    }, 1000 * yetAnIndex + 1000);
    setTimeout(() => {
    setFlag(false)
    setAnotherCount(-1)
     setFlagForGreen(false)
    }, 1000 * yetAnIndex + 2000)
  }

  const removeByIndex = () => {
    setString('')
    setAnotherCount(0)
    setFlag(true)
    li.removeByIndex(index)
    setIndex('')
    setTimeout(() => {
      setFlagForTail(list[yetAnIndex]);
      setCircleContent(list[yetAnIndex])
      list[yetAnIndex] = '';
      setList([...list]);
      setYetAnIndex(-1)
    }, 1000 * yetAnIndex + 1000);

    setTimeout(() => {
      setFlag(false)
      setList([...li.toArray()])
      setAnotherCount(-1)

      setFlagForTail('');
    }, 1000 * yetAnIndex + 2000);
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container} >
        <Input maxLength={4} isLimitText={true} name={"MyInput"} type={'text'} value={string} onChange={(evt: any) => {
          setString(evt.target.value)
          setCircleContent(evt.target.value)
        }} />
        <Button text={"Добавить в head"} isLoader={isLoader ? true : false} type={"button"} disabled={!string} onClick={inHead} />
        <Button text={"Добавить в tail"} type={"button"} disabled={!string} onClick={inTail} />
        <Button text={"Удалить из head"} type={"button"} disabled={list.length > 0 ? false : true} onClick={fromHead} />
        <Button text={"Удалить из tail"} type={"button"} disabled={list.length > 0 ? false : true} onClick={fromTail} />
      </div>
      <div className={styles.container}>
        <Input name={"MyIndex"} type={'text'} value={index} onChange={(evt: any) => {
          setIndex(evt.target.value)
          setYetAnIndex(evt.target.value)
        }} />
        <Button text={"Добавить по индексу"} type={"button"} disabled={!string} onClick={insertByIndex} />
        <Button text={"Удалить по индексу"} type={"button"} disabled={!index} onClick={removeByIndex} />
      </div>
      <div className={styles.letterContainer}>
        <CircleComponent array={[...list]}  string={circleContent} count={count} yetAnCount={yetAnCount} flagForHead={flagForHead} flagForTail={flagForTail} flag={flag} flagForGreen={flagForGreen} anotherCount={anotherCount} />
      </div>
    </SolutionLayout>
  );
};

type CircleComponentProps = {
  array: string[];
  string: string;
  count: string | number;
  flagForHead: string;
  flag: boolean;
  yetAnCount: string | number;
  anotherCount: number
  flagForTail: string;
  flagForGreen: boolean;
}

const CircleComponent = ({ array, string, count, yetAnCount, flagForHead, flag, flagForTail,flagForGreen, anotherCount }: CircleComponentProps) => {
  return (
    <>
      {!flag && array && array.map((item, index) => {
        return <div className={styles.circleContainer}> <Circle letter={item.toString()} head={flagForHead && index === +count ? <Circle isSmall={true} letter={string} state={ElementStates.Changing} /> : index === 0 ? 'top' : null} tail={flagForTail && index === +count ? <Circle isSmall={true} letter={string} state={ElementStates.Changing} /> : index === array.length - 1 ? 'tail' : null} key={index} index={index}
          state={flagForHead === '' && index === +yetAnCount ? ElementStates.Modified : ElementStates.Default} />  {index < array.length - 1 ? <ArrowIcon /> : null}</div>
      })}
      {flag && array && array.map((item, index) => {
        return <div className={styles.circleContainer}> <Circle letter={item.toString()} head={flagForHead && index === anotherCount ? <Circle isSmall={true} letter={string} state={ElementStates.Changing} /> : index === 0 ? 'top' : null} tail={flagForTail && index === anotherCount ? <Circle isSmall={true} letter={string} state={ElementStates.Changing} /> : index === array.length - 1 ? 'tail' : null} key={index} index={index}
          state={!flagForGreen && index <= anotherCount ? ElementStates.Changing : (index === anotherCount) ? ElementStates.Modified : ElementStates.Default} />  {index < array.length - 1 ? <ArrowIcon /> : null}</div>
      })}
    </>

  )
}
