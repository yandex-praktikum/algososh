export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
  getItems: () => T[];
}

export class Stack<T> implements IStack<T> {
  container: T[] = [];

  push(item: T) {
    this.container.push(item);
  }
  pop() {
    this.container.pop();
  }
  clear() {
    this.container.splice(0, this.container.length);
  }
  getItems() {
    return this.container;
  }
}
