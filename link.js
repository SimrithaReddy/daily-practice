let fs = require("fs");
let data = fs.readFileSync(0, 'utf-8');
let idx = 0;
data = data.split('\n');

function readLine() {
    idx++;
    return data[idx - 1];
}

// -------- Do NOT edit anything above this line ----------
// Use readLine() for taking input, it will read one line of from the input  and is stored in string format 




//  JS program to detect loop in the linked list 

// Node class 
class Node {
    // Constructor to initialize the node object 
    constructor(data) {
        this.data = data;
        this.next = null;
    }
};

class LinkedList {
    // # Function to initialize head 
    constructor() {
        this.head = null;
    }
    //  Do not change anything above this line

    detectLoop() {
        let curr = this.head;
        let set = new Set;

        while (curr != null) {
            if (set.has(curr.data) === true) {
                return 1;
            }
            else {
                set.add(curr.data);
            }
            curr = curr.next
        }
        //console.log(set)
        return 0;
    }
}

//  Do not change anything below this line

let n = parseInt(readLine());

// Start with the empty list 
let llist = new LinkedList();
let ar = readLine().split(" ").map(Number);
let temp = ar;
if (n < 1) {
    llist.head = null;
}
else if (n < 2) {
    llist.head = new Node(temp[0]);
}
else {
    llist.head = new Node(temp[0]);
    let second = new Node(temp[1]);
    llist.head.next = second;
    var curr = llist.head.next;
}

for (let i = 2; i < n; i++) {
    let t = new Node(temp[i]);
    curr.next = t;
    curr = curr.next;
}
// console.log(llist.head)
let link = parseInt(readLine());
if (link != -1) {
    let t = llist.head;
    for (let i = 0; i < link - 1; i++) {
        t = t.next;
    }
    //curr.next = t;
    //  console.log(curr.next)
}
//     # llist.printList()
// console.log(llist.head)
console.log(llist.detectLoop());