import styles from "./string.module.css";
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";

interface ILetter {
  value: string;
  state?: 'current' | 'sorted';
}

const TICK_TIMEOUT = 1000;

export const StringComponent: React.FC = () => {
  const [letters, setLetters] = useState<ILetter[]>([]);
  const [inProgress, setProgress] = useState(false);
  const [isSorted, setSorted] = useState(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLetters(e.target.value.split('').map((value) => ({ value }) ));
  }

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    setProgress(true);

    let i = 0;
    const l = letters.length;
    const middle = Math.floor(l / 2);

    setTimeout(function tick() {
      if (i <= middle) {
        letters[i].state = letters[l - i - 1].state = (i < middle && l > 1) ? 'current' : 'sorted';

        if (i >= 1) {
          let tmp = letters[i - 1].value;
          letters[i - 1].value = letters[l - i].value;
          letters[l - i].value = tmp;
          letters[i - 1].state = letters[l - i].state = 'sorted';
        }

        setLetters([...letters]);

        if (i === middle ) {
          setProgress(false);
          setSorted(true);
        } else {
          i++;
          setTimeout(tick, TICK_TIMEOUT);
        }
      }
    }, TICK_TIMEOUT);

  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={onFormSubmit}>
        <Input maxLength={11} extraClass="" isLimitText onChange={onInputChange} disabled={inProgress}/>
        <Button type="submit" text="Развернуть" extraClass="" disabled={!letters.length} isLoader={inProgress}/>
      </form>
      <div className={styles.container}>
        {(inProgress || isSorted) && letters.map((letter, i) => {
          return <Circle key={i} letter={letter.value} extraClass={letter.state && styles[letter.state]}/>
        })}
      </div>
    </SolutionLayout>
  );
};
