import { ElementStates } from "../types/element-states";
import { Queue } from "./queue";

export class Node<T> {
    value: T | null;
    color: ElementStates;
    isHead: boolean;
    isTail: boolean;
    next: Node<T> | null;
    prev: Node<T> | null;
    constructor(value: T | null = null, next?: Node<T>, prev?: Node<T> | null, color = ElementStates.Default,) {
        this.value = value;
        this.color = color;
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
    private size: number;

    constructor() {
        this.list = null
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.createList()
    }

    createList() {
        console.log('create');

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
            }
            console.log(this.head);

        }

    }
    /* createArr() {
        let arr: { value: string, color: ElementStates, isHead: boolean, isTail: boolean }[] = [];
        function recursion(node: Node<string> | null) {
            console.log('rec1', node);
            let current = node;
            if (current?.prev) {
                current = current.prev;
            } else {
                if (current?.next) {
                    const elemetn = {
                        value: current.value || '',
                        color: current.color,
                        isHead: current.isHead,
                        isTail: current.isTail,
                    }
                    if (!current.next) {
                        console.log('color', current.color);

                        arr.push(elemetn)
                        console.log(arr);
                        return arr
                    }
                    arr.push(elemetn)
                    current = current.next;
                    recursion(current)
                }
            }


        }       
        if (this.list) {
            recursion(this.list)
        }
        return arr
    } */
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
            console.log('2');
            let current = this.tail;
            current.isTail = false
            current.next = new Node(element);
            this.tail = current.next;
            current.next.isTail = true;
            current.next.prev = current;
            /* current.color = ElementStates.Default */
            this.size++;
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
        console.log('unshift');

        if (this.head) {
            let temp = this.head;
            let current = new Node<string>(element);
            current.next = temp;
            current.isHead = true;
            current.next.isHead = false;
            this.head = current;
            this.list = current;
            this.size++;
        }
    }

    shift() {
        if(this.head?.next) {
            let current = this.head.next;
            current.prev = null;
            this.head = current;
            this.list = current;
        }
    }

    getTail() {
        if (this.tail) {
            return this.tail.value
        }
        return undefined;
    }

    getHead() {
        if(this.head) {
            return this.head.value
        }
        return undefined
    }




}

