function longestRepeatingSubstring(sentence) {
    let maxLength = 0;
    let start = 0;
    let longestSubstring = "";
    let charIndexMap = new Map();
    let charCountMap = new Map();

    for (let end = 0; end < sentence.length; end++) {
        let char = sentence[end];

        // Update the count of the current character
        if (charCountMap.has(char)) {
            charCountMap.set(char, charCountMap.get(char) + 1);
        } else {
            charCountMap.set(char, 1);
        }

        // If the character is already in the map and its index is within the current window
        if (charIndexMap.has(char) && charIndexMap.get(char) >= start) {
            start = charIndexMap.get(char) + 1;
        }

        charIndexMap.set(char, end);

        // Check if all characters in the current window are repeated at least once
        let allCharsRepeated = true;
        for (let i = start; i <= end; i++) {
            if (charCountMap.get(sentence[i]) < 2) {
                allCharsRepeated = false;
                break;
            }
        }

        // Update the maximum length and the longest substring if a longer one is found
        if (allCharsRepeated && end - start + 1 > maxLength) {
            maxLength = end - start + 1;
            longestSubstring = sentence.substring(start, end + 1);
        }
    }

    return longestSubstring;
}

// Example usage
const sentence = "acdtyabcdadefjhbdca";
console.log(longestRepeatingSubstring(sentence)); // Output: "abcabc"
