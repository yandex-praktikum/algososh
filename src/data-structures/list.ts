import {ElementStates} from "../types/element-states";


export class LinkedListNode<T> {
    value: T
    next: LinkedListNode<T> | null
    constructor(value: T, next?: LinkedListNode<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    };
};

interface ILinkedList<T> {
    append: (element: T) => void;
    toArray: () => T[];
    prepend: (element: T) => void;
    deleteHead: () => void;
    deleteTail: () => void;
    addByIndex: (element: T, index: number) => void;
    get: (index: number) => void;
    deleteByIndex: (index: number) => void;
    getArrWithColor: () => Array<{value: T, color: ElementStates}>;
};
export class LinkedList<T> implements ILinkedList<T> {
    private head: LinkedListNode<T> | null;
    private tail: LinkedListNode<T> | null;
    private length: number;
    private appendFromArray(values: T[]) {
        values.forEach((value) => this.append(value));
    };
    constructor(elements: T[]) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        if (elements?.length) {
            this.appendFromArray(elements);
        };
    };
    append(element: T) {
        const newNode = new LinkedListNode(element)
        if (!this.head || !this.tail) {
            this.head = newNode;
            this.tail = newNode;
            this.length++
            return this;
        };
        this.tail.next = newNode;
        this.tail = newNode
        this.length++
    };
    prepend(element: T) {
        const newNode = new LinkedListNode(element)
        if (!this.head || !this.tail) {
            this.head = newNode;
            this.tail = newNode;
            this.length++
            return this;
        };
        const currentNode = this.head;
        this.head = newNode;
        this.head.next = currentNode;
        this.length++
    };
    deleteHead() {
        if (!this.head) return null;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
            this.length = 0;
            return;
        };
        const currentHead = this.head;
        const newHead = currentHead.next;
        this.head = newHead;
        this.length--;
    };
    deleteTail() {
        if (!this.tail) return;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
            this.length = 0;
            return;
        };
        let current = this.head;
        let newTail = null;
        while (current) {
            if (current.next) {
                newTail = current;
            };
            current = current.next;
        };
        this.tail = newTail;
        this.tail!.next = null;
        this.length--;
    };
    get(index: number) {
        if (index < 0 || index >= this.length) return null;
        let counter = 0;
        let curr = this.head;
        while (counter !== index && curr) {
            curr = curr?.next;
            counter++
        }
        return curr;
    }

    addByIndex(element: T, index: number) {
        const newNode = new LinkedListNode(element)
        if (index === 0) {
            newNode.next = this.head;
            this.head = newNode;
            this.length++
        };
        let prev = this.get(index - 1);
        if (prev?.next) {
            let temp = prev?.next;
            prev!.next = newNode;
            newNode!.next = temp;
            this.length++
        };
        return
    };
    deleteByIndex(index: number) {
        if (index === 0) return this.deleteHead();
        if (index === this.length - 1) return this.deleteTail();
        let prev = this.get(index - 1);
        if (prev?.next) {
            let deletedNode = prev?.next;
            prev.next = deletedNode?.next;
            this.length--
            return deletedNode;
        };
    };
    get listLength() {
        return this.length;
    };
    toArray() {
        let curr = this.head;
        const res = [];

        while (curr) {
            res.push(curr.value);
            curr = curr.next;
        };
        return [...res];
    };
    getArrWithColor() {
        return this.toArray().map(item => ({ value: item, color: ElementStates.Default }));
    };
};