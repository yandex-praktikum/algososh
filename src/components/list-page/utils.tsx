import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { stringCharsProps } from "../../types/types";
import { delay, getNumber } from "../../utils/utils";

export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export interface ILinkedList<T> {
  addToTail: (element: T) => void;
  getNodeByIndex: (index: number) => T | null;
  insertAt: (element: T, index: number) => void;
  getSize: () => number;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor(initialState?: T[]) {
    this.head = null;
    this.size = 0;
    initialState?.forEach(el => this.insertAt(el, 0))
  }

  addToTail(element: T) {
    let node = new Node(element);

    if (this.size === 0) {
      this.head = node;
    } else {
      let current = this.head;

      while (current && current.next !== null) {
        current = current.next;
      }

      if (current) current.next = new Node(element);
    }

    this.size++;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);

      // добавить элемент в начало списка
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        let prev = null;

        // перебрать элементы в списке до нужной позиции
        while (currIndex < index && curr) {
          prev = curr;
          curr = curr.next;
          currIndex++;
        }

        // добавить элемент
        if (prev) prev.next = node;
        node.next = curr;
      }

      this.size++;
    }
  }

  getSize() {
    return this.size;
  }

  getNodeByIndex(index: number) {
    if (index < 0 || index > this.size) {
      return null;
    }

    let curr = this.head;
    let currIndex = 0;

    while (currIndex < index && curr) {
      curr = curr.next;
      currIndex++;
    }

    return curr ? curr.value : null;
  }

  removeFromPosition(index: number) {
    if (index < 0 || index > this.size) {
      return null;
    }

    let curr = this.head;

    if (index === 0 && curr) {
      this.head = curr.next;
    } else {
      let prev = null;
      let currIndex = 0;

      while (currIndex < index && curr) {
        prev = curr;
        curr = curr.next;
        currIndex++;
      }

      if (prev && curr) prev.next = curr.next;
    }

    this.size--;
    return curr ? curr.value : null;
  }

  print() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}

/*
class LinkedListNode<T> {
  state: ElementStates;
  adding?: boolean;
  deleting?: boolean;
  noArrow?: boolean;
  tail?: string;
  head?: string;
  char?: T;
  extraCircle?: {
    char: string;
  };
  constructor(
    state: ElementStates,
    adding?: boolean,
    deleting?: boolean,
    noArrow?: boolean,
    tail?: string,
    head?: string,
    char?: T,
    extraCircle?: {
      char: string;
    }
  ) {
    this.state = state;
    this.adding = adding;
    this.deleting = deleting;
    this.deleting = deleting;
    this.noArrow = noArrow;
    this.tail = tail;
    this.head = head;
    this.char = char;
    this.extraCircle = extraCircle;
  }
}

export class LinkedList {
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>;
  setAddingToHead: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletingFromHead: React.Dispatch<React.SetStateAction<boolean>>;
  setAddingToTail: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletingFromTail: React.Dispatch<React.SetStateAction<boolean>>;
  setAddingByIdx: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletingByIdx: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setIdx: React.Dispatch<React.SetStateAction<number | undefined>>;
  setArrayCircles: React.Dispatch<React.SetStateAction<stringCharsProps[]>>;
  idx: number | undefined;
  value: string;
  arrayOfCircles: stringCharsProps[];
  basicState: LinkedListNode<string>[];

  constructor(
    setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
    setAddingToHead: React.Dispatch<React.SetStateAction<boolean>>,
    setDeletingFromHead: React.Dispatch<React.SetStateAction<boolean>>,
    setAddingToTail: React.Dispatch<React.SetStateAction<boolean>>,
    setDeletingFromTail: React.Dispatch<React.SetStateAction<boolean>>,
    setAddingByIdx: React.Dispatch<React.SetStateAction<boolean>>,
    setDeletingByIdx: React.Dispatch<React.SetStateAction<boolean>>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    setIdx: React.Dispatch<React.SetStateAction<number | undefined>>,
    setArrayCircles: React.Dispatch<React.SetStateAction<stringCharsProps[]>>,
    idx: number | undefined,
    value: string,
    arrayOfCircles: stringCharsProps[],
    minNum: number = 4
  ) {
    this.setInProgress = setInProgress;
    this.setAddingToHead = setAddingToHead;
    this.setDeletingFromHead = setDeletingFromHead;
    this.setAddingToTail = setAddingToTail;
    this.setDeletingFromTail = setDeletingFromTail;
    this.setAddingByIdx = setAddingByIdx;
    this.setDeletingByIdx = setDeletingByIdx;
    this.setValue = setValue;
    this.setIdx = setIdx;
    this.setArrayCircles = setArrayCircles;
    this.idx = idx;
    this.value = value;
    this.arrayOfCircles = arrayOfCircles;
    this.basicState = Array.from(
      { length: minNum },
      () =>
        new LinkedListNode(
          ElementStates.Default,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          `${getNumber()}`
        )
    );
  }

  initialize = () => {
    this.setArrayCircles([...this.basicState]);
  };

  sortAndWait = async (arr: stringCharsProps[]) => {
    this.setArrayCircles([...arr]);
    await delay(SHORT_DELAY_IN_MS);
  };

  addToHead = async () => {
    const copyArr = [...this.arrayOfCircles];
    this.setInProgress(true);
    this.setAddingToHead(true);
    // Подсвечиваем голову
    copyArr[0] = {
      ...copyArr[0],
      adding: true,
      extraCircle: {
        char: this.value,
      },
    };
    await this.sortAndWait([...copyArr]);
    // Убираем подсветку и добавляем новую голову
    copyArr[0] = {
      ...copyArr[0],
      adding: false,
      extraCircle: undefined,
    };
    copyArr.unshift(
      new LinkedListNode(
        ElementStates.Modified,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        this.value
      )
    );
    await this.sortAndWait([...copyArr]);
    // Меняем стейт головы
    copyArr[0].state = ElementStates.Default;
    this.setInProgress(false);
    this.setAddingToHead(false);
    this.setValue("");
  };

  deleteFromHead = async () => {
    const copyArr = [...this.arrayOfCircles];
    const deletingValue = copyArr[0].char;
    this.setInProgress(true);
    this.setDeletingFromHead(true);
    // Смещаем голову в нижний кружок
    copyArr[0] = {
      ...copyArr[0],
      char: "",
      deleting: true,
      extraCircle: {
        char: deletingValue ? deletingValue : "",
      },
    };
    await this.sortAndWait([...copyArr]);
    // Удаляем элемент и подсвечиваем новую голову
    copyArr.shift();
    copyArr[0].state = ElementStates.Modified;
    await this.sortAndWait([...copyArr]);
    // Убираем подсветку с новой головы
    copyArr[0].state = ElementStates.Default;
    this.setInProgress(false);
    this.setDeletingFromHead(false);
  };

  addToTail = async () => {
    const copyArr = [...this.arrayOfCircles];
    const { length } = copyArr;
    this.setInProgress(true);
    this.setAddingToTail(true);
    // Подсвечиваем хвост
    copyArr[length - 1] = {
      ...copyArr[length - 1],
      adding: true,
      extraCircle: {
        char: this.value,
      },
    };
    await this.sortAndWait([...copyArr]);
    // Убираем подсветку и добавляем новый хвост
    copyArr[length - 1] = {
      ...copyArr[length - 1],
      adding: false,
      extraCircle: undefined,
    };
    copyArr.push(
      new LinkedListNode(
        ElementStates.Modified,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        this.value
      )
    );
    await this.sortAndWait([...copyArr]);
    // Меняем стейт головы
    copyArr[length].state = ElementStates.Default;
    this.setInProgress(false);
    this.setAddingToTail(false);
    this.setValue("");
  };

  deleteFromTail = async () => {
    const copyArr = [...this.arrayOfCircles];
    const { length } = copyArr;
    const deletingValue = copyArr[length - 1].char;

    this.setInProgress(true);
    this.setDeletingFromTail(true);
    // Смещаем хвост в нижний кружок
    copyArr[length - 1] = {
      ...copyArr[length - 1],
      char: "",
      deleting: true,
      extraCircle: {
        char: deletingValue ? deletingValue : "",
      },
    };
    await this.sortAndWait([...copyArr]);
    // Удаляем элемент и подсвечиваем новый хвост
    copyArr.pop();
    copyArr[length - 2].state = ElementStates.Modified;
    await this.sortAndWait([...copyArr]);
    // Убираем подсветку с нового хвоста
    copyArr[length - 2].state = ElementStates.Default;
    this.setInProgress(false);
    this.setDeletingFromTail(false);
  };

  addByIdx = async () => {
    const copyArr = [...this.arrayOfCircles];
    this.setInProgress(true);
    this.setAddingByIdx(true);
    // Запускаем перебор по элементам массива
    for (let i = 0; i <= this.idx!; i++) {
      copyArr[i] = {
        ...copyArr[i],
        adding: true,
        extraCircle: {
          char: this.value,
        },
      };
      if (i > 0)
        copyArr[i - 1] = {
          ...copyArr[i - 1],
          adding: false,
          extraCircle: undefined,
          state: ElementStates.Changing,
        };
      await this.sortAndWait([...copyArr]);
    }
    // Добавляем элемент по индексу
    copyArr[this.idx!] = {
      ...copyArr[this.idx!],
      adding: false,
      extraCircle: undefined,
    };
    copyArr.splice(
      this.idx!,
      0,
      new LinkedListNode(
        ElementStates.Modified,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        this.value
      )
    );
    await this.sortAndWait([...copyArr]);
    // Убираем подсветку
    copyArr.forEach((el) => (el.state = ElementStates.Default));
    this.setInProgress(false);
    this.setAddingByIdx(false);
    this.setValue("");
    this.setIdx(undefined);
  };

  deleteByIdx = async () => {
    const copyArr = [...this.arrayOfCircles];
    const deletingValue = copyArr[this.idx!].char;
    this.setInProgress(true);
    this.setDeletingByIdx(true);
    // Запускаем перебор по элементам массива
    for (let i = 0; i <= this.idx!; i++) {
      copyArr[i].state = ElementStates.Changing;
      if (i === this.idx) copyArr[i].noArrow = true;
      await this.sortAndWait([...copyArr]);
    }
    // Показываем удаляемый элемент
    copyArr[this.idx!] = {
      ...copyArr[this.idx!],
      char: "",
      deleting: true,
      extraCircle: {
        char: deletingValue ? deletingValue : "",
      },
    };
    await this.sortAndWait([...copyArr]);
    // Удаляем элемент
    copyArr.splice(this.idx!, 1);
    // Убираем подсветку
    copyArr.forEach((el) => (el.state = ElementStates.Default));
    this.setInProgress(false);
    this.setDeletingByIdx(false);
    this.setIdx(undefined);
    await this.sortAndWait([...copyArr]);
  };
}

/*
const sortAndWait = async (
  arr: stringCharsProps[],
  setArrayCircles: React.Dispatch<React.SetStateAction<stringCharsProps[]>>
) => {
  setArrayCircles([...arr]);
  await delay(SHORT_DELAY_IN_MS);
};

export const addToHead = async (
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setAddingToHead: React.Dispatch<React.SetStateAction<boolean>>,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  value: string,
  arrayOfCircles: stringCharsProps[],
  setArrayCircles: React.Dispatch<React.SetStateAction<stringCharsProps[]>>
) => {
  const copyArr = [...arrayOfCircles];
  setInProgress(true);
  setAddingToHead(true);
  // Подсвечиваем голову
  copyArr[0] = {
    ...copyArr[0],
    adding: true,
    extraCircle: {
      char: value,
    },
  };
  await sortAndWait([...copyArr], setArrayCircles);
  // Убираем подсветку и добавляем новую голову
  copyArr[0] = {
    ...copyArr[0],
    adding: false,
    extraCircle: undefined,
  };
  copyArr.unshift({
    char: value,
    state: ElementStates.Modified,
  });
  await sortAndWait([...copyArr], setArrayCircles);
  // Меняем стейт головы
  copyArr[0].state = ElementStates.Default;
  setInProgress(false);
  setAddingToHead(false);
  setValue("");
};

export const deleteFromHead = async (
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setDeletingFromHead: React.Dispatch<React.SetStateAction<boolean>>,
  arrayOfCircles: stringCharsProps[],
  setArrayCircles: React.Dispatch<React.SetStateAction<stringCharsProps[]>>
) => {
  const copyArr = [...arrayOfCircles];
  const deletingValue = copyArr[0].char;
  setInProgress(true);
  setDeletingFromHead(true);
  // Смещаем голову в нижний кружок
  copyArr[0] = {
    ...copyArr[0],
    char: "",
    deleting: true,
    extraCircle: {
      char: deletingValue ? deletingValue : "",
    },
  };
  await sortAndWait([...copyArr], setArrayCircles);
  // Удаляем элемент и подсвечиваем новую голову
  copyArr.shift();
  copyArr[0].state = ElementStates.Modified;
  await sortAndWait([...copyArr], setArrayCircles);
  // Убираем подсветку с новой головы
  copyArr[0].state = ElementStates.Default;
  setInProgress(false);
  setDeletingFromHead(false);
};

export const addToTail = async (
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setAddingToTail: React.Dispatch<React.SetStateAction<boolean>>,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  value: string,
  arrayOfCircles: stringCharsProps[],
  setArrayCircles: React.Dispatch<React.SetStateAction<stringCharsProps[]>>
) => {
  const copyArr = [...arrayOfCircles];
  const { length } = copyArr;
  setInProgress(true);
  setAddingToTail(true);
  // Подсвечиваем хвост
  copyArr[length - 1] = {
    ...copyArr[length - 1],
    adding: true,
    extraCircle: {
      char: value,
    },
  };
  await sortAndWait([...copyArr], setArrayCircles);
  // Убираем подсветку и добавляем новый хвост
  copyArr[length - 1] = {
    ...copyArr[length - 1],
    adding: false,
    extraCircle: undefined,
  };
  copyArr.push({
    char: value,
    state: ElementStates.Modified,
  });
  await sortAndWait([...copyArr], setArrayCircles);
  // Меняем стейт головы
  copyArr[length].state = ElementStates.Default;
  setInProgress(false);
  setAddingToTail(false);
  setValue("");
};

export const deleteFromTail = async (
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setDeletingFromTail: React.Dispatch<React.SetStateAction<boolean>>,
  arrayOfCircles: stringCharsProps[],
  setArrayCircles: React.Dispatch<React.SetStateAction<stringCharsProps[]>>
) => {
  const copyArr = [...arrayOfCircles];
  const { length } = copyArr;
  const deletingValue = copyArr[length - 1].char;

  setInProgress(true);
  setDeletingFromTail(true);
  // Смещаем хвост в нижний кружок
  copyArr[length - 1] = {
    ...copyArr[length - 1],
    char: "",
    deleting: true,
    extraCircle: {
      char: deletingValue ? deletingValue : "",
    },
  };
  await sortAndWait([...copyArr], setArrayCircles);
  // Удаляем элемент и подсвечиваем новый хвост
  copyArr.pop();
  copyArr[length - 2].state = ElementStates.Modified;
  await sortAndWait([...copyArr], setArrayCircles);
  // Убираем подсветку с нового хвоста
  copyArr[length - 2].state = ElementStates.Default;
  setInProgress(false);
  setDeletingFromTail(false);
};

export const addByIdx = async (
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setAddingByIdx: React.Dispatch<React.SetStateAction<boolean>>,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  setIdx: React.Dispatch<React.SetStateAction<number | undefined>>,
  idx: number | undefined,
  value: string,
  arrayOfCircles: stringCharsProps[],
  setArrayCircles: React.Dispatch<React.SetStateAction<stringCharsProps[]>>
) => {
  const copyArr = [...arrayOfCircles];
  setInProgress(true);
  setAddingByIdx(true);
  // Запускаем перебор по элементам массива
  for (let i = 0; i <= idx!; i++) {
    copyArr[i] = {
      ...copyArr[i],
      adding: true,
      extraCircle: {
        char: value,
      },
    };
    if (i > 0)
      copyArr[i - 1] = {
        ...copyArr[i - 1],
        adding: false,
        extraCircle: undefined,
        state: ElementStates.Changing,
      };
    await sortAndWait([...copyArr], setArrayCircles);
  }
  // Добавляем элемент по индексу
  copyArr[idx!] = {
    ...copyArr[idx!],
    adding: false,
    extraCircle: undefined,
  };
  copyArr.splice(idx!, 0, {
    char: value,
    state: ElementStates.Modified,
  });
  await sortAndWait([...copyArr], setArrayCircles);
  // Убираем подсветку
  copyArr.forEach((el) => (el.state = ElementStates.Default));
  setInProgress(false);
  setAddingByIdx(false);
  setValue("");
  setIdx(undefined);
};

export const deleteByIdx = async (
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
  setDeletingByIdx: React.Dispatch<React.SetStateAction<boolean>>,
  setIdx: React.Dispatch<React.SetStateAction<number | undefined>>,
  idx: number | undefined,
  arrayOfCircles: stringCharsProps[],
  setArrayCircles: React.Dispatch<React.SetStateAction<stringCharsProps[]>>
) => {
  const copyArr = [...arrayOfCircles];
  const deletingValue = copyArr[idx!].char;
  setInProgress(true);
  setDeletingByIdx(true);
  // Запускаем перебор по элементам массива
  for (let i = 0; i <= idx!; i++) {
    copyArr[i].state = ElementStates.Changing;
    if (i === idx) copyArr[i].noArrow = true;
    await sortAndWait([...copyArr], setArrayCircles);
  }
  // Показываем удаляемый элемент
  copyArr[idx!] = {
    ...copyArr[idx!],
    char: "",
    deleting: true,
    extraCircle: {
      char: deletingValue ? deletingValue : "",
    },
  };
  await sortAndWait([...copyArr], setArrayCircles);
  // Удаляем элемент
  copyArr.splice(idx!, 1);
  // Убираем подсветку
  copyArr.forEach((el) => (el.state = ElementStates.Default));
  setInProgress(false);
  setDeletingByIdx(false);
  setIdx(undefined);
  await sortAndWait([...copyArr], setArrayCircles);
};
*/
