interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | '';
    print: () => (T | '')[];
    clear: (size: number) => void;
    showEdges: () => number[];
}

export class Queue<T> implements IQueue<T> {
    private container: (T | '')[] = [];
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
        }
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        this.container[this.head % this.size] = '';
        this.length--;
        if (this.head < this.size - 1) {
            this.head++;
        }
    };

    peak = (): T | '' => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        return this.container[this.head % this.size];
    };

    isEmpty = () => this.container.every((el) => {
        return el === ''
    });

    print = (): (T | '')[] => {
        return this.container.map((element) => {
            return element
        })
    };

    clear = (size: number): void => {
        this.head = 0;
        this.tail = 0;
        this.container = Array(size).fill('');
    }

    showEdges = (): number[] => {
        return [this.head, this.tail]
    }
}