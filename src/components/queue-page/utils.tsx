
interface INode<T> {
  value: T;
  next: null | INode<T>;
}

export interface IQueue<T> {
  enqueue: (value: T) => void;
  dequeue: () => void;
  getHead: () => { value: T | null; index: number } ;
  getTail: () => { value: T | null; index: number } ;
}

class Node<T> implements INode<T> {
  value: T;
  next: null | INode<T>;
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  head: number = 0;
  tail: number = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue(item: T) {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail] = item;
    this.tail++;
    this.length++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head] = null;
    this.head++;
    this.length--;
  }

  getHead = (): { value: T | null; index: number } => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return { value: this.container[this.head], index: this.head };
  };

  getTail = (): { value: T | null; index: number } => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return { value: this.container[this.tail-1], index: this.tail-1 };
  };

  isEmpty = () => this.length === 0;
}
