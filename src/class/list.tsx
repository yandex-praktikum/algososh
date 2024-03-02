import { ElementStates } from "../types/element-states";
import { Queue } from "./queue";

export class Node<T> {
    value: T | null;
    color: ElementStates;
    index: number;
    isHead: boolean;
    isTail: boolean;
    next: Node<T> | null;
    prev: Node<T> | null;
    constructor(value: T | null = null,
        next?: Node<T>,
        index = 0,
        prev?: Node<T> | null,
        color = ElementStates.Default,) {
        this.value = value;
        this.color = color;
        this.index = index;
        this.isHead = false;
        this.isTail = false;
        this.next = (next === undefined) ? null : next;
        this.prev = (prev === undefined) ? null : prev;
    }


}

export class List<T extends string>  {
    list: Node<string> | null;
    head: Node<string> | null;
    protected tail: Node<string> | null;
    private index: number;
    size: number;
    constructor() {
        this.list = null
        this.head = null;
        this.tail = null;
        this.index = 0;
        this.size = 0;
        this.createList()
    }

    createList() {
        const lengthArray = Math.floor(Math.random() * (4 - 3)) + 3;
        let arr: string[] = [];
        for (let i = 0; i <= lengthArray; i++) {
            const elemArr = Math.floor(Math.random() * 100)
            arr.push(`${elemArr}`)
        }
        for (let i = 0; i < arr.length; i++) {
            const node = new Node<string>(arr[i]);
            if (!this.head) {
                this.list = node;
                this.head = node;
                this.head.isHead = true;
                this.list.isTail = false;
            } else {
                let current = this.head;
                while (current.next) {
                    current = current.next;
                }
                current.isTail = false;
                current.next = node;
                current.next.prev = current;
                this.tail = node;
                this.tail.isTail = true;
                current.index = this.size;
                this.size++;

            }
        }
    }

    createArr() {
        let arr: { value: string, color: ElementStates, isHead: boolean, isTail: boolean }[] = [];
        function recursion(node: Node<string> | null) {
            if (node) {
                const element = {
                    value: node.value || '',
                    color: node.color,
                    isHead: node.isHead,
                    isTail: node.isTail,
                };
                arr.push(element);
                if (node.next) {
                    recursion(node.next);
                }
            }
        }

        if (this.list) {
            recursion(this.list);
        }

        return arr;
    }

    push(element: T) {
        if (this.tail && this.list) {
            let current = this.tail;
            current.isTail = false
            current.next = new Node(element);
            this.tail = current.next;
            current.next.isTail = true;
            current.next.prev = current;
            this.index++;
        }
    }

    pop() {
        if (this.tail?.prev) {
            let current = this.tail.prev;
            current.next = null;
            this.tail = current;
            current.isTail = true;
        }
    }

    unshift(element: T) {
        if (this.head) {
            let temp = this.head;
            let current = new Node<string>(element);
            current.next = temp;
            current.next.prev = current;
            current.isHead = true;
            current.next.isHead = false;
            this.head = current;
            this.list = current;
        }
    }

    shift() {
        if (this.head?.next) {
            let current = this.head.next;
            current.prev = null;
            current.isHead = true;
            this.head = current;
            this.list = current;
        }
    }

    insert(id: string, element: T) {
        const newElement = new Node<string>(element);
        let current = this.head;
        let index = 0;
        if (current) {
            while (current && index !== +id) {
                current = current.next;
                index++;
            }
            if (current && current.prev) {
                const temp = current.prev;
                if (temp) {
                    temp.next = newElement;
                    newElement.prev = temp;
                    newElement.next = current;
                    current.prev = newElement;
                    this.list = this.head;
                }
            } else if (current && !current.prev) {

                this.unshift(element)
            } else if (current && !current.next) {
                this.push(element)
            }
        }
    }

    delElementId(id: number) {
        let current = this.head;
        let index = 0;
        if (current) {
            while (current && index !== +id) {
                current = current.next;
                index++;
            }
            if (current && current.prev && current.next) {
                current.prev.next = current.next;
                current.next.prev = current.prev;
            }
            if (current && !current.next) {
                this.pop()
            }
            if (current && !current.prev) {
                this.shift()
            }
        }
    }


    getTail() {
        if (this.tail) {
            return this.tail.value
        }
        return undefined;
    }

    getHead() {
        if (this.head) {
            return this.head.value
        }
        return undefined
    }

    getElement(id: number) {
        let current = this.list;
        let index = 0;
        if (current) {
            while (index !== id && current) {
                current = current.next;
                index++;
            }
            return current;
        }
    }






}

