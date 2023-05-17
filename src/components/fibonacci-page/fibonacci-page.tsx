import styles from './fibonacci.module.css'
import React, { type ChangeEvent, type FormEvent, useState } from 'react'
import { Button } from '../ui/button/button'
import { Input } from '../ui/input/input'
import { Circle } from '../ui/circle/circle'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'

const TICK_TIMEOUT = 500

export const FibonacciPage: React.FC = () => {
  const [n, setN] = useState(0)
  const [numbers, setNumbers] = useState<number[]>([])
  const [inProgress, setProgress] = useState(false)

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setN(Number(e.target.value))
  }
  const onFormSubmit = (e: FormEvent): void => {
    e.preventDefault()

    numbers.length = 0
    setNumbers([])
    setProgress(true)

    let i = numbers.length
    setTimeout(function tick () {
      if (i <= n) {
        numbers.push(i <= 1 ? 1 : numbers[i - 1] + numbers[i - 2])

        setNumbers([...numbers])

        if (i === n) {
          setProgress(false)
        } else {
          i++
          setTimeout(tick, TICK_TIMEOUT)
        }
      }
    }, TICK_TIMEOUT)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={onFormSubmit}>
        <Input max={19} min={1} type="number" isLimitText onChange={onInputChange} disabled={inProgress}/>
        <Button type="submit" text="Рассчитать" disabled={!n || n > 19} isLoader={inProgress}/>
      </form>
      <div className={styles.container}>
        {(numbers.length > 0) && numbers.map((n, i) => {
          return <Circle key={i} letter={String(n)} index={i}/>
        })}
      </div>
    </SolutionLayout>
  )
}
