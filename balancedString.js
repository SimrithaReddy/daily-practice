function findBalancedString(str) {
    let freqObj = {};
    let start = 0;
    let maxLength = 0;
    let longestBalancedString = "";

    for (let end = 0; end < str.length; end++) {
        freqObj[str[end]] = freqObj[str[end]] + 1 || 1;

        while (freqObj["a"] > 0 && freqObj["b"] > 0 && freqObj["a"] !== freqObj["b"]) {
            freqObj[str[start]] -= 1;
            if (freqObj[str[start]] === 0) {
                delete freqObj[str[start]];
            }
            start++;
        }

        if (freqObj["a"] === freqObj["b"]) {
            let currentLength = end - start + 1;
            if (currentLength > maxLength) {
                maxLength = currentLength;
                longestBalancedString = str.substring(start, end + 1);
            }
        }
    }
    return longestBalancedString;
}

// case2:
const str = "ababbababaaaaaabbaaaaaa";
console.log(findBalancedString(str));  // Output: "abababab"
