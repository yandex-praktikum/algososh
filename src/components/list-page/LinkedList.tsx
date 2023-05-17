export class LinkedListNode<T> {
  public readonly value: T
  public next: LinkedListNode<T> | null
  public state: 'default' | 'changing' | 'modified' = 'default'
  public addingValue: T | null = null
  public showLetter: boolean = true
  public modify: 'head' | 'tail' | '' = ''

  constructor (value: T, next?: LinkedListNode<T> | null) {
    this.value = value
    this.next = next ?? null
  }
}

export class LinkedList<T> {
  public head: LinkedListNode<T> | null = null
  public tail: LinkedListNode<T> | null = null
  public size: number = 0

  constructor (values?: T[]) {
    if (values) {
      for (const value of values) {
        this.append(value)
      }
      this.size = values.length
    }
  }

  getHead = (): LinkedListNode<T> | null => this.head

  getTail = (): LinkedListNode<T> | null => this.tail

  getNode = (index: number): LinkedListNode<T> | null => {
    let node = this.head
    while (index && node && node.next) {
      node = node.next
      index--
    }
    return node
  }

  prepend = (item: T): void => {
    const node = new LinkedListNode(item, this.head)
    this.head = node
    this.tail ??= node
    this.size++
  }

  append = (item: T): void => {
    const node = new LinkedListNode(item)
    if (this.tail) this.tail.next = node
    this.tail = node
    if (!this.head) this.head = node
    this.size++
  }

  addByIndex = (index: number, item: T): void => {
    if (index < 0 || index >= this.size) return
    if (index === 0) { this.prepend(item); return }

    const addedNode = new LinkedListNode(item)

    let node = this.head
    let i = 0
    while (i < index - 1 && node) {
      node = node.next
      i++
    }
    if (node && !node.next) node.next = addedNode
    else {
      const tmp = node?.next || null
      if (node) node.next = addedNode
      addedNode.next = tmp
    }
    this.size++
  }

  deleteByIndex = (index: number): void => {
    if (index < 0 || index >= this.size) return

    let node = this.head
    let i = 0
    while (i < index - 1 && node) {
      node = node.next
      i++
    }
    if (node && node.next && !node.next.next) node.next = null

    if (node && node.next && node.next.next) node.next = node.next.next
    this.size--
  }

  deleteHead = (): void => {
    if (this.head) this.head = this.head.next
    if (!this.head) this.tail = null
    this.size--
  }

  deleteTail = (): void => {
    if (this.head === this.tail) {
      this.head = this.tail = null
    } else {
      let node = this.head
      while (node && node.next && node.next.next) {
        node = node.next
      }
      this.tail = node
      if (node) node.next = null
    }
    this.size--
  }

  clone = (): LinkedList<T> => {
    const clone = new LinkedList<T>()
    clone.head = this.head
    clone.tail = this.tail
    clone.size = this.size
    return clone
  }

  toArray = (): Array<LinkedListNode<T>> => {
    const res: Array<LinkedListNode<T>> = []

    let node = this.head
    while (node) {
      res.push(node)
      node = node.next
    }

    return res
  }
}
