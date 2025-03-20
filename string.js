
function mostOcurringWord(str) {

    let freqObj = {}, max_value = 0, char = "";

    for (let i = 0; i < str.length; i++) {
        freqObj[str[i]] = freqObj[str[i]] + 1 || 0;
        if (freqObj[str[i]] > max_value) {
            char = str[i];
            max_value = freqObj[str[i]];
        };
    };

    console.log(Object.keys(freqObj));

    for (const [key, value] of Object.entries(freqObj)) {
        console.log(`${key}, ${value}`);
    };

    for (const key in freqObj) {
        console.log(`${key}`);
    };

    return char;

};



let str = "aquera";
console.log(mostOcurringWord(str));