type TNode = {
    value: string;
    next: TNode | null
  }
  class Node implements TNode {
    value: string;
    next: TNode | null
    constructor(value: string, next?: TNode | null) {
      this.value = value;
      this.next = (next === undefined ? null : next);
    }
  }
  
  type TNodeList = {
    head: TNode | null;
    tail: TNode | null;
    length: number;
  }
  
  
  export class NodeList implements TNodeList {
    public head: TNode | null;
    public tail: TNode | null;
    public length: number;
    constructor(elements: string[]) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      if (elements) {
        elements.forEach((el) => {
          this.append(el);
          this.length = elements.length;
        });
      }
    }
  
    public toArray() {
      const nodes = [];
      let currentNode: TNode | null = this.head;
      // Перебираем все узлы и добавляем в массив.
      while (currentNode) {
        nodes.push(currentNode.value);
        currentNode = currentNode.next;
      }
      // Возвращаем массив из всех узлов.
      return nodes;
    }
  
    public prepend(value: string) {
      let node = new Node(value);
      node.next = this.head;
      this.head = node;
      this.length++;
      return this
    }
  
    public append(value: string) {
      const node = new Node(value);
      if (!this.head || !this.tail) {
        this.head = node;
        this.tail = node;
        return this
      }
      this.tail.next = node;
      this.tail = node;
      this.length++;
      return this;
  
    }
  
    public shift() {
      let currentNode: TNode | null = this.head;
      if (currentNode && currentNode.next !== null) {
        this.head = currentNode.next;
      } else {
        this.head = null
      }
      this.length--;
  
      return this
    }
  
    public pop() {
      let currentNode: TNode | null = this.head;
      // если узел единственный и отстутвует ссылка на следующий узел то равняем head с нулем
      if (currentNode && currentNode.next === null) {
        this.head = null
      }
      while (currentNode && currentNode.next) {
        // Если у следующего узла нет следующего узла, значит текущий узел предпоследний.
        if (!currentNode.next.next) {
          // убираем ссылку «next» на последний узел.
          currentNode.next = null;
        } else {
          // Перематываем на один узел вперед.
          currentNode = currentNode.next;
        }
      }
    }
  
    public removeByIndex(index: number | string) {
      index = +index;
      if ((index && index < 0) || (index && index > this.length)) {
        return 'Enter a valid index';
      }
  
      let current: TNode | null = this.head;
  
      if (current && index === 0) {
        this.head = current.next;
      } else {
        let prev = null;
        let count = 0;
  
        while (current && count < index) {
          prev = current;
          current = current.next;
          count++;
        }
        if (current && prev) {
          prev.next = current.next;
        }
      }
  
      this.length--;
      return this;
    }
  
    public insert(index: number | string, value: string) {
      index = +index
      if ((index && index < 0) || (index && index > this.length)) {
        console.log('Введите правильный индекс');
        return;
      } else if (index === this.length) {
        return this.append(value);
      } else {
        const node = new Node(value);
        if (index === 0) {
          node.next = this.head;
          this.head = node;
  
        } else {
          let curr = this.head;
          let currIndex = 0;
          while (curr && currIndex !== index - 1) {
            curr = curr.next
            currIndex++
          }
  
          if (curr && curr.next) {
            node.next = curr.next
            curr.next = node
          }
        }
        this.length++;
      }
    }
  }