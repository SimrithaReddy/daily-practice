const grid = [
    ['A', 'A', 'N', 'I', 'Q'],
    ['P', 'J', 'I', 'N', 'T'],
    ['N', 'I', 'N', 'J', 'A'],
    ['B', 'L', 'J', 'I', 'J'],
    ['P', 'R', 'A', 'D', 'N']
];


function countOccurrences(grid, word) {


    let rows = grid.length;
    let columns = grid[0].length;
    const wordLen = word.length;


    console.log(rows, columns);
    // All 8 directions
    const directions = [
        [-1, 0],
        [1, 0],

        [0, -1],
        [0, 1],

        [-1, 1],
        [-1, -1],

        [1, -1],
        [1, 1]
    ];

    function searchFrom(x, y) {
        let count = 0;
        function isValid(x, y) {
            return x >= 0 && y >= 0 && x < rows && y < columns;
        }
        for (const [dx, dy] of directions) {
            let i = x;
            let j = y;
            let k = 0;

            while (k < wordLen) {
                if (!isValid(i, j) || grid[i][j] !== word[k]) {
                    break;
                }
                i += dx;
                j += dy;
                k++;
            }

            if (k === wordLen) {
                count++;
            }
        }

        return count;
    }


    let totalCount = 0;

    for (let i = 0; i < rows; i++) {

        for (let j = 0; j < columns; j++) {

            if (grid[i][j] === word[0]) {

                totalCount += searchFrom(i, j);

                console.log(i, j);
            };
        };

    };


    // console.log(totalCount);

    return totalCount;
};









console.log(countOccurrences(grid, 'NINJA'), "countOccurrences>>>>>>>>>>"); // Output: 2
