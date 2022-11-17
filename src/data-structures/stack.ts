interface IStack<T> {
    clear: () => void;
    getSize: () => number;
    getElements: () => T[]
    pop: () => void;
    push: (item: T) => void;

}
export class Stack<T> implements IStack<T> {
    private container: T[] = [];

    clear = (): void => {
        this.container = [];
    };

    getSize = () => this.container.length;

    getElements = () => this.container;

    pop = (): void => {
        this.container.pop();
    };

    push = (item: T): void => {
        this.container.push(item);
    };
    get peek (): T {
        return this.container[this.container.length - 1];
    };
}
