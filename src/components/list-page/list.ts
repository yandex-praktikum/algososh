import { ILinkedList } from "../../types/list";

export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor(initialArray: T[] = []) {
    this.head = null;
    this.size = 0;
    if (initialArray.length) {
      initialArray.forEach((item) => {
        this.append(item);
      });
    }
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);
      let current = this.head;
      if (index === 0) {
        node.next = current;
        this.head = node;
      } else {
        let prevNode = null;
        let currIndex = 0;
        while (currIndex++ < index) {
          prevNode = current;
          if (current) {
            current = current.next;
          }
        }
        node.next = current;
        if (prevNode) {
          prevNode.next = node;
        }
      }
      this.size++;
    }
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      let current = this.head;
      if (index === 0) {
        if (this.head) this.head = this.head?.next;
      } else {
        let prevNode = null;
        let currIndex = 0;
        while (currIndex++ < index) {
          prevNode = current;
          if (current) {
            current = current.next;
          }
        }
        if (prevNode?.next) prevNode.next = current?.next ? current.next : null;
      }
    }
    this.size--;
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
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  deleteHead() {
    if (this.head) this.head = this.head?.next;
    this.size--;
  }

  deleteTail() {
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

  getSize() {
    return this.size;
  }

  toArray() {
    const list: T[] = [];
    let current;
    if (this.head === null) {
      return list;
    } else {
      current = this.head;
      while (current.next) {
        list.push(current.value);
        current = current.next;
      }
      list.push(current.value);
    }
    return list;
  }
}
