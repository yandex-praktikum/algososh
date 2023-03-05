interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  printStack: () => T[];
  clearStack: () => void;
  isFull: () => boolean;
}

class Stack<T> implements IStack<T> {
  private container: T[] = [];
  private maxSize = 6;

  push = (item: T): void => {
    if(this.getSize() < this.maxSize){
      this.container.push(item);
    }
  };

  pop = (): void => {
    if(this.getSize()){
        this.container.pop();
    }
  };

  peak = (): T | null => {
    if(this.getSize()){
      return this.container[this.getSize() - 1];
    }
    return null;
  };
 
  clearStack = (): void => {
    this.container = [];
  }

  getSize = () => this.container.length;

  printStack = () => this.container; 

  isFull = () => {
    if(this.getSize() < this.maxSize){
      return false;
    }
    return true;
  }
}

export const stack = new Stack<string>();