class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    insertAtEnd(data) {
        const newNode = new Node(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }

        console.log(newNode);
        this.size++;
    }

    insertAtBeginning(data) {
        const newNode = new Node(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }

        this.size++;
    }

    deleteFromBeginning() {
        if (!this.head) return;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }

        this.size--;
    }

    deleteFromEnd() {
        if (!this.tail) return;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }

        this.size--;
    }

    printForward() {
        let current = this.head;
        let result = '';
        while (current) {
            result += current.data + ' ⇄ ';
            current = current.next;
        }
        console.log('HEAD ⇄ ' + result + 'null');
    }

    printBackward() {
        let current = this.tail;
        let result = '';
        while (current) {
            result += current.data + ' ⇄ ';
            current = current.prev;
        }
        console.log('TAIL ⇄ ' + result + 'null');
    }
}
const dll = new DoublyLinkedList();

dll.insertAtEnd(10);
dll.insertAtEnd(20);
dll.insertAtEnd(5);
dll.insertAtEnd(30);

dll.printForward();   // HEAD ⇄ 5 ⇄ 10 ⇄ 20 ⇄ 30 ⇄ null
// dll.printBackward();  // TAIL ⇄ 30 ⇄ 20 ⇄ 10 ⇄ 5 ⇄ null

// dll.deleteFromBeginning();
// dll.deleteFromEnd();

// dll.printForward();   // HEAD ⇄ 10 ⇄ 20 ⇄ null
