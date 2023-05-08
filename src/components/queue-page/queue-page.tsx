import React, { FormEvent, useState, ChangeEvent } from "react";
import styles from './queue-page.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

const ANIMATION_TIMEOUT = 500;

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
  clone: () => IQueue<T>;
  getHead: () => number;
  getTail: () => number;
  getElements: () => T[];
  getLength: () => number;
  getSize: () => number;
}

export class Queue<T> implements IQueue<T> {
  private readonly size: number = 0;
  private container: (T)[] = [];
  private length: number = 0;
  private head = -1;
  private tail = -1;

  constructor(size: number, container?: (T)[], head?: number, tail?: number, length?: number) {
    this.size = size;
    this.container = container || Array(size);
    this.head = head ?? -1;
    this.tail = tail ?? -1;
    this.length = length ?? 0;
  }

  enqueue = (item: T): void => {
    if (this.tail < this.size - 1) {
      this.container[this.tail + 1] = item;

      if (this.head === -1) this.head = 0;
      this.tail++;
      this.length++;
    }
  };

  dequeue = (): void => {
    if (this.getLength()) {
      this.head++;
      this.length--;
      if (!this.length) this.tail = this.head - 1;
    }
  };

  clear = (): void => {
    this.container = Array(this.size);
    this.head = -1;
    this.tail = -1;
    this.length = 0;
  }

  clone = () => new Queue(this.getSize(), this.getElements(), this.getHead(), this.getTail(), this.getLength());

  getHead = () => this.head;

  getTail = () => this.tail;

  getElements = () => this.container;

  getLength = () => this.length;

  getSize = () => this.size;
}

export const QueuePage: React.FC = () => {
  const [elements, setElements] = useState<IQueue<string>>(new Queue<string>(7));
  const [text, setText] = useState('');
  const [headHilighted, setHeadHilight] = useState(false);
  const [tailHilighted, setTailHilight] = useState(false);
  const [progress, setProgress] = useState<'add' | 'delete' | ''>('');

  const deleteElement = () => {
    setProgress('delete');
    setHeadHilight(true);

    setTimeout(() => {
      setHeadHilight(false);

      elements.dequeue();
      setElements(elements.clone());
      setProgress('');
    }, ANIMATION_TIMEOUT)
  }

  const clearStack = () => {
    elements.clear();

    setElements(elements.clone());
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    setProgress('add');
    elements.enqueue(text);
    setText('');

    setElements(elements.clone());

    setTailHilight(true);
    setTimeout(() => {
      setTailHilight(false);

      setElements(elements.clone());
      setProgress('');
    }, ANIMATION_TIMEOUT)

  }

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form} onSubmit={onFormSubmit}>
        <Input maxLength={4} type="text" value={text} isLimitText onChange={onInputChange} />
        <Button type="submit" text="Добавить" disabled={!text || !!progress} isLoader={progress === 'add'}/>
        <Button type="button" text="Удалить" onClick={deleteElement} disabled={!elements.getLength() || !!progress} isLoader={progress === 'delete'}/>
        <Button type="button" text="Очистить" onClick={clearStack}/>
      </form>
      <div className={styles.container}>
        {Array.from({ length: elements.getSize() }, (_, i) => {
          const el = elements.getElements()[i];
          const props: Record<string, any> = { key: i, index: i };

          if (i >= elements.getHead() && i <= elements.getTail()) props.letter = el;
          if (i === elements.getHead()) {
            props.head = 'head';
            if (headHilighted) props.extraClass = styles.current;
          }
          if (i === elements.getTail() && elements.getLength()) {
            props.tail = 'tail';
            if (tailHilighted) props.extraClass = styles.current
          };

          return <Circle {...props}/>
        })}
      </div>
    </SolutionLayout>
  );
};
