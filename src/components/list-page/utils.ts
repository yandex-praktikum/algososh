import { TLinkedList } from "../../types/list";

class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next: Node<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

export class LinkedList<T> implements TLinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  constructor(initArr: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    initArr.forEach((element) => this.append(element));
  }

  prepend(value: T) {
    const newNode = new Node(value, this.head);
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    this.size++;
  }

  append(value: T) {
    const newNode = new Node(value);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    this.size++;
  }

  removeHead() {
    if (!this.head) {
      return null;
    }
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.size--;
  }

  removeTail() {
    if (!this.tail) {
      return null;
    }
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    }
    let currentNode = this.head;
    while (currentNode?.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }
    this.tail = currentNode;
    this.size--;
  }

  insertAt(value: T, index: number) {
    if (index < 0 || index > this.size) {
      return;
    } else {
      const newNode = new Node(value);
      if (index === 0) {
        newNode.next = this.head;
        this.head = newNode;
      } else if (index === this.size) {
        if (!this.head || !this.tail) {
          this.head = newNode;
          this.tail = newNode;
        } else {
          this.tail.next = newNode;
          this.tail = newNode;
        }
      } else {
        let curr: Node<T> | null = this.head;
        let currIndex = 0;
        while (currIndex < index - 1) {
          if (curr) {
            curr = curr.next;
            currIndex++;
          }
        }
        if (curr) {
          newNode.next = curr.next;
          curr.next = newNode;
        }
      }
      this.size++;
    }
  }

  removeAt(index: number) {
    if (index < 0 || index > this.size) {
      return;
    } else {
      if (index === 0) {
        if (!this.head) {
          return;
        }
        if (this.head.next) {
          this.head = this.head.next;
        } else {
          this.head = null;
          this.tail = null;
        }
        this.size--;
      } else if (index === this.size - 1) {
        this.removeTail();
      } else {
        let curr: Node<T> | null = this.head;
        let currIndex = 0;
        while (currIndex < index - 1) {
          if (curr) {
            curr = curr.next;
            currIndex++;
          }
        }
        if (curr && curr.next) {
          curr.next = curr.next.next;
          this.size--;
        }
      }
    }
  }

  getItems() {
    const nodeValues = [];
    let currentNode = this.head;
    while (currentNode) {
      nodeValues.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return nodeValues;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
}
