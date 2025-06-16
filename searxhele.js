var searchRange = function (nums, target) {

    function findFirst(nums, target) {
        let low = 0, high = nums.length - 1;
        let index = -1;
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (nums[mid] === target) {
                index = mid;          // Save the index
                high = mid - 1;       // Keep looking on the left
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return index;
    }

    function findLast(nums, target) {
        let low = 0, high = nums.length - 1;
        let index = -1;
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (nums[mid] === target) {
                index = mid;         // Save the index
                low = mid + 1;       // Keep looking on the right
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return index;
    }

    let start = findFirst(nums, target);
    let end = findLast(nums, target);

    return [start, end];
};


console.log([5, 7, 7, 8, 8, 10], 8);

