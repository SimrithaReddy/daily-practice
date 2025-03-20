const obj = {
    K1: {
        K2: {
            K3: 3,
            K4: {
                K5: 5
            }
        }
    }
};

function updateObjVal(obj, path = "K1.K2.K3", newValue = 7) {
    const keys = path.split('.'); // Split the path into an array of keys
    let current = obj;

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (current.hasOwnProperty(key)) {
            if (i === keys.length - 1) {
                current[key] = newValue; // Update the value if it's the last key in the path
            } else {
                current = current[key]; // Move to the next nested object
            }
        }
    }
}

updateObjVal(obj, "k1.K2.K8.K4.K6", 10); // Assigns 10 to obj.K1.K2.K4.K6
console.log(obj);

