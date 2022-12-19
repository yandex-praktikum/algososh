import { ElementStates } from "../../types/element-states";

export interface IStackItem {
  item: string;
  state: ElementStates;
}

export class Stack<T = {}> {
  private _items: T[] | any = [];

  private get _size() {
    return this._items.length;
  }

  public get elements() {
    return [...this._items];
  }

  public push(item: T): void {
    this._items.push(item);
  }

  public pop() {
    if (this._size === 0) return;
    return this._items.pop();
  }

  public clear(): void {
    this._items = [];
  }

  public setAllCirclesDefault() {
    this._items = this._items.map((element: T) => {
      return { ...element, state: ElementStates.Default };
    });
  }

  public setLastElementChanging() {
    return (this._items[this._items.length - 1].state = ElementStates.Changing);
  }
}
