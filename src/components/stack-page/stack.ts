interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    clear: () => void;
    getSize: () => number;
    toArray: () => void;
}

export class Stack<T> implements IStack<T> {
    [x: string]: any;
    private container: T[] = [];

    push(item: T) {
        this.container.push(item);
    }

    pop() {
        this.container.pop();
    }

    clear() {
        this.length = 0;
        this.container = [];
    }

    getSize() {
        return this.container.length;
    }

    toArray() {
        return this.container;
    }
}
