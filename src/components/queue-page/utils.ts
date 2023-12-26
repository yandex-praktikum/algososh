import { TQueue } from "../../types/queue";

export class Queue<T> implements TQueue<T> {
    private container: (T | null)[] = [];
    head = -1;
    tail = -1;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size).fill(null);
    }

    enqueue = (item: T) => {

        if (this.head > this.size - 1) {
            this.head = -1;
            this.tail = -1;
            this.length = 0;    
        }

        if ((this.container[this.head] && this.container[this.tail]) || this.tail < 0) {
            if (this.tail < 0 || (this.head === this.tail && !this.container[this.head])) {
                this.head++;
            }

            this.tail++;
            this.length++;
        }

        this.container[this.tail] = item;
    };

    dequeue = () => {

        if (this.head === this.tail && this.getLength > 0) {
            this.container[this.head] = null as T;
            this.head = -1;
            this.tail = -1;
            this.length = 0;
        }

        if (this.head <= this.tail && this.container[this.head]) {
            this.container[this.head] = null as T;

            if (this.head === this.tail && !this.container[this.tail]) {
                this.tail++;
            }
            this.head++;
            this.length--;
        }
    };

    get isEmpty() {
        return this.length === 0
    };

    get getItems() {
        return this.container;
    }

    get getLength() {
        return this.length;
    }

    clear = () => {
        this.container = Array(this.size).fill(null);
        this.head = -1;
        this.tail = -1;
        this.length = 0;
    };
}
