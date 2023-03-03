interface ILinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
}

class LinkedListNode<T> implements ILinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;

  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  prepend: (node: T) => void;
  append: (node: T) => void;
  addByIndex: (node: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  listToArray: () => T[];
  listLength: number;
}

export class LinkedList<T> implements ILinkedList<T> {
  private _head: LinkedListNode<T> | null;
  private _tail: LinkedListNode<T> | null;
  private _length: number;

  constructor(initialArray?: T[]) {
    this._head = null;
    this._tail = null;
    this._length = 0;

    if (initialArray && initialArray.length > 0) {
      this._defaultArray(initialArray);
    }
  }

  protected _defaultArray(initialArray: T[]) {
    initialArray.forEach((item) => {
      this.append(item);
    });
  }

  protected _clearList() {
    this._head = null;
    this._tail = null;
    this._length = 0;
  }

  protected _listIsEmpty() {
    return this._length === 0;
  }

  prepend(node: T) {
    const newNode = new LinkedListNode(node);

    if (this._listIsEmpty()) {
      this._head = newNode;
      this._tail = newNode;
      this._length++;
    } else {
      if (this._head) {
        newNode.next = this._head;
        this._head = newNode;
        this._length++;
      }
    }
  }

  append(node: T) {
    const newNode = new LinkedListNode(node);

    if (this._listIsEmpty()) {
      this._head = newNode;
      this._tail = newNode;
      this._length++;
    } else {
      if (this._tail) {
        this._tail.next = newNode;
      }
      this._tail = newNode;
      this._length++;
    }
  }

  addByIndex(node: T, index: number) {
    const newNode = new LinkedListNode(node);
    if (index === 0) {
      if (this._length === 1) {
        this._tail = this._head;
      }
      newNode.next = this._head;
      this._head = newNode;
      this._length++;
      return;
    }

    let prevNode = this._head;
    let currentNode = this._head;
    let i = 0;

    while (i !== index) {
      if (currentNode && currentNode.next) {
        prevNode = currentNode;
        currentNode = currentNode.next;
      }

      i++;
    }
    if (prevNode) {
      prevNode.next = newNode;
    }
    newNode.next = currentNode;
    this._length++;
  }

  deleteByIndex(index: number) {
    if (this._length === 1 && index === 0) {
      this._clearList();
      return;
    }

    let prevNode = this._head;
    let currentNode = this._head;
    let i = 0;

    while (i !== index) {
      if (currentNode && currentNode.next) {
        prevNode = currentNode;
        currentNode = currentNode.next;
      }
      i++;
    }

    if (prevNode && currentNode) {
      if (currentNode === this._head) {
        this._head = this._head.next;
      } else if (currentNode === this._tail) {
        prevNode.next = null;
        this._tail = prevNode;
      } else {
        prevNode.next = currentNode.next;
      }
    }
    this._length--;
  }

  deleteHead() {
    if (this._length < 2) {
      this._clearList();
    } else {
      if (this._head && this._head.next) {
        this._head = this._head.next;
        this._length--;
      }
    }
  }

  deleteTail() {
    if (this._length === 1) {
      this._clearList();
    } else {
      let currentNode = this._head;
      let i = 1;

      if (currentNode) {
        while (i !== this._length - 1) {
          if (currentNode.next) {
            currentNode = currentNode.next;
          }
          i++;
        }
        this._tail = currentNode;
        this._tail.next = null;
        this._length--;
      }
    }
  }

  listToArray() {
    let res: T[] = [];
    let current = this._head;
    if (current) {
      while (current.next) {
        res.push(current.value);
        current = current.next;
      }
      res.push(current.value);
    }
    return res;
  }

  get listLength() {
    return this._length;
  }
}
