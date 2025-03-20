let promise = new Promise(function (resolve, reject) {

    let x = 5;
    let y = 5;
    if (x === y) {
        resolve()
    }
    reject();
});


promise.
    then(function () {
        console.log('Success, You are a GEEK');
    }).
    catch(function () {
        console.log('Some error has occurred');
    }); 
