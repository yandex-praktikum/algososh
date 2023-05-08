import React, { FormEvent, useState, ChangeEvent } from "react";
import styles from './list-page.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";


const ANIMATION_TIMEOUT = 500;


// interface ILinkedList<T> {
//   prepend: (item: T) => void;
//   append: (item: T) => void;
//   addByIndex: (index: number, item: T) => void;
//   deleteByIndex: (index: number) => void;
//   deleteHead: () => void;
//   deleteTail: () => void;
//   clone: () => ILinkedList<T>;
//   toArray: () => T[];
// }

class LinkedListNode<T> {
  public readonly value: T;
  public next: LinkedListNode<T> | null;
  public state: 'default' | 'changing' | 'modified' = 'default';

  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next ?? null;
  }
}

export class LinkedList<T> {//implements ILinkedList<T> {
  public head: LinkedListNode<T> | null = null;
  public tail: LinkedListNode<T> | null = null;

  constructor(values?: T[]) {
    if (values)
      for(const value of values) this.append(value);
  }

  getHead = () => this.head;

  getTail = () => this.tail;

  prepend = (item: T): void => {
    const node = new LinkedListNode(item, this.head);
    this.head = node;
    this.tail ??= node;
  };

  append = (item: T): void => {
    console.log('append', item);
    const node = new LinkedListNode(item);
    if (this.tail) this.tail.next = node;
    this.tail = node;
    if (!this.head) this.head = node;
  };

  addByIndex = (index: number, item: T) => {

  }

  deleteByIndex = () => {

  }

  deleteHead = () => {
    if (this.head) this.head = this.head.next;
    if (!this.head) this.tail = null;
    console.log('delete head', this.head, this.tail)
  }

  deleteTail = () => {
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      let node = this.head;
      while (node && node.next && node.next.next) {
        node = node.next;
      }
      this.tail = node;
      if (node) node.next = null;
    }
    console.log('delete tail', this.head, this.tail)
  }

  clone = () => {
    const clone = new LinkedList<T>();
    clone.head = this.head;
    clone.tail = this.tail;
    return clone;
  }

  toArray = (): LinkedListNode<T>[] => {
    const res: LinkedListNode<T>[] = [];

    let node = this.head;
    while (node) {
      res.push(node);
      node = node.next;
    }

    return res;
  };
}


const randomNumber = (min: number, max: number) => {
  return min + Math.round(Math.random()*(max-min));
}

const generateList = () => {
  const r = Array.from({ length: randomNumber(1, 6) }, () => (String(randomNumber(0, 100))));

  console.log('generateList', r);
  return new LinkedList(r);;
}

export const ListPage: React.FC = () => {
  const [elements, setElements] = useState<LinkedList<string>>(generateList);
  const [value, setValue] = useState('');
  const [index, setIndex] = useState(0);


  console.log('elements', elements)

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const onIndexChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIndex(Number(e.target.value));
  }

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    setValue('');

  }

  const deleteHead = () => {
    const head = elements.getHead();
    if (head) head.state = ElementStates.Changing;
    else return;

    setElements(elements.clone())

    setTimeout(() =>  {

      elements.deleteHead();
      setElements(elements.clone())
    }, ANIMATION_TIMEOUT)
  }

  const deleteTail = () => {
    const tail = elements.getTail();
    if (tail) tail.state = ElementStates.Changing;
    else return;

    setElements(elements.clone())

    setTimeout(() =>  {

      elements.deleteTail();
      setElements(elements.clone())
    }, ANIMATION_TIMEOUT)
  }
  const addByIndex = () => {}
  const deleteByIndex = () => {}

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form} onSubmit={onFormSubmit}>
        <Input maxLength={4} type="text" value={value} isLimitText onChange={onValueChange} />
        <Button type="submit" text="Добавить в head" disabled={!value} />
        <Button type="submit" text="Добавить в tail" disabled={!value} />
        <Button type="button" text="Удалить из head" onClick={deleteHead} />
        <Button type="button" text="Удалить из tail" onClick={deleteTail} />
        <Input type="text" value={value} isLimitText onChange={onIndexChange} />
        <Button type="button" text="Добавить по индексу" onClick={addByIndex} extraClass={styles.addByIndex}/>
        <Button type="button" text="Удалить по индексу" onClick={deleteByIndex} extraClass={styles.deleteByIndex}/>
      </form>
      <div className={styles.container}>
        {elements.toArray().map((el, i, arr) => {
          console.log('arr', arr);

          const props: Record<string, any> = { key: i, index: i, letter: el.value, state: el.state };
          if (i === 0) props.head = 'head';
          if (i === arr.length - 1) props.tail = 'tail';

          if (el.state === ElementStates.Changing) {
            props.head = <Circle letter={el.value} state={ElementStates.Changing} isSmall/>;
            delete props.letter;
            props.state = ElementStates.Default;
          }
          console.log('circle', el, i)
          return <Circle {...props}/>
        })}

      </div>
    </SolutionLayout>
  );
};
