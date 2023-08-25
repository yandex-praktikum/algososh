class LNode<T> {
    next: LNode<T> | null
    prev: LNode<T> | null
    value: T

    constructor(value: T) {
        this.next = null;
        this.prev = null;
        this.value = value;
    }
}

interface ILinkedList<T> {
    push: (value: T) => LinkedList<T>;
    pop: () => void;
    shift: () => void;
    unshift: (value: T) => void;
    insertAt: (value: T, index: number) => void;
    removeAt: (index: number) => void;
    getSize: () => number;
    getList: () => T[];
}

export class LinkedList<T> implements ILinkedList<T> {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    head: LNode<T> | null;
    tail: LNode<T> | null;
    size: number;

    push(value: T) {
        const node = new LNode<T>(value);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        }
        else {
            node.prev = this.tail;
            if (this.tail && this.tail) {
                this.tail.next = node;
                this.tail = node;
            }

        }
        this.size++;
        return this;
    }

    pop() {
        if (this.size === 0) throw new Error('The list is empty. Add element first before remove it');
        if (this.size === 1) {
            this.head = null;
            this.tail = null;
        }
        else {
            if (this.tail && this.tail.prev) {
                this.tail.prev.next = null;
                this.tail = this.tail.prev;
            }
        }
        this.size--;
    }

    unshift(value: T) {
        const node = new LNode<T>(value);
        if (this.size === 0) {
            this.head = node;
            this.tail = node;
        }
        else {
            if (this.head) {
                this.head.prev = node;
                node.next = this.head;
                this.head = node;
            }
        }
        this.size++;
    }

    shift() {
        if (this.size === 0) throw new Error('The list is empty. Add element first before remove it');
        if (this.size === 1) {
            this.head = null;
            this.tail = null;
        }
        else {
            if (this.head && this.head.next) {
                this.head.next.prev = null;
                this.head = this.head.next;
            }
        }
        this.size--;
    }

    insertAt(value: T, index: number) {
        if (index > this.size || index < 0) {
            throw new Error('index is out of list size')
        }
        if (index === 0) {
            this.unshift(value);
            return;
        }
        if (index > this.size - 1) {
            this.push(value);
            return;
        }
        const node = new LNode<T>(value);
        let current: LNode<T> | null = this?.head?.next || null;
        let prev: LNode<T> | null = this.head;

        for (let i = 1; i <= index; i++) {

            if (i === index && prev?.next && current) {
                prev.next = node;
                node.prev = prev;
                node.next = current;
                current.prev = node;
            }
            else if (current?.next) {
                prev = current;
                current = current.next;
            }
        }
        this.size++;
    }

    removeAt(index: number) {
        if (index > this.size - 1 || index < 0 || !this.head) {
            throw new Error('index is out of list size')
        }
        if (index === 0) {
            this.shift();
            return;
        }
        if (index === this.size - 1) {
            this.pop();
            return;
        }

        let current = this.head.next;
        let prev = this.head;

        for (let i = 1; i <= index; i++) {
            if (i === index) {
                if (prev && current && current.next) {
                    prev.next = current.next;
                    current.next.prev = prev;
                }
            }
            else if (current?.next) {
                prev = current;
                current = current.next;
            }
        }
        this.size--;
    }

    getSize() {
        return this.size;
    }

    getList() {
        let valueArr: T[] = [];
        let current = this.head;
        while (current) {
            valueArr.push(current.value);
            current = current.next;
        }
        return valueArr;
    }
}