import React, { ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './string.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle"
import { FormEvent } from "react";
import { useState } from "react";
import { swap } from "./string-index";
import { ElementStates } from "../../types/element-states";


export const StringComponent: React.FC = () => {

  type PropsType = {
    string: string,
    changing: number[]
  }

  const [form, setValue] = useState({ string: '' })
  const [btnLoader, setBtnLoader] = useState(false)

  const [stringData, setStringData] =
    useState({ string: '', changing: [] as number[] })

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setValue({ ...form, string: (e.target as HTMLInputElement).value });
  }

  function reverse(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const stringArr = form.string.split('')
    setStringData({ string: form.string, changing: [] })

    let end = stringArr.length - 1;
    const count = Math.floor(end / 2)
    let i = 0
    setBtnLoader(true)
    const rev = setInterval(() => {
      const newString = swap(stringArr, i, end - i)
      const changing = [i + 1, end - i - 1]
      setStringData({ string: newString, changing })
      if (i === count) {
        clearInterval(rev)
        setBtnLoader(false)
      }
      i++
    }, 1000)
    setValue({ string: '' })
  }



  function String({ string, changing }: PropsType): any {
    const stringArr = string.split('')

    const colorState = {
      [changing[0]]: ElementStates.Changing,
      [changing[1]]: ElementStates.Changing
    }

    const getColor = (index: number): ElementStates | null => {
      if (!changing.length) return ElementStates.Default
      if (index > changing[0] && index < changing[1]) {
        return ElementStates.Default
      }
      if (changing[0] > changing[1] || changing[0] === changing[1]) return null
      return colorState[index]

    }


    return string && stringArr.map((s, idx) => {
      return <li key={idx}>
        <Circle key={idx} letter={s}
        state={getColor(idx) || ElementStates.Modified} />
        </li>
    })
  }
  return (
    <SolutionLayout title="Строка">
      <div className={styles.context}>
        <form className={styles.form} onSubmit={reverse}>
          <Input name={'string'} type="text" maxLength={11} onChange={onInputChange}
            value={form.string} extraClass="mr-6" />
          <Button text="Развернуть" type="submit" isLoader={btnLoader} disabled={!form.string}></Button>
        </form>
        <p className={styles.limit}> Максимум - 11 символов</p>
      </div>
      <ul className={styles.circles}>
          <String string={stringData.string}
          changing={stringData.changing} />
      </ul>
    </SolutionLayout>
  );
};
