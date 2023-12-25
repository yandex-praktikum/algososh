import { TStack } from "../../types/stack";

export class Stack<T> implements TStack<T> {

  private stack: Array<T> = [];

  push(el: T) {
    this.stack.push(el);
  }

  pop() {
    this.stack.pop();
  }

  peak() {
    if (this.stack.length > 0) {
      return this.stack[this.stack.length - 1];
    }
    return null;
  }

  clear() {
    this.stack = [];
  }

  get size() {
    return this.stack.length;
  }

  get getItems() {
    return this.stack;
  }
}
