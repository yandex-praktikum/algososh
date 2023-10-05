interface IQueue<T> {
    enqueue: (item: T) => void,
    dequeue: () => void,
    peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
    constructor(queueLength: number) {
        this.container = Array(queueLength).fill(null);
        this.containerSize = queueLength;  
    }

    head: number = -1;
    tail: number = -1;
    container: Array<T | null>
    containerSize: number;

    enqueue = (item: T): void => {
        if (this.tail === this.containerSize - 1 && this.head === 0 || this.head - this.tail === 1) {
            throw new Error('The queue is full. Release the place first, to add new element')
        }
        if (this.tail === this.containerSize - 1 && this.head > 0) {
            this.container[0] = item;
            this.tail = 0;
        } else {
            this.tail++;
            this.container[this.tail] = item;
            this.head = this.head === -1 ? 0 : this.head;
        }
    };

    dequeue = (): void => {
        if (this.head < 0) {
            throw new Error('The queue is empty. Add element first, to dequeu it')
        }
        if (this.head === this.tail) {
            this.container[this.head] = null;
            this.head = -1;
            this.tail = -1;
            return;
        }
        if (this.head === this.containerSize - 1) {
            this.container[this.head] = null;
            this.head = 0;
            return;
        }
        this.container[this.head] = null;
        this.head++;
    }

    peak = (): T | null => {
        return this.container[this.head] || null;  
    }
}