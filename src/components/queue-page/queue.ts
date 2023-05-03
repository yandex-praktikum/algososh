import { IQueue } from "../../types/queue";

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }

    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head % this.size] = null;
    this.head++;
    this.length--;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head % this.size];
  };

  clearQueue = () => {
    this.container = Array(this.size);
    this.length = 0;
    this.head = 0;
    this.tail = 0;
  };

  getElements = () => this.container;

  getLength = () => this.length;

  getHeadIndex = () => this.head;

  getTailIndex = () => this.tail;

  isEmpty = () => this.length === 0;
}
