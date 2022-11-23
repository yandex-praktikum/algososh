type TStack<T> = {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getSize: () => number;
  }
  
  export class Stack<T> implements TStack<T> {
    container: T[] = [];
  
    push = (item: T): void => {
      this.container.push(item);
    };
  
    pop = (): void => {
      this.container.pop();
    };
  
    peak = (): T | null => {
      if (this.container.length > 0) return this.container[this.container.length - 1];
      else return null;
    };
  
    getSize = () => this.container.length;
  
    clear = () => this.container.length = 0;
  }