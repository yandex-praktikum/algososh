export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  clear: () => void
}

export class Stack<T> implements IStack<T> {
  container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    let size = this.getSize();
    if (size) return this.container[size - 1];
    else return null;
  };

  getSize = () => this.container.length;

  clear = () => this.container.length = 0;
}
