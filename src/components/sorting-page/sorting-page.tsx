import React, { type SyntheticEvent, type ChangeEvent, useState } from 'react'
import { Button } from '../ui/button/button'
import { RadioInput } from '../ui/radio-input/radio-input'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { Direction } from '../../types/direction'
import styles from './sorting-page.module.css'
import { Column } from '../ui/column/column'

import { bubbleSortSteps, selectionSortSteps } from '../../utils/sorts'

interface INumber {
  value: number
  state?: 'current' | 'sorted'
}

type TSortFunc = (numbers: INumber[], setNumbers: (numbers: INumber[]) => void, sort: string, stopProgress: () => void) => void

const TICK_TIMEOUT = 300

const randomNumber = (min: number, max: number): number => {
  return min + Math.round(Math.random() * (max - min))
}

const createNumbers = (): Array<{ value: number }> => {
  return Array.from({ length: randomNumber(3, 17) }, () => ({ value: randomNumber(0, 100) }))
}

const bubbleSort: TSortFunc = (numbers, setNumbers, sort, stopProgress) => {
  const l = numbers.length
  const steps = bubbleSortSteps(numbers.map(el => el.value), sort)
  let j = 1
  let i = l
  let k = 0

  setTimeout(function tick () {
    const step: INumber[] = steps[k].map(el => ({ value: el }))
    step[j].state = step[j - 1].state = 'current'
    if (j >= 2) step[j - 2].state = undefined
    if (i < l) {
      for (let m = i; m < l; m++) {
        step[m].state = 'sorted'
      }
    }

    if (j < i - 1) {
      j++
    } else {
      i--
      j = 1
    }

    if (i > 0 && k < steps.length - 1) {
      k++
      setTimeout(tick, TICK_TIMEOUT)
    } else if (i >= 1) {
      step[i].state = 'current'
      setTimeout(tick, TICK_TIMEOUT)
    } else {
      step[i].state = 'sorted'
      stopProgress()
    }
    setNumbers([...step])
  }, TICK_TIMEOUT)
}

const selectionSort: TSortFunc = (numbers, setNumbers, sort, stopProgress) => {
  const steps = selectionSortSteps(numbers.map(el => el.value), sort)
  let i = 0
  let j = 1
  let k = 0
  const l = numbers.length

  setTimeout(function tick () {
    const step: INumber[] = steps[k].map(el => ({ value: el }))

    if (i < l - 1) {
      step[i].state = step[j].state = 'current'
    }

    for (let m = 0; m < i; m++) {
      step[m].state = 'sorted'
    }

    if (i === l - 1) {
      step[i].state = 'sorted'
    }

    if (j >= l - 1) {
      i++
      j = i + 1
    } else {
      j++
    }

    setNumbers([...step])

    if (k < steps.length - 1) {
      k++
      setTimeout(tick, TICK_TIMEOUT)
    } else if (i === l - 2) {
      setTimeout(tick, TICK_TIMEOUT)
    } else {
      stopProgress()
    }
  }, TICK_TIMEOUT)
}

export const SortingPage: React.FC = () => {
  const [sortType, setSortType] = useState('selection')
  const [numbers, setNumbers] = useState<INumber[]>(createNumbers())
  const [inProgress, setProgress] = useState(false)
  const [ascLoader, setAscLoader] = useState(false)
  const [descLoader, setDescLoader] = useState(false)

  const stopProgress = (): void => {
    setProgress(false)
    setAscLoader(false)
    setDescLoader(false)
  }

  const onSortTypeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSortType(e.target.value)
  }

  const onFormSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>): void => {
    e.preventDefault()

    setProgress(true)

    const eventSubmitter = (e.nativeEvent).submitter
    const sort = (eventSubmitter as HTMLButtonElement).name
    if (sort === 'asc') {
      setAscLoader(true)
    } else {
      setDescLoader(true)
    }

    if (sortType === 'selection') {
      selectionSort(numbers, setNumbers, sort, stopProgress)
    }
    if (sortType === 'bubble') {
      bubbleSort(numbers, setNumbers, sort, stopProgress)
    }
  }

  return (
    <SolutionLayout title='Сортировка массива'>
      <form onSubmit={onFormSubmit} className={styles.form}>
        <RadioInput label='Выбор' name='type' value='selection' checked={sortType === 'selection'} onChange={onSortTypeChange}/>
        <RadioInput label='Пузырёк' name='type' value='bubble' checked={sortType === 'bubble'} onChange={onSortTypeChange}/>
        <Button type='submit' name='asc' sorting={Direction.Ascending} text='По возрастанию' disabled={inProgress} isLoader={ascLoader}/>
        <Button type='submit' name='desc' sorting={Direction.Descending} text='По убыванию' disabled={inProgress} isLoader={descLoader}/>
        <Button type='button' text='Новый массив' disabled={inProgress} onClick={() => { setNumbers(createNumbers()) }} extraClass={styles.lastBtn}/>
      </form>
      <div className={styles.container}>
        {numbers &&
          numbers.map(({ value, state }, i) => {
            return <Column key={i} index={value} extraClass={state && styles[state]}/>
          })
        }
      </div>
    </SolutionLayout>
  )
}
