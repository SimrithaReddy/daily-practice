const obj = {
    K1:
    {
        K2:
        {
            K3: 3,
            K4:
            {
                K5: 5
            }
        }
    }
};

function updateObjVal(obj, path = "obj.K1.K2.K3", newValue = 7) {

    const pathSplit = path.split(".");
    let current = obj;

    for (let i = 0; i < pathSplit.length - 1; i++) {
        current = current[pathSplit[i]];
        if (!current) return; // Exit if the path doesn't exist
    }

    current[pathSplit[pathSplit.length - 1]] = newValue;
    console.log(obj);
    console.log(obj);

};

updateObjVal(obj, path = "obj.K1.K2.K3", newValue = 7)


// Write code to update the key (given in the path) to new value as given in the function parameter } crct this