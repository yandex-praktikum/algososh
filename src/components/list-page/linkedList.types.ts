export interface ILinkedList {
  append: (element: string) => void;
  elementByIndex: (index: number) => string;
  prepend: (element: string) => void;
  addByIndex: (element: string, index: number) => string[] | null | undefined;
  deleteByIndex: (index: number) => string[] | null | undefined;
  toArray: () => string[];
  deleteHead: () => string[] | null | undefined;
  deleteTail: () => string[] | null | undefined;
}
