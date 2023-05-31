import styles from './string.module.css'
import React, { type ChangeEvent, type FormEvent, useState } from 'react'
import { Button } from '../ui/button/button'
import { Input } from '../ui/input/input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { Circle } from '../ui/circle/circle'
import { reverseStringAlgorythmSteps } from '../../utils/reverse-string'

interface ILetter {
  value: string
  state?: 'current' | 'sorted'
}

const TICK_TIMEOUT = 1000

export const StringComponent: React.FC = () => {
  const [letters, setLetters] = useState<ILetter[]>([])
  const [steps, setSteps] = useState<string[][]>([[]])
  const [inProgress, setProgress] = useState(false)
  const [isSorted, setSorted] = useState(false)

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLetters(e.target.value.split('').map((value) => ({ value })))
    setSteps(reverseStringAlgorythmSteps(e.target.value))
  }

  const onFormSubmit = (e: FormEvent): void => {
    e.preventDefault()

    setProgress(true)

    let i = 0
    const textL = letters.length
    const l = steps.length

    setTimeout(function tick () {
      letters[i].state = letters[textL - i - 1].state = 'current'

      setLetters([...letters])

      setTimeout(() => {}, TICK_TIMEOUT)
      if (i <= l - 1) {
        for (let j = 0; j < steps[i].length; j++) {
          letters[j].value = steps[i][j]
        }
        letters[i].state = letters[textL - i - 1].state = 'sorted'

        if (i === l - 1) {
          setProgress(false)
          setSorted(true)
        } else {
          i++
          setTimeout(tick, TICK_TIMEOUT)
        }
      }
    }, TICK_TIMEOUT)
  }

  return (
    <SolutionLayout title='Строка'>
      <form className={styles.form} onSubmit={onFormSubmit}>
        <Input data-testid="input" maxLength={11} extraClass='' isLimitText onChange={onInputChange} disabled={inProgress}/>
        <Button data-testid="button" type='submit' text='Развернуть' extraClass='' disabled={letters.length === 0} isLoader={inProgress}/>
      </form>
      <div data-testid='container' className={styles.container}>
        {(inProgress || isSorted) && letters.map((letter, i) => {
          return <Circle data-testid="circle" key={i} letter={letter.value} extraClass={letter.state && styles[letter.state]}/>
        })}
      </div>
    </SolutionLayout>
  )
}
