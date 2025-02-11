const express = require('express');
const axios = require('axios');
const client = require('./client');
const app = express();


app.get('/', async (req, res) => {
    
    //cur category
    //get api-------------->chapter topics
    //generating real time data------------>relation topic Id

    //websocket



    const cacheValue = await client.get('todos');
    

    //200000

    //100
    //1000


    //200000



    if (cacheValue) return res.json(JSON.parse(cacheValue));



    const { data} = await axios.get('https://jsonplaceholder.typicode.com/todos');


    await client.set('todos', JSON.stringify(data));
    await client.expire('todos', 30);//seconds

    return res.json(data);
    
});


app.listen(9000, (() => {
    console.log('server running at 9000......')
}));

