function longestBalancedSubstring(s) {
    let maxLength = 0;
    let start = 0;
    let end = 0;
    const n = s.length;

    for (let i = 0; i < n; i++) {
        let countA = 0;
        let countB = 0;

        for (let j = i; j < n; j++) {
            if (s[j] === 'a') countA++;
            if (s[j] === 'b') countB++;

            if (countA === countB) {
                if (j - i + 1 > maxLength) {
                    maxLength = j - i + 1;
                    start = i;
                    end = j;
                }
            }
        }
    }


    return start === 0 && end === 0 ? -1 : s.slice(start, end + 1);
}

// Example usage:
const str = "abbbbbbbbababa";
console.log(longestBalancedSubstring(str)); // Output: "abababbaab"
