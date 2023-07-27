interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peek: () => T | null;
    getHead: () => number;
    getUnsafeHead: () => number;
    getTail: () => number;
    clear: () => void;
    isEmpty: () => boolean;
    getSize: () => number;
    getCountElement: () => number;
    toArray: () => Array<T | null>;
}

export class Queue<T> implements IQueue<T> {
    [x: string]: any;
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = new Array(size);
    }

    enqueue(item: T) {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }

        if (this.getTail() >= this.size) {
            return this.container;
        }

        if (this.length <= this.size) {
            this.length++;
            this.tail++;

            this.container[this.getTail() % this.size] = item;
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }

        if (this.length <= this.size) {
            this.container[this.head % this.size] = null;
            this.head++;
            this.length--;
        }
    }

    peek(): T | null {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }

        return this.container[this.head % this.size];
    }

    getUnsafeHead() {
        return this.head % this.size;
    }

    getHead() {
        return this.isEmpty() ? -1 : this.head % this.size;
    }

    getTail() {
        return this.isEmpty() ? -1 : Math.max(this.tail - 1, 0) % this.size;
    }

    clear() {
        this.head = 0;
        this.tail = 0;
        this.length = 0;
        this.container = new Array(this.size);
    }

    isEmpty() {
        return this.length === 0;
    }

    toArray() {
        return [...this.container];
    }

    getCountElement() {
        return this.length;
    }

    getSize() {
        return this.container.length;
    }
}
