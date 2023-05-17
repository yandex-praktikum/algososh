import React, { useState, type ChangeEvent } from 'react'
import styles from './list-page.module.css'
import { Input } from '../ui/input/input'
import { Button } from '../ui/button/button'
import { Circle } from '../ui/circle/circle'
import { ArrowIcon } from '../ui/icons/arrow-icon'
import { SolutionLayout } from '../ui/solution-layout/solution-layout'
import { ElementStates } from '../../types/element-states'
import { LinkedList } from './LinkedList'

const ANIMATION_TIMEOUT = 1000

const randomNumber = (min: number, max: number): number => {
  return min + Math.round(Math.random() * (max - min))
}

const generateList = (): LinkedList<string> => {
  const r = Array.from({ length: randomNumber(1, 6) }, () => (String(randomNumber(0, 100))))

  return new LinkedList(r)
}

export const ListPage: React.FC = () => {
  const [elements, setElements] = useState<LinkedList<string>>(generateList)
  const [value, setValue] = useState('')
  const [index, setIndex] = useState(-1)
  const [progress, setProgress] = useState<'addHead' | 'addTail' | 'deleteHead' | 'deleteTail' | 'addByIndex' | 'deleteByIndex' | undefined >(undefined)

  const onValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
  }

  const onIndexChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setIndex(Number(e.target.value))
  }

  const animateAdd = (type: 'head' | 'tail', state: ElementStates): void => {
    const node = type === 'head' ? elements.getHead() : elements.getTail()
    if (node != null) {
      node.state = state
      if (state === ElementStates.Changing) {
        node.addingValue = value
        node.modify = 'head'
        node.showLetter = false
      } else {
        node.showLetter = true
        node.addingValue = null
      }
    }

    setElements(elements.clone())
    setValue('')
  }

  const addHead = (): void => {
    setProgress('addHead')
    elements.prepend(value)
    animateAdd('head', ElementStates.Changing)

    setTimeout(() => {
      animateAdd('head', ElementStates.Modified)
      setTimeout(() => {
        animateAdd('head', ElementStates.Default)
        setProgress(undefined)
        setIndex(-1)
      }, ANIMATION_TIMEOUT)
    }, ANIMATION_TIMEOUT)
  }

  const addTail = (): void => {
    setProgress('addTail')
    elements.append(value)
    animateAdd('tail', ElementStates.Changing)

    setTimeout(() => {
      animateAdd('tail', ElementStates.Modified)
      setTimeout(() => {
        animateAdd('tail', ElementStates.Default)
        setProgress(undefined)
      }, ANIMATION_TIMEOUT)
    }, ANIMATION_TIMEOUT)
  }

  const deleteHead = (): void => {
    setProgress('deleteHead')
    const head = elements.getHead()
    if (head != null) {
      head.state = ElementStates.Changing
      head.modify = 'tail'
    } else return

    setElements(elements.clone())

    setTimeout(() => {
      elements.deleteHead()
      setElements(elements.clone())
      setProgress(undefined)
    }, ANIMATION_TIMEOUT)
  }

  const deleteTail = (): void => {
    setProgress('deleteTail')
    const tail = elements.getTail()
    if (tail != null) {
      tail.state = ElementStates.Changing
      tail.modify = 'tail'
    } else return

    setElements(elements.clone())

    setTimeout(() => {
      elements.deleteTail()
      setElements(elements.clone())
      setProgress(undefined)
    }, ANIMATION_TIMEOUT)
  }

  const addByIndex = (): void => {
    if (index < 0 || index >= elements.size) return
    if (index === 0) { addHead(); return }
    setProgress('addByIndex')
    let i = 0

    setTimeout(function byIndex () {
      const currentNode = elements.getNode(i)
      const prevNode = elements.getNode(i - 1)
      if (i <= index && (currentNode != null)) {
        if (prevNode != null) {
          prevNode.addingValue = null
          prevNode.modify = ''
        }
        currentNode.state = ElementStates.Changing
        currentNode.addingValue = value
        currentNode.modify = 'head'
      }

      setElements(elements.clone())

      if (i > index) {
        let addedIndex = index
        elements.addByIndex(index, value)

        const arr = elements.toArray()
        arr.map((el) => {
          el.state = ElementStates.Default
          el.addingValue = null
          return el
        })
        if (index === 0) addedIndex++
        const node = elements.getNode(addedIndex)
        if (node != null) node.state = ElementStates.Modified
        setElements(elements.clone())
        setTimeout(() => {
          if (node != null) {
            node.state = ElementStates.Default
            setElements(elements.clone())
            setValue('')
            setIndex(-1)
            setProgress(undefined)
          }
        }, ANIMATION_TIMEOUT)
      } else {
        i++
        setTimeout(byIndex, ANIMATION_TIMEOUT)
      }
    }, ANIMATION_TIMEOUT)
  }

  const deleteByIndex = (): void => {
    if (index < 0 || index >= elements.size) return

    setProgress('deleteByIndex')
    let i = 0

    setTimeout(function byIndex () {
      const currentNode = elements.getNode(i)
      if (i < index && (currentNode != null)) {
        currentNode.state = ElementStates.Changing
      }

      if (i === index && (currentNode != null)) {
        currentNode.state = ElementStates.Changing
        currentNode.modify = 'tail'
      }

      setElements(elements.clone())

      if (i > index) {
        elements.deleteByIndex(index)

        const arr = elements.toArray()
        arr.map((el) => {
          el.state = ElementStates.Default
          return el
        })

        setElements(elements.clone())
        setIndex(-1)
        setProgress(undefined)
      } else {
        i++
        setTimeout(byIndex, ANIMATION_TIMEOUT)
      }
    }, ANIMATION_TIMEOUT)
  }

  return (
    <SolutionLayout title='Связный список'>
      <form className={styles.form}>
        <Input maxLength={4} type='text' placeholder='Введите значение' value={value} isLimitText onChange={onValueChange} />
        <Button type='button' text='Добавить в head' disabled={!value || !!progress} onClick={addHead} isLoader={progress === 'addHead'}/>
        <Button type='button' text='Добавить в tail' disabled={!value || !!progress} onClick={addTail} isLoader={progress === 'addTail'}/>
        <Button type='button' text='Удалить из head' onClick={deleteHead} disabled={!!progress} isLoader={progress === 'deleteHead'} />
        <Button type='button' text='Удалить из tail' onClick={deleteTail} disabled={!!progress} isLoader={progress === 'deleteTail'} />
        <Input type='number' max={elements.size - 1} placeholder='Введите индекс' value={index >= 0 ? index : ''} onChange={onIndexChange} />
        <Button type='button' text='Добавить по индексу' disabled={!value || index < 0 || index > elements.size - 1 || !!progress} onClick={addByIndex} isLoader={progress === 'addByIndex'} extraClass={styles.addByIndex}/>
        <Button type='button' text='Удалить по индексу' disabled={index < 0 || index > elements.size - 1 || !!progress} onClick={deleteByIndex} isLoader={progress === 'deleteByIndex'} extraClass={styles.deleteByIndex}/>
      </form>
      <div className={styles.container}>
        {elements.toArray().map((el, i, arr) => {
          const props: Record<string, any> = { index: i, letter: el.value, state: el.state }
          if (i === 0) props.head = 'head'
          if (i === arr.length - 1) props.tail = 'tail'

          if (el.state === ElementStates.Changing) {
            if (el.modify === 'head') {
              props.head = <Circle letter={el.addingValue || ''} state={ElementStates.Changing} isSmall/>
              if (!el.showLetter) props.letter = ''
            }
            if (el.modify === 'tail') {
              props.tail = <Circle letter={el.value} state={ElementStates.Changing} isSmall/>
              props.letter = ''
            }
            if (el.modify === '') {
              props.state = ElementStates.Changing
            } else {
              props.state = ElementStates.Default
            }
          }
          return (<React.Fragment key={i}>
            {i > 0 && <ArrowIcon />}
            <Circle {...props}/>
          </React.Fragment>)
        })}

      </div>
    </SolutionLayout>
  )
}
