import { TNode } from "../components/queue-page/queue-page";
import { ElementStates } from "../types/element-states";
import Stack from "./stack";

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
export type TQueue<T> = {
    /* push: (element: T) => void; */
    createList: () => void
}
export class Queue<T> implements TQueue<T> {
    list: Node<T> | null;
    head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;
    length: number

    constructor(length: number) {
        this.list = null
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.length = length;
        this.createList()
    }
    createList() {
        for (let i = 0; i < this.length; i++) {
            const node = new Node<T>();
            if (!this.head) {
                this.list = node;
                this.head = node;
                this.tail = node;
            } else {
                let current = this.head;
                while (current.next) {
                    current = current.next;
                }
                current.next = node;
                current.next.prev = current;
                this.tail = node;

            }
        }
    }
    push(element: T) {
        // нужно двигать tail
        if (!this.size && this.head && this.tail) {
            console.log('1');
            this.head.isHead = true;
            this.head.isTail = true;
            this.head.value = element;
            this.tail = this.head;
            this.head.color = ElementStates.Default;
            this.size++;
        } else if (this.head && this.list) {
            console.log('2');
            let current = this.head;
            while (this.length !== this.size) {
                console.log('3');
                if (current.value && current.next) {
                    current = current.next;
                } else {
                    current.value = element;
                    this.tail = current;
                    this.head.isTail = false;
                    if (current.prev) current.prev.isTail = false;
                    current.isTail = true;
                    current.color = ElementStates.Default
                    this.size++;
                    break
                }
            }
        }

    }
    pop() {
        if (this.head && this.head.value && this.list ) {
            if (this.head && this.head.value) {                
                this.head.value = null;
                this.head.isHead = false;
                if (this.head.next && this.head !== this.tail) {
                    this.head = this.head.next;
                    this.head.isHead = true;
                    this.head.prev = null;
                } else {
                    this.head.isTail = false;
                    this.head = null;
                    this.tail = null;
                    
                }
            }            
        }
    }

    createArr() {
        let arr: { value: string, color: ElementStates, isHead: boolean, isTail: boolean }[] = [];
        function recusia(node: any) {
            let current = node;
            const elemetn = {
                value: current.value,
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
            recusia(current)
        }
        if (this.list) {
            recusia(this.list)
        }
        return arr
    }

    getTail() {
        if (this.list) {
            let current = this.list;
            while (current.next) {
                if(current.isTail) {
                    return current
                }
                current = current.next;
            } 
        }
        return null;
    }

    clear() {
        let current = this.list;
        while(current) {
            current.value = null;
            current.isHead = false;
            current.isTail = false;
            
            current = current.next;
        }
    }


}