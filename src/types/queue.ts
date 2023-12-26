export type TQueue<T> = {
    enqueue: (item: T) => void;
    dequeue: () => void;
    clear: () => void;
    isEmpty: boolean;
    getItems: Array<T | null>;
    head: number;
    tail: number;
  }

  