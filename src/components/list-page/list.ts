interface ILinkedList<T> {
  append: (value: T) => void;
  prepend: (value: T) => void;
  getSize: () => number;
  toArray: () => Node<T>[];
  deleteTail: () => void;
  deleteHead: () => void;
  insertAtIndex: (index: number, value: T) => void;
  deleteAtIndex: (index: number) => void;
}
export class Node<T> {
  value: T;
  next: Node<T> | null;

  constructor(value: T, next: Node<T> | null = null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export default class LinkedList<T> implements ILinkedList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  size: number;

  constructor(elements?: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    if (elements) {
      elements.forEach((el) => {
        this.append(el);
        this.size = elements.length;
      });
    }
  }

  append(value: T) {
    const newNode = new Node(value);
    if (!this.head || !this.tail) {
      this.tail = newNode;
      this.head = newNode;
      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    this.size++;
    return this;
  }

  prepend(value: T) {
    const newNode = new Node(value, this.head);
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    this.size++;
    return this;
  }
  getSize() {
    return this.size;
  }
  toArray() {
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }
  deleteTail() {
    if (!this.tail) {
      return null;
    }
    const deletedTail = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return deletedTail;
    }
    let currentNode = this.head;
    while (currentNode && currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }
    this.tail = currentNode;
    return deletedTail;
  }
  deleteHead() {
    if (!this.head) {
      return null;
    }
    const deletedHead = this.head;
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    return deletedHead;
  }
  insertAtIndex(index: number, value: T) {
    if (index < 0 || index > this.size) {
      return;
    }
    if (index === 0) {
      return this.prepend(value);
    }
    if (index === this.size) {
      return this.append(value);
    }
    let currentNode = this.head;
    for (let i = 0; i < index - 1; i++) {
      if (!currentNode) {
        throw new Error("Узел не найденвв");
      }
      currentNode = currentNode.next;
    }
    const newNode = new Node(value, currentNode?.next);
    if (!currentNode) {
      throw new Error("Узел не найденвв");
    }
    currentNode.next = newNode;
    this.size++;
    return this;
  }
  deleteAtIndex(index: number) {
    if (index < 0 || index >= this.size) {
      throw new Error("Индекс за пределами допустимого");
    }
    if (index === 0) {
      return this.deleteHead();
    }
    let currentNode = this.head;
    for (let i = 0; i < index - 1; i++) {
      if (!currentNode) {
        throw new Error("Узел не найденвв");
      }
      currentNode = currentNode.next;
    }

    if (!currentNode) {
      throw new Error("Узел не найденвв");
    }
    const deletedNode = currentNode.next;
    if (!deletedNode) {
      throw new Error("Узел не найденвв");
    }
    currentNode.next = deletedNode.next;
    if (index === this.size - 1) {
      this.tail = currentNode;
    }
    this.size--;
    return deletedNode;
  }
}
