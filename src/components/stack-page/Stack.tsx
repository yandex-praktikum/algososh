import { ElementStates } from "../../types/element-states";

interface IStack {
  push: (item: { item: string; state: ElementStates }) => void;
  pop: () => void;
  clear: () => void;
}

export class Stack implements IStack {
  private _items: { item: string; state: ElementStates }[] = [];

  private get _size() {
    return this._items.length;
  }

  public get elements() {
    return [...this._items];
  }

  public push(item: { item: string; state: ElementStates }): void {
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
    this._items = this._items.map((element) => {
      return { ...element, state: ElementStates.Default };
    });
  }

  public setLastElementChanging() {
    return (this._items[this._items.length - 1].state = ElementStates.Changing);
  }
}
