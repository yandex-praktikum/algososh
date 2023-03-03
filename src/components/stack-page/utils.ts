interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  clear: () => void;
  toArray: () => T[];
  length: number;
  lastIndex: number;
}

export class Stack<T> implements IStack<T> {
  private _container: T[] = [];
  push = (item: T) => {
    this._container.push(item);
  };
  pop = () => {
    this._container.pop();
  };
  peak = () => {
    return this.length > 0 ? this._container[this.length - 1] : null;
  };
  clear = () => {
    if (this.length > 0) {
      this._container = [];
    }
  };
  toArray = () => this._container;
  get length() {
    return this._container.length;
  }
  get lastIndex() {
    return this.length > 0 ? this.length - 1 : 0;
  }
}
