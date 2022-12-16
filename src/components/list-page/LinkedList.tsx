import { ILinkedList } from "./linkedList.types";

export class LinkedListNode {
  //здесь хранится значение связанного списка
  value: string;
  //здесь хранится ссылка на следующий элемент
  next: LinkedListNode | null;

  constructor(value: string, next?: LinkedListNode | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList implements ILinkedList {
  public items: LinkedListNode[] = [];
  private _headElement: LinkedListNode | null;

  private _head: number = 0;
  private _tail: number = 0;
  private _size: number;

  constructor(initialArray: string[]) {
    this._size = 0;
    this._headElement = null;
    initialArray.forEach((element) => this.prepend(element));
  }

  public get elements() {
    return [...this.items];
  }

  public get arrayedlistOfElements() {
    return this.toArray() as string[];
  }

  public get headElement() {
    return this.arrayedlistOfElements[0];
  }

  public get tailElement() {
    return this.arrayedlistOfElements[this.arrayedlistOfElements.length - 1];
  }

  public elementByIndex = (index: number) => {
    return this.arrayedlistOfElements[index];
  };

  public prepend = (element: string) => {
    const node = new LinkedListNode(element, this._headElement);
    this._headElement = node;

    this._size++;
  };

  public append = (element: string) => {
    const node = new LinkedListNode(element);
    let current;

    if (this._headElement === null) {
      this._headElement = node;
    } else {
      current = this._headElement;

      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this._size++;
  };

  public addByIndex = (element: string, index: number) => {
    if (index < 0 || index > this._size) {
      return null;
    } else {
      const newNode = new LinkedListNode(element);
      if (index === 0) {
        newNode.next = this._headElement;
        this._headElement = newNode;
      } else {
        let curr: any = this._headElement;
        let currIndex = 0;
        let prev = null;

        while (currIndex < index) {
          prev = curr;
          curr = curr.next;
          currIndex++;
        }
        newNode.next = curr;
        prev.next = newNode;
      }
      this._size++;
    }
  };

  private _getByIndex(index: number) {
    let counter = 0;
    let node = this._headElement;

    while (node) {
      if (counter === index) {
        return node;
      }
      counter++;
      node = node.next;
    }
    return null;
  }

  public deleteByIndex = (index: number) => {
    if (!this._headElement) {
      return null;
    }

    if (index === 0) {
      this._headElement = this._headElement.next;
      return;
    }

    const prev = this._getByIndex(index - 1);

    if (!prev || !prev.next) {
      return;
    }
    prev.next = prev.next.next;
  };

  public toArray = () => {
    let curr = this._headElement;
    let arr = [];

    while (curr) {
      arr.push(curr?.value);
      curr = curr?.next;
    }

    return arr;
  };

  public deleteHead = () => {
    if (!this._headElement) {
      return null;
    } else {
      this._headElement = this._headElement.next;
    }
  };

  public deleteTail = () => {
    if (!this._headElement) {
      return null;
    }

    if (!this._headElement.next) {
      this._headElement = null;
    }

    let prev = this._headElement;
    let node = this._headElement?.next;

    while (node?.next) {
      prev = node;
      node = node.next;
    }
    prev!.next = null;
  };
}
