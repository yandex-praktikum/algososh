interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  clear: () => void;
  toArray: () => (T | null)[];

  isEmpty: boolean;
  isFull: boolean;
  head: number;
  tail: number;
  size: number;
  length: number;
}

export class Queue<T> implements IQueue<T> {
  private _container: (T | null)[] = [];
  private _head = 0;
  private _tail = 0;
  private readonly _size: number = 0;
  private _length = 0;

  constructor(size: number) {
    this._size = size;
    this._container = Array(size).fill(null);
  }

  enqueue = (item: T) => {
    if (this.isFull) {
      throw new Error("Maximum length exceeded");
    }

    if (!this.isEmpty) {
      this._tail++;
    }

    this._container[this._tail] = item;
    this._length++;
  };

  dequeue = () => {
    if (this.isEmpty) {
      throw new Error("No elements in the queue");
    }

    this._container[this._head] = null;
    this._length--;

    if (this._head !== this._size - 1) {
      if (this._head !== this._tail) {
        this._head++;
      }
    } else {
      this._tail++;
    }
  };

  peak = () => this._container[this._head];

  clear = () => {
    this._container = Array(this._size).fill(null);
    this._head = 0;
    this._tail = 0;
    this._length = 0;
  };

  get head() {
    return this._head;
  }
  get tail() {
    return this._tail;
  }
  get isEmpty() {
    return this._length === 0;
  }
  get isFull() {
    return this._tail >= this._size - 1;
  }
  get size() {
    return this._size;
  }
  get length() {
    return this._length;
  }
  toArray() {
    return this._container;
  }
}
