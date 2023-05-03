import {ElementStates} from "./element-states";

export interface IQueueState<T> {
    item: (T | null)
    state: ElementStates
}

export interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
}

