interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
    print: () => (T | null)[];
}

export class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size).fill('');
    }

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }
        this.container[this.tail % this.size] = item;
        this.length++;
        if (this.tail < this.size - 1) {
            this.tail++;
        } else {
            this.tail = 0;
        }
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        delete this.container[this.head % this.size];
        this.length--;
        if (this.head < this.size - 1) {
            this.head++;
        } else {
            this.head = 0;
        }
    };

    peak = (): T | null => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        return this.container[this.head % this.size]; // Ваш код
    };

    isEmpty = () => this.length === 0;

    print = (): (T | null)[] => {
        return this.container.map((element) => {
            return element
        })
    };
}