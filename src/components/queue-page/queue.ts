

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  clear: () => void;
  isEmpty: () => boolean;
  getSize: () => number;
  printQueue: () => Array<T | undefined>;
  queueHead: () => number;
  queueTail: () => number;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | undefined)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    console.log('this.length', this.length, this.size)
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }


    this.container[this.tail % this.size] = item
    this.length++
    this.tail++
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.container[this.head] = undefined
    this.length--
    this.head++

  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head] || null;
  };

  clear = () => {
    this.head = 0
    this.tail = 0
    this.length = 0
    this.container = Array(this.size)
  };

  isEmpty = () => this.length === 0;

  getSize = () => this.size;

  printQueue = (): (T | undefined)[] => [...this.container]

  queueHead = () => this.head;

  queueTail = () => this.tail;

}