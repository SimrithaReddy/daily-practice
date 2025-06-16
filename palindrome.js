function isPalindromeNumber(n) {
    if (n < 0) return false; // Negative numbers are not palindromes

    let revNum = 0;
    let original = n;

    while (n > 0) {
        let digit = n % 10;
        revNum = revNum * 10 + digit;
        n = Math.floor(n / 10);
    }

    return original === revNum;
}

function main() {
    let number = 121;

    if (isPalindromeNumber(number)) {
        console.log(number + " is a palindrome.");
    } else {
        console.log(number + " is not a palindrome.");
    }
}

main();
