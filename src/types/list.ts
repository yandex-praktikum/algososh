export type TLinkedList<T> = {
    prepend: (value: T) => void;
    append: (value: T) => void;
    removeHead: () => void;
    removeTail: () => void;
    insertAt: (value: T, index: number) => void;
    removeAt: (index: number) => void;
    getItems: () => T[];
    clear: () => void;
  }
  