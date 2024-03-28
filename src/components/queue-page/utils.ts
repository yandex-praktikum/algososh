
type TQueue<T> = {
    enqueue: (item: T, tail: number) => void;
    dequeue: () => T[] | string[];
    elements: () => T[] | string[];
    isEmpty: () => boolean;
    clear: () => T[] | string[];
    head: () => number;
    tail: () => number;
  }
export  class Queue<T> implements TQueue<T> {
    private items: T[] | string[] = [];
    constructor(queue: T[]) {
      this.items = queue;
    }
  
    enqueue (item: T, tail: number): void {
      if (tail <= 0) {
        let index = this.items.findIndex(item => item === '')
        this.items[index] = item;
      }
      else {
        this.items[tail] = item
      }
    }
  
    dequeue() {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue");
      }
      let index = this.items.findIndex(item => item !== '')
      this.items[index] = '';
      return this.items;
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
    elements() {
      return this.items;
    }
    clear() {
      return this.items = ['', '', '', '', '', '', '',];
    }
    head() {
      return this.items.findIndex(item => item !== '');
    }
    tail() {
      let index: number = -1;
      for (let i = this.items.length - 1; i >= 0; i--) {
        if (this.items[i] !== '') {
          return index = i;
        }
      }
      return index;
    }
  }