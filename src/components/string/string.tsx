import React from "react";
import styles from "./string.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { useState, useEffect } from "react";
import { ElementStates } from "../../types/element-states";
import { algoritm } from "./util"

export const StringComponent: React.FC = () => {
  const [string, setString] = useState('');
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [index, setIndex] = useState(0);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isButtonPressed && (index < (algoritm(string).length - 1))) {
        setIndex(prev => prev + 1);
      }
    }, 1000);
    if (index === (algoritm(string).length - 1)) {
      setIsLoader(false)
    }

    return () => { clearInterval(interval);}

  }, [isButtonPressed, string, index])

  const handleClick = () => {
    algoritm(string);
    setIsButtonPressed(true);
    setIsLoader(true);
   }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <Input maxLength={11} type={"text"} isLimitText={true} onChange={(evt: any) =>
          setString(evt.target.value)
        } />
        < Button text={'Развернуть'} onClick={handleClick}  isLoader={isLoader ? true : false}/>
      </div>
      <div className={styles.letterContainer}>
        {isButtonPressed && < CircleComponent data={algoritm(string)[index]} index={index} />}

      </div>
    </SolutionLayout>
  );
};

type CircleComponentProps = {
  data: string[];
  index: number;
}

const CircleComponent = ({ data, index }: CircleComponentProps) => {
  return (
    <>{(index === 0) &&
      data.map((item, key) => { return <Circle letter={item} key={key} state={(key === 0 || key === data.length - 1) ? ElementStates.Changing : ElementStates.Default} /> })}
      {(index === 1) &&
        data.map((item, key) => { return <Circle letter={item} key={key} state={(key === 0 || key === data.length - 1) ? ElementStates.Modified : (key === 1 || key === data.length - 2) ? ElementStates.Changing : ElementStates.Default} /> })}
      {(index === 2) &&
        data.map((item, key) => { return <Circle letter={item} key={key} state={(key <= 1 || key >= data.length - 2) ? ElementStates.Modified : (key === 2 || key === data.length - 3) ? ElementStates.Changing : ElementStates.Default} /> })}
      {(index === 3) &&
        data.map((item, key) => { return <Circle letter={item} key={key} state={(key <= 2 || key >= data.length - 3) ? ElementStates.Modified : (key === 3 || key === data.length - 4) ? ElementStates.Changing : ElementStates.Default} /> })}
      {(index === 4) &&
        data.map((item, key) => { return <Circle letter={item} key={key} state={(key <= 3 || key >= data.length - 4) ? ElementStates.Modified : (key === 4 || key === data.length - 5) ? ElementStates.Changing : ElementStates.Default} /> })}
      {(index === 5) &&
        data.map((item, key) => { return <Circle letter={item} key={key} state={(key <= 4 || key >= data.length - 5) ? ElementStates.Modified : (key === 5 || key === data.length - 6) ? ElementStates.Changing : ElementStates.Default} /> })}
      {(index === 6) &&
        data.map((item, key) => { return <Circle letter={item} key={key} state={(key <= 5 || key >= data.length - 6) ? ElementStates.Modified : (key === 6 || key === data.length - 7) ? ElementStates.Changing : ElementStates.Default} /> })}
    </>

  )
}