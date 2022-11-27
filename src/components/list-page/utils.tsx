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
    constructor(array?: T[]) {
        this.head = null;
        this.tail = null;
        this.size = 0;
        array?.forEach(element => this.append(element))
    }


    //Добавление узла в начало списка
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


    //Добавление узла в конец списка
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
        if (index < 0 ) {
            console.log('Enter a valid index');
            return;
        } else {
            // Создаём новый узел
            const node = new Node(element);

            // добавить элемент в начало списка
            if (index === 0) {
                node.next = this.head;
                this.head = node;
            } else if (this.head) {
                let curr = this.head;
                let currIndex = 0;

                // перебираем элементы в списке до нужной позиции
                while (currIndex < index && curr.next) {
                    curr = curr.next;
                    currIndex++;
                }
                // добавляем элемент
                    node.next = curr;
                    curr.next = node;
                this.size++;
            }
        }
    }

    // Удаление элемента по индексу
    deleteByIndex(index: number) {
        if (index < 0 || index > this.size) {
            return;
        }
        let current = this.head;
        if (index === 0) {
            if (this.head) this.head = this.head?.next;
        } else {
            let prev = null;
            let currIndex = 0;
            while (currIndex++ < index) {
                prev = current;
                if (current) {
                    current = current.next;
                }
            }
            if (prev?.next) prev.next = current?.next ? current.next : null;
        }
        this.size--;
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

