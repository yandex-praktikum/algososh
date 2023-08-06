import { ElementStates } from "../../types/element-states";

export class LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null;
    constructor(value: T, next?: LinkedListNode<T> | null) {
        this.value = value;
        this.next = next === undefined ? null : next;
    }
}

interface ILinkedList<T> {
    pushBack: (element: T) => void;
    pushFront: (element: T) => void;

    deleteHead: () => void;
    deleteTail: () => void;

    addByIndex: (element: T, index: number) => void;
    getByIndex: (index: number) => LinkedListNode<T> | null;
    deleteByIndex: (index: number) => void;

    getArrWithColor: () => Array<{ value: T; color: ElementStates }>;
    toArray: () => T[];

    size(): number;
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: LinkedListNode<T> | null;
    private tail: LinkedListNode<T> | null;
    private length: number;

    constructor(elements: T[]) {
        this.head = null;
        this.tail = null;
        this.length = 0;

        if (elements?.length) {
            elements.forEach((element) => this.pushBack(element));
        }
    }

    size() {
        return this.length;
    }

    pushBack(element: T) {
        const node = new LinkedListNode(element);

        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
            this.length++;
            return this;
        }

        this.tail.next = node;
        this.tail = node;
        this.length++;
    }

    pushFront(element: T) {
        const node = new LinkedListNode(element);

        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
            this.length++;
            return this;
        }

        const current = this.head;
        this.head = node;
        this.head.next = current;
        this.length++;
    }

    deleteHead() {
        if (!this.head) {
            return;
        }
        if (this.head === this.tail) {
            this.tail = null;
        }
        this.head = this.head.next;
        this.length--;
    }

    deleteTail() {
        if (!this.tail) {
            return;
        }
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            this.length = 0;
            return;
        }

        let current = this.head;
        let newTail = this.head;
        while (current) {
            if (current.next) {
                newTail = current;
            }
            current = current.next;
        }
        this.tail = newTail;
        this.tail!.next = null;
        this.length--;
    }

    addByIndex(element: T, index: number) {
        switch (index) {
            case 0:
                this.pushFront(element);
                break;
            case this.length:
                this.pushBack(element);
                break;
            default: {
                const node = new LinkedListNode(element);
                const prev = this.getByIndex(index - 1);
                node.next = prev!.next;
                prev!.next = node;
                this.length++;
            }
        }
    }

    getByIndex(index: number) {
        if (index < 0 || index >= this.length) {
            return null;
        }
        let counter = 0;
        let curr = this.head;
        while (counter !== index && curr) {
            curr = curr?.next;
            counter++;
        }
        return curr;
    }

    deleteByIndex(index: number) {
        switch (index) {
            case 0:
                return this.deleteHead();
            case this.length - 1:
                return this.deleteTail();
            default: {
                let prev = this.getByIndex(index - 1);
                let deletedNode = prev!.next;
                prev!.next = deletedNode!.next;
                this.length--;
                return deletedNode;
            }
        }
    }

    getArrWithColor() {
        return this.toArray().map((item) => ({
            value: item,
            color: ElementStates.Default,
        }));
    }

    toArray() {
        let curr = this.head;
        const res = [];

        while (curr) {
            res.push(curr.value);
            curr = curr.next;
        }
        return [...res];
    }
}
