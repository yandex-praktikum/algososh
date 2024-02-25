import { TElement } from "../components/stack-page/stack-page";
import { ElementStates } from "../types/element-states";


export default class Stack<T> {
    items: T[];
    constructor() {
        this.items = []
    }

    push(value: T) {
        this.items.push(value)
    }

    pop() {
        return this.items.pop()
    }

    top() {
        return this.items[this.items.length - 1]
    }

    clear() {
        this.items = []
    }

    get arr() {
        return this.items
    }
}

