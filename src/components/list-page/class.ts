import { TLinkedList } from "../../types/types";

export class Node<T> {
    item: T;
    next: Node<T> | null = null;
  
    constructor(item: T, next?: Node<T> | null) {
      this.item = item;
      this.next = next === undefined ? null : next;
    }
  }
  
  export class LinkedList<T> implements TLinkedList<T> {
    private head: Node<T> | null;
    private size: number;
    private tail: Node<T> | null;
  
    constructor(initState?: T[]) {
      this.size = 0;
      this.head = null;
      this.tail = null;
      initState?.forEach((elem, index) => {
        this.insertAt(elem, index);
      });
    }
    //вставить в конец списка
    append(value: T): Node<T> {
      const node: Node<T> = new Node<T>(value);
  
      if (!this.size) {
        this.head = node;
      } else {
        if (this.tail) this.tail.next = node;
      }
  
      this.tail = node;
      this.size++;
  
      return node;
    }
    //вставить в начало списка
    prepend(value: T): Node<T> {
      const node: Node<T> = new Node<T>(value);
  
      if (!this.size) {
        this.tail = node;
      } else {
        node.next = this.head;
      }
  
      this.head = node;
      this.size++;
  
      return node;
    }
    //вставить в список
    insertAt(value: T, index: number): Node<T> | null {
      if (!index) return this.prepend(value);
      if (index === this.size) return this.append(value);
      if (index < 0 || index > this.size) {
        console.error(`There is no index '${index}' in LinkedList`);
        return null;
      }
  
      const newNode: Node<T> = new Node(value);
      const temp: Node<T> | null = this.get(index - 1);
  
      if (temp) {
        newNode.next = temp.next;
        temp.next = newNode;
        this.size++;
        return newNode;
      }
      return null;
    }
    //удаление из списка
    deleteNode(index: number) {
      if (index < 0 || index > this.size) {
        console.log('Enter a valid index');
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
  
        if (prev && curr) {
          prev.next = curr.next;
        }
      }
  
      this.size--;
      return curr ? curr.item : null;
    }
    //размер списка
    getSize() {
      return this.size;
    }
    // получить весь список 
    toArray = (): T[] => {
      const result: T[] = [];
      let node = this.head;
      while (node) {
        result.push(node.item);
        node = node.next;
      }
      return result;
    };
    //получить 1 элемент по индексу
    get(index: number): Node<T> | null {
      if (index < 0 || index >= this.size) return null;
  
      let node: Node<T> | null = this.head;
  
      for (let i = 0; i < index; i++) {
        if (node) node = node.next;
      }
  
      return node;
    }
  }