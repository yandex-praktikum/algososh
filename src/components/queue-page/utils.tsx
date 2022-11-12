interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peek: () => T | null;
    getHead: () => number;
    getTail: () => number;
    clear: () => void;
    isEmpty: () => boolean;
    getSize: () => number;
    getElements: () => Array<T | null>;
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
        this.container = Array(size);
    };

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }
        if (this.tail > 6) {
            return this.container
        }
        if (this.length < this.size) {
            this.container[this.tail % this.size] = item;
            this.tail++
            this.length++
        }
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        if (this.length < this.size) {
            this.container[this.head % this.size] = null;
            this.head++
            this.length--
        }
    };

    peek = (): T | null => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        return this.container[this.head % this.size]
    };

    getHead = () => {return this.head};

    getTail = () => {return this.tail};

    clear = () => {
        this.head = 0;
        this.tail = 0;
        this.length = 0;
        this.container = [];
    };

    isEmpty = () => this.length === 0;

    getElements = () => {
        return [...this.container]
    };

    getSize = () => this.container.length;
};
