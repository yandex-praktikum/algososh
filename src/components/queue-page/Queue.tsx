import { ElementStates } from "../../types/element-states";

export class Queue<
  T extends {
    item: string | null;
    state: ElementStates;
    head: string | null;
    tail: string | null;
  }
> {
  private _items: T[] = [];
  private _head: number = -1;
  private _tail: number = -1;
  private _length: number = 0;
  private _size: number = 0;

  constructor(size: number) {
    this._size = size;
    this._items = new Array(size)
      .fill({
        item: null,
        state: ElementStates.Default,
        tail: null,
        head: null,
      })
      .map((obj) => ({ ...obj }));
  }

  public get isEmpty() {
    return this._length === 0;
  }

  public get elements() {
    return [...this._items];
  }

  public enqueue = (item: string) => {
    if (this._tail === this._size) {
      return;
    }

    const enqueued: T = this._items.find(
      (el: T, i: number) => el.item === null && i >= this._head
    )!;
    if (enqueued) {
      enqueued.item = item;
      enqueued.state = ElementStates.Changing;
    }

    const setHead: boolean = this._items.some((el: T) => el.head === "head");
    if (!setHead) {
      enqueued!.head = "head";
    }

    if (
      enqueued &&
      (this._tail + 1 <= this._size ||
        this._tail === this._head ||
        (this._tail > this._head && enqueued?.item !== null))
    ) {
      enqueued.tail = "tail";
    } else {
      return null;
    }

    if (this._tail !== this._size) {
      this._tail === -1 ? (this._tail = this._tail + 2) : this._tail++;
    }
    this._length++;
  };

  public dequeue = () => {
    const top: T = this._items.find((el: T) => el.head === "head")!;
    top!.item = null;
    top!.state = ElementStates.Default;
    top!.head = null;
    top!.tail = null;

    this._head === -1 ? (this._head = this._head + 2) : this._head++;
    this._length--;
  };

  public setNewHead() {
    const newHead = this._items.find(
      (el: T) => el.head !== "head" && el.item !== null
    );
    if (newHead) newHead.head = "head";
  }

  public clearTail() {
    if (this._tail === this._size) {
      return;
    }

    const clearedTail = this._items.find(
      (el: T) => el.tail === "tail" && el.state === "default"
    );

    if (clearedTail) clearedTail.tail = null;
  }

  public clear() {
    this._items.forEach((el: T) => {
      el.item = null;
      el.head = null;
      el.tail = null;
      el.state = ElementStates.Default;
    });
    this._tail = 0;
  }

  public setAllCirclesDefault() {
    this._items = this._items.map((element: T) => {
      return { ...element, state: ElementStates.Default };
    });
  }

  public setCircleChanging() {
    const headEl = this._items.find((el: T) => el.head === "head");
    headEl!.state = ElementStates.Changing;
  }
}
