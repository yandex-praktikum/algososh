interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
  getItems: () => (T | null)[];
}

export class Queue<T> implements IQueue<T> {
  container: (T | null)[] = [];
  head = 0;
  tail = 0;
  size = 0;
  lenght = 0;
  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }
  enqueue(item: T) {
    if (this.lenght >= this.size) {
      throw new Error("MAXIMUM LENGHT EXCEEDED!");
    }
    this.container[this.tail % this.size] = item;
    this.lenght++;
    this.tail++;
  }
  dequeue() {
    if (this.lenght === 0) {
      throw new Error("No elements in the queue");
    }
    this.container[this.head % this.size] = null;
    this.head++;
    this.lenght--;
  }
  clear() {
    this.container = Array(this.size);
    this.lenght = 0;
    this.head = 0;
    this.tail = 0;
  }
  getItems() {
    return this.container;
  }
}
