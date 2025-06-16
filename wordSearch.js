function countOccurrences(grid, word) {
    const n = grid.length;
    const m = grid[0].length;
    const wordLen = word.length;

    // All 8 directions
    const directions = [
        [-1, 0], [1, 0],  // up, down
        [0, -1], [0, 1],  // left, right
        [-1, -1], [-1, 1], // top-left, top-right
        [1, -1], [1, 1]   // bottom-left, bottom-right
    ];

    function isValid(x, y) {
        return x >= 0 && y >= 0 && x < n && y < m;
    }

    function searchFrom(x, y) {
        let count = 0;

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

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === word[0]) {
                totalCount += searchFrom(i, j);
            }
        }
    }

    return totalCount;
};




