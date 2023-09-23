import { ElementStates } from "../../types/element-states";

export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  getSize: () => number;
  printList: () => void;
  delHead: () => void;
  delTail: () => void;
  append: (element: T) => void;
  prepend: (element: T) => void;
  addByIndex: (element: T, position: number) => void;
  delByIndex: (position: number) => void;
}


interface IShiftElement {
	value: string;
	state: ElementStates;
	position: 'add' | 'remove';
}

export interface IListArr {
	value: string,
	state: ElementStates;
	shiftElement: IShiftElement | null;
}

export interface IStateLoader {
	insertInBegin: boolean,
	insertAtEnd: boolean,
	appendByIndex: boolean,
	removeHead: boolean,
	removeTail: boolean,
	removeFrom: boolean
}




export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor(baseArr: T[]) {
    this.head = null;
    this.size = 0;
  }

  append(element: T) {
    const node = new Node(element);
    let temp;
    if (this.head == null) this.head = node;
    else {
      temp = this.head;
      while (temp.next) {
        temp = temp.next;
      }
      temp.next = node;
    }
    this.size++;
  }

  prepend(element: T): void {
    const node = new Node(element, this.head);
    this.head = node;
    this.size++;
  }

  getSize() {
    return this.size;
  }

  printList() {
    let curr = this.head;
    let res = '';
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    //console.log(res);
  }

  delHead() {
    if (this.head) {
      this.head = this.head.next;
      this.size--;
    }
  }

  delTail() {
    let current;
    if (!this.head?.next) {
      this.head = null;
    } else {
      current = this.head;
      while (current.next?.next) {
        current = current.next;
      }
      current.next = null;
    }
    this.size--;
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      return;
    }
    if (!this.head || index <= 0) {
      this.prepend(element);
    }
    else if (index >= (this.size - 1)) {
      this.append(element);
    } else {
      let current = this.head;
      let currentIndex = 0;

      while (currentIndex !== (index - 1) && current.next) {
        current = current.next;
        currentIndex++;
      }

      const node = new Node(element, current.next);
      current.next = node;
      this.size++;
    }
  }

  delByIndex(index: number) {
    if (index < 0 || index > this.size) {
      return;
    }
    let current = this.head;
    if (index === 0) {
      if (this.head) this.head = this.head?.next;
    } else {
      let prev = null;
      let currIndex = 0;
      while (currIndex++ < index) {
        prev = current;
        if (current) {
          current = current.next;
        }
      }
      if (prev?.next) prev.next = current?.next ? current.next : null;
    }
    this.size--;
  }

  array() {
    let curr = this.head;
    let res: T[] = [];
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return res
  }
}