const st = "TUF is great for interview preparation";
console.log("Before reversing words:");
console.log(st);
console.log("After reversing words:");

// function reverseWords(st) {


//     let arr = st.split('');
//     let first = 0;
//     let last = st.length - 1;

//     while (first < last) {
//         let temp = arr[first];
//         arr[first] = arr[last];
//         arr[last] = temp;

//         first++;
//         last--;
//     };

//     return arr.join('');
// };
function reverseWords(s) {
    let left = 0;
    let right = s.length - 1;
    let temp = "";
    let ans = "";

  
    while (left <= right) {
        let ch = s[left];

        if (ch !== ' ') {
            temp += ch;
        } else {
            if (ans !== "") {
                ans = temp + " " + ans;
            } else {
                ans = temp;
            }
            temp = "";
        };


        console.log(left, right);

        left++;
    }

    // Add the last word
    if (temp !== "") {
        if (ans !== "") {
            ans = temp + " " + ans;
        } else {
            ans = temp;
        }
    }

    return ans;
}

function reverseWordsv1(s) {
    let left = 0;
    let temp = "";
    const words = [];

    while (left <= s.length - 1) {
        const ch = s[left];

        if (ch !== ' ') {
            temp += ch;
        } else {
            if (temp !== "") {
                words.unshift(temp);  // <-- Important line
                temp = "";
            }
        }

        left++;
    }

    if (temp !== "") {
        words.unshift(temp);
    }

    return words.join(" ");
}

function reverseWordsV2(s) {
    let left = 0;
    let temp = "";
    const words = [];

    while (left < s.length) {
        const ch = s[left];

        if (ch !== ' ') {
            temp += ch; // Build the word
        } else {
            if (temp !== "") {
                words.push(temp); // Add word at end
                temp = ""; // Reset for next word
            }
        }

        left++;
    }

    // Add the last word (if any)
    if (temp !== "") {
        words.push(temp);
    }

    // Reverse the array and join to form the final string
    return words.reverse().join(" ");
}

console.log(reverseWords(st));