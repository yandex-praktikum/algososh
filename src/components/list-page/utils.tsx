export class Node<T> {
    value: T;
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = next === undefined ? null : next;
    }
}

interface IList<T> {
    append: (element: T) => void;
    prepend: (element: T) => void;
    deleteHead: () => void;
    deleteTail: () => void;
    addByIndex: (element: T, index: number) => void;
    deleteByIndex: (index: number) => void;
}

export default class List<T> implements IList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;
    constructor(array: T[]) {
        this.head = null;
        this.tail = null;
        this.size = 0;
        array.forEach(element => this.append(element))
    }


    //Добавление узла в конец списка
    append(element: T) {
    // Создаём новый узел
        const node = new Node(element);
        let current;

        // Если не head или tail, делаем новым узлом head и tail.
        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
            return this;
        } else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }

    //Добавление узла в начало списка
    prepend(element: T): void {
    // Создаём новый узел, который будет новым head,
        const node = new Node(element, this.head);
        this.head = node;
        // Если не tail, делаем новый узел tail.
        if (!this.tail) {
            this.tail = node;
        }
        this.size++;
    }

    //Добавление элемента по индексу
    addByIndex(element: T, index: number) {
        if (index < 0) {
            console.log('Enter a valid index');
            return;
        } else {
            // Создаём новый узел
            const node = new Node(element);

            // добавить элемент в начало списка
            if (index === 0) {
                node.next = this.head;
                this.head = node;
            } else {
                let curr = this.head;
                let currIndex = 0;

                // перебираем элементы в списке до нужной позиции
                while (currIndex < index) {
                    currIndex++;
                    if (curr?.next && currIndex !== index) {
                        curr = curr?.next;
                    }
                }
                // добавляем элемент
                if (curr) {
                    node.next = curr;
                    curr.next = node;
                }
            }
        }
    }

    // Удаление элемента по индексу
    deleteByIndex(index: number) {
        if (index < 0 || index > this.size) {
            return null;
        }
        if (!this.head) {
            return null;
        }
        if (index === 0) {
            return this.deleteHead();
        }
        let currentNode = this.head;
        let deleteNode= null;

        let count = 0;
        // перебрать элементы в списке до нужной позиции
        while (count < index) {
            deleteNode = currentNode;
            currentNode = currentNode.next!;
            count++;
        }

        deleteNode!.next = currentNode.next!;
        this.size--;
        return currentNode.value;
    }

    //Удаление первого элемента из списка
    deleteHead() {
        if (this.head) {
            this.head = this.head.next;
            this.size--;
        }
    }

    // Удаление последнего элемента из списка
    deleteTail() {
        let current;
        if (!this.head?.next) {
            this.head = null;
        } else {
            current = this.head;
            while (current.next?.next) {
                current = current.next;
            }
            current.next = null;
        }
        this.size--;
    }
}

