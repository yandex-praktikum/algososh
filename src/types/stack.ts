export type TStack<T> = {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    clear:() => void;
    size: number;
    getItems: Array<T | null>;
  } 

  