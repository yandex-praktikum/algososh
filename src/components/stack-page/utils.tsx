interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    getElements: () => (T | null)[];
    clear: () => void;
}

export default class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container.push(item);
    };

    pop = (): void => {
        if (this.container.length !== 0) {
            this.container.pop();
        }
    };

    getElements = (): T[] => {
        const arr = [];
        for (let i = 0; i < this.container.length; i++) {
            arr.push(this.container[i]);
        }
        return arr;
    };

    clear = () => {
        this.container = [];
    };
}
