import { IStack } from "../../types/stack";

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container[this.container.length] = item;
  };

  pop = (): void => {
    if (this.container.length > 0) {
      this.container.pop();
    }
  };

  peak = (): T | null => {
    if (this.container.length > 0) {
      return this.container[this.container.length - 1];
    }
    return null;
  };

  clear = (): void => {
    this.container = [];
  };

  getSize = () => this.container.length;

  getElements = () => this.container;
}
