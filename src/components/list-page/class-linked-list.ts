import { ElementStates } from '../../types/element-states';

export interface IElement {
  value: string;
  state: ElementStates;
  state_m: ElementStates;
  position: 'add' | 'remove' | null;
}

class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  popHead: () => void;
  addByIndex: (element: T, index: number) => void;
  delByIndex: (index: number) => void;
  getSize: () => number;
  toArray: () => T[];
  getArrColor: () => {
    value: T;
    state: ElementStates;
    state_m: ElementStates;
    position: 'add' | 'remove' | null;
  }[];
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  private initialLinkedList(values: T[]) {
    values.forEach((value) => this.append(value));
  }

  constructor(elements: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    if (elements.length) {
      this.initialLinkedList(elements);
    }
  }

  append(element: T) {
    const node = new Node(element);
    let current;
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new Node(element);
    if (this.head === null && this.tail === null) {
      this.head = node;
      this.tail = node;
      this.size++;
      return;
    }
    const current = this.head;
    this.head = node;
    this.head.next = current;
    this.size++;
  }

  popHead() {
    if (this.head !== null) {
      let current = this.head.next;
      this.head = current;
      this.size--;
      return;
    } else {
      throw new Error('List is empty');
    }
  }

  popTail() {
    if (this.head === this.tail || this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size = 0;
      return;
    }
    if (this.head !== null) {
      let current = this.head;
      let prev = current;
      while (current.next) {
        prev = current;
        current = current.next;
      }
      prev.next = null;
      this.tail = prev;
      this.size--;
      return;
    } else {
      throw new Error('List is empty');
    }
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      throw new Error('Enter a valid index');
    } else {
      const node = new Node(element);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        let prev = null;

        while (currIndex < index) {
          currIndex++;
          if (curr?.next) {
            prev = curr;
            curr = curr.next;
          }
        }

        if (prev?.next) {
          prev.next = node;
          node.next = curr;
        }
      }

      this.size++;
    }
  }

  delByIndex(index: number) {
    if (index < 0 || index > this.size) {
      throw new Error('Enter a valid index');
    } else {
      if (index === 0) {
        this.popHead();
        return;
      }
      if (index === this.size - 1) {
        this.popTail();
        return;
      }

      let curr = this.head;
      let currIndex = 0;
      let prev = curr;
      while (currIndex < index) {
        if (curr?.next) {
          prev = curr;
          curr = curr.next;
        }
        currIndex++;
      }
      if (prev?.next && curr?.next) {
        prev.next = curr.next;
      }
      this.size--;
    }
  }

  getSize = () => this.size;

  toArray() {
    let curr = this.head;
    let res = [];
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return [...res];
  }

  getArrColor() {
    return this.toArray().map((element) => ({
      value: element,
      state: ElementStates.Default,
      state_m: ElementStates.Changing,
      position: null,
    }));
  }
}
