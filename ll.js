class Node {
    constructor(element) {
        this.data = element;
        this.next = null;
    }
}

class LinkedListP {
    constructor() {
        this.head = null;
        this.size = 0;
    }


    insertAtEnd(val) {
        const value = new Node(val);
        if (this.head === null) {
            this.head = value;
        }
        else {
            let temp = this.head;
            while (temp.next != null) {
                temp = temp.next;
            }
            temp.next = value;
        };

        this.size++;
    };


    insertAtBeginning(val) {
        const value = new Node(val);
        value.next = this.head;
        this.head = value;
        this.size++;
    };

    static floyydCycleDetectLoop(l1) {
        let fast = l1.head;
        let slow = l1.head;

        while (fast !== null && fast.next !== null) {
            slow = slow.next;            // 🐢 Move 1 step
            fast = fast.next.next;       // 🐇 Move 2 steps

            if (slow === fast) {
                return 1; // Cycle found
            }
        }
        return 0; // No cycle
    }
    

    static detectLoop(l1) {
        let curr = l1.head;
        let set = new Set();

        while (curr !== null) {
            if (set.has(curr.data) == true) {
                return 1;
            }
            set.add(curr.data);
            curr = curr.next
        }
        // console.log(set)
        return 0;
    }
    static printVal(node) {
        let result = "";

        while (node) {
            result += node.data + " -> ";
            node = node.next;
        };
        console.log(result + "null");
    }

    static mergetwosortedLL(l1, l2) {

        const dummy = new Node(-1);
        let tail = dummy;

        while (l1 !== null && l2 !== null) {

            if (l1.data < l2.data) {
                tail.next = l1;
                l1 = l1.next;
            } else {
                tail.next = l2;
                l2 = l2.next;
            };

            tail = tail.next;
        };


        if (l1 !== null) tail.next = l1;
        if (l2 !== null) tail.next = l2;


        return dummy.next;
    };

}







const arr = [1, 2, 3, 4, 5, 1];
const arr2 = [6, 7, 8, 9, 10, 11, 12];

const L4 = new LinkedListP();
const L5 = new LinkedListP();

for (let i = 0; i < arr.length; i++) {
    L4.insertAtEnd(arr[i]);
};

for (let i = 0; i < arr2.length; i++) {
    L5.insertAtEnd(arr2[i]);
};


LinkedListP.printVal(L4.head);
LinkedListP.printVal(L5.head);

let merge = LinkedListP.mergetwosortedLL(L4.head, L5.head);

console.log(merge);
LinkedListP.printVal(merge);
console.log(LinkedListP.floyydCycleDetectLoop(L4));







