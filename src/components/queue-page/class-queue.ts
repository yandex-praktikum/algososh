interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  printQueue: () => (T | null)[];
  clearQueue: () => void;
  isEmpty: () => boolean;
  isFull: () => boolean;
  getSize: () => number;
  getHead: () => number;
  getCurrentTail: () => number;
}

class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private currentTail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size; //длина очереди
    this.container = Array(size);
  }

// добавить элемент в очередь
  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail] = item;
    this.currentTail = this.tail;
    this.tail = (this.tail + 1) % this.size;
    this.length++;
  };

  // удалить элемент из очереди
  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.container[this.head] = null;
    this.head = (this.head + 1) % this.size;
    this.length--;
  };

  // вернуть элемент головы очереди
  peak = ()  => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    } 
    return this.container[this.head];
  };

  // данные элементов массива на основе которого реализуется очередь
  printQueue = () => [...this.container];

  // установить исходное состояние
  clearQueue = () => {
    this.head = 0;
    this.tail = 0;
    this.currentTail = 0;
    this.length = 0;
    this.container = Array(this.size);
  }
  
  
  isEmpty = () => this.length === 0;
  isFull = () => this.length === this.getSize();
  getSize = () => this.size;
  getHead = () => this.head;
  getCurrentTail = () => this.currentTail;

}

export const queue = new Queue<string>(7);
