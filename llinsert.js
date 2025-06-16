class Node {
    constructor(element) {
        this.data = element;
        this.next = null;
    }
};

class LinkedListL2 {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    insertAtBeginning(element) {
        let node = new Node(element);
        node.next = this.head;
        this.head = node;
        this.size++;
    }

    insertAtEnd(val) {
        let value = new Node(val);

        if (this.head == null) {
            this.head = value;
        } else {
            let temp = this.head;
            while (temp.next != null) {
                temp = temp.next;
            }
            temp.next = value;
        }
        this.size++;
    }

    mergeTwoSortedLists(l1, l2) {
        const dummy = new Node(-1); // dummy start node
        let tail = dummy;

        while (l1 !== null && l2 !== null) {
            if (l1.data < l2.data) {
                tail.next = l1;
                l1 = l1.next;
            } else {
                tail.next = l2;
                l2 = l2.next;
            }
            tail = tail.next;
        }

        if (l1 !== null) tail.next = l1;
        if (l2 !== null) tail.next = l2;

        return dummy.next;
    }

    static printFromNode(node) {
        let result = "";
        while (node) {
            result += node.data + " -> ";
            node = node.next;
        }
        console.log(result + "null");
    }
};

// Create lists
let L1 = new LinkedListL2();
let arr = [1, 2, 3, 4, 5];
arr.forEach(val => L1.insertAtEnd(val));

let L2 = new LinkedListL2();
let arr2 = [6, 7, 8, 9, 10, 11];
arr2.forEach(val => L2.insertAtEnd(val));

// Create a LinkedListL2 instance to use the merge method
let helper = new LinkedListL2();
let mergedHead = helper.mergeTwoSortedLists(L1.head, L2.head);

// Print the merged list
LinkedListL2.printFromNode(mergedHead);

console.log(L1.size);
console.log(L2.size);
