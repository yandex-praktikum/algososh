import { TNode } from "../components/queue-page/queue-page";
import { ElementStates } from "../types/element-states";
import Stack from "./stack";

export class Node<T> {
    value: T | null;
    color: ElementStates
    next: Node<T> | null
    prev: Node<T> | null
    constructor(value: T | null = null, next?: Node<T>, prev?: Node<T> | null, color = ElementStates.Default,) {
        this.value = value;
        this.color = color;
        this.next = (next === undefined) ? null : next;
        this.prev = (prev === undefined) ? null : prev;
    }


}
export type TQueue<T> = {
    /* push: (element: T) => void; */
    createList: () => void
}
export class Queue<T> implements TQueue<T> {
    head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;
    length: number

    constructor(length: number) {
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
        if (!this.size && this.head) {
            this.head.value = element;
            this.head.color = ElementStates.Changing;
            this.size++;
        } else if (this.head) {
            let current = this.head;
            while (this.length !== this.size) {
                console.log('tyt1');
                if (current.value && current.next) {
                    current = current.next;

                } else {
                    current.value = element;
                    current.color = ElementStates.Changing
                    this.size++;
                    break
                }
            }
        }

    }
    pop() {
        if (this.head && this.head.value) {
            console.log('pop', this.head.value);
            this.head.value = null
            //передвинуть head
        }
    }
    createArr() {
        let arr: { value: string, color: ElementStates }[] = [];
        function recusia(node: any) {
            let current = node;
            if (!current.next) {
                console.log('color', current.color);

                arr.push({ value: current.value, color: current.color })
                console.log(arr);
                return arr
            }
            arr.push({ value: current.value, color: current.color })
            current = current.next;
            recusia(current)
        }
        if (this.head) {
            recusia(this.head)
        }
        return arr
    }


}