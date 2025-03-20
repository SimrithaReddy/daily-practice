function longestUniqueSubstring(sentence) {
    let maxLength = 0;
    let start = 0;
    let longestSubstring = "";
    let charIndexMap = new Map();

    for (let end = 0; end < sentence.length; end++) {
        let char = sentence[end];

        // If the character is already in the map and its index is within the current window
        if (charIndexMap.has(char) && charIndexMap.get(char) >= start) {
            start = charIndexMap.get(char) + 1;
        }

        charIndexMap.set(char, end);

        // Update the maximum length and the longest substring if a longer one is found
        if (end - start + 1 >= maxLength) {
            maxLength = end - start + 1;
            longestSubstring = sentence.substring(start, end + 1);
        }
    }

    return longestSubstring;
}

// Example usage
const sentence = "abcdefghijkabcabcdefjhbabcdefghijk";
console.log(longestUniqueSubstring(sentence)); // Output: "abcabcdefjh"
