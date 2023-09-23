import React, { FormEvent, ReactElement, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { fibArray } from "./fibonacci";

export const FibonacciPage: React.FC = () => {

  type propsType = {
    val: number[],
  }

  const [form, setValue] = useState({ valToCount: '' })
  const [data, setData] = useState([])
  const [btnDisable, setBtnDisable] = useState(false)
  const [btnLoader, setBtnLoader] = useState(false)

  function onInputChange(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();
    let valToCount = (e.target as HTMLInputElement).value

    setBtnDisable(+valToCount > 19)
    setValue({ ...form, valToCount });
  }

  function calculate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fibArr = fibArray(+form.valToCount + 1)
    const val: number[] = []
    let i = 0
    setBtnLoader(true)
    const rev = setInterval(() => {
      val.push(fibArr[i])
      setData([...val] as [])
      if (i === fibArr.length - 1) {
        clearInterval(rev)
        setBtnLoader(false)
      }
      i++
    }, 500)
    setValue({ valToCount: '' });
  }

  function FibBeads({ val }: propsType): any  {
    return val.map((fibNum: number, idx: number) => {
      return <Circle key={idx} letter={`${fibNum}`} index={idx} />
    })
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.context}>
        <form className={styles.form} onSubmit={calculate}>
          <Input name={'valToCount'} type="number" value={form.valToCount} onChange={onInputChange}
            min="1" max="19" extraClass="mr-6" />
          <Button text="Рассчитать" type='submit' disabled={btnDisable} isLoader={btnLoader}></Button>
        </form>
        <p className={styles.limit}> Максимальное число - 19</p>
      </div>
      <ul className={styles.circles}>
        <FibBeads val={data} />
      </ul>
    </SolutionLayout>
  );
};
