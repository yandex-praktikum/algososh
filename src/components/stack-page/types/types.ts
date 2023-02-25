interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getSize: () => number;
    print: () => T[] | null;
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container.push(item);
    };

    pop = (): void => {
        if (this.container) {
            this.container.pop();
        }
    };

    peak = (): T | null => {
        if (this.container) {
            return this.container[this.container.length - 1]
        }
        return null;
    };

    print = (): T[] | null => {
        if (this.container) {
            return this.container.map((element, idx) => {
                return element;
            });
        }
        return null;
    };

    getSize = () => this.container.length;
}