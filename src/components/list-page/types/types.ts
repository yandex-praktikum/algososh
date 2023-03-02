class LinkedListNode<T> {
    value: T;
    next: LinkedListNode<T> | null;

    constructor(value: T, next?: LinkedListNode<T> | null) {
        this.value = value;
        this.next = next === undefined ? null : next;
    }
}

interface ILinkedList<T> {
    prepend: (element: T) => void;
    append: (element: T) => void;
    deleteHead: () => void;
    deleteTail: () => void;
    addByIndex: (element: T, index: number) => void;
    deleteByIndex: (index: number) => void;
    toArray: () => T[] | null;
    getSize: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: LinkedListNode<T> | null;
    private tail: LinkedListNode<T> | null;
    private size: number;

    constructor(array?: T[]) {
        this.head = null;
        this.size = 0;
        this.tail = null;
        array?.forEach(element => this.append(element));
    }


    prepend(element: T) {
        const node = new LinkedListNode(element);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.size++;
    }

    deleteHead() {
        if (this.size === 1) {
            this.head = null;
            this.size = 0;
            this.tail = null;
        } else {
            this.head = this.head!.next;
            this.size--;
        }
    }

    append(element: T) {
        const node = new LinkedListNode(element);
        if (!this.tail) {
            this.tail = node;
            this.head = node;
        } else if (this.size === 1) {
            this.head!.next = node;
            this.tail = node;
        } else {
            let n = this.head!.next;
            while (this.size > 1 && n?.next) {
                n = n.next;
            }
            n!.next = node;
            this.tail = node;
        }
        this.size++;
    }

    deleteTail() {
        if (this.size === 1) {
            this.head = null;
            this.size = 0;
            this.tail = null;
        } else {
            let n = this.head;
            let prev = null;
            while (this.size > 1 && n?.next) {
                prev = n;
                n = n.next;
            }
            prev!.next = null;
            this.tail = prev;
            this.size--;
        }
    }

    addByIndex(element: T, index: number) {
        if (index < 0 || index > this.size) {
            console.log("Enter a valid index");
            return;
        } else {
            const node = new LinkedListNode(element);
            // добавить элемент в начало списка
            if (index === 0) {
                node.next = this.head;
                this.head = node;
            } else {
                let curr = this.head;
                // перебрать элементы в списке до нужной позиции
                while (index > 1 && curr) {
                    curr = curr.next;
                    index--;
                }
                // добавить элемент
                if (curr) {
                    let next = curr.next;
                    curr.next = node;
                    if (next) {
                        node.next = next;
                    } else {
                        this.tail = curr.next;
                    }
                }
            }
            this.size++;
        }
    }

    deleteByIndex(index: number) {
        if (index < 0 || index > this.size || !this.head) {
            return;
        }
        if (this.size === 1) {
            this.head = null;
            this.size = 0;
            this.tail = null;
        }
        let curr = this.head;
        if (index === 0) {
            this.head = curr!.next;
            curr!.next = null;
        } else {
            let prev = null;
            let n = 0;
            while (n < index) {
                prev = curr;
                if (curr) curr = curr?.next;
                n++;
            }
            if (prev && curr) prev.next = curr.next ? curr.next : null;
            if (curr) curr.next = null;
        }
        this.size--;
    }

    getSize(): number {
        return this.size;
    }

    toArray(): T[] | null {
        let curr = this.head;
        let res = [];
        while (curr) {
            res.push(curr.value);
            curr = curr.next;
        }
        return res;
    }

}
