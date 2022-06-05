export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export interface ILinkedList<T> {
  addToTail: (element: T) => void;
  getNodeByIndex: (index: number) => T | null;
  insertAt: (element: T, index: number) => void;
  getSize: () => number;
  print: () => void;
  removeFromPosition: (index: number) => T | null;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor(initialState?: T[]) {
    this.head = null;
    this.size = 0;
    initialState?.forEach(el => this.insertAt(el, 0))
  }

  addToTail(element: T) {
    let node = new Node(element);

    if (this.size === 0) {
      this.head = node;
    } else {
      let current = this.head;

      while (current && current.next !== null) {
        current = current.next;
      }

      if (current) current.next = new Node(element);
    }

    this.size++;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);

      // добавить элемент в начало списка
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        let prev = null;

        // перебрать элементы в списке до нужной позиции
        while (currIndex < index && curr) {
          prev = curr;
          curr = curr.next;
          currIndex++;
        }

        // добавить элемент
        if (prev) prev.next = node;
        node.next = curr;
      }

      this.size++;
    }
  }

  getSize() {
    return this.size;
  }

  getNodeByIndex(index: number) {
    if (index < 0 || index > this.size) {
      return null;
    }

    let curr = this.head;
    let currIndex = 0;

    while (currIndex < index && curr) {
      curr = curr.next;
      currIndex++;
    }

    return curr ? curr.value : null;
  }

  removeFromPosition(index: number) {
    if (index < 0 || index > this.size) {
      return null;
    }

    let curr = this.head;

    if (index === 0 && curr) {
      this.head = curr.next;
    } else {
      let prev = null;
      let currIndex = 0;

      while (currIndex < index && curr) {
        prev = curr;
        curr = curr.next;
        currIndex++;
      }

      if (prev && curr) prev.next = curr.next;
    }

    this.size--;
    return curr ? curr.value : null;
  }

  print() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}
