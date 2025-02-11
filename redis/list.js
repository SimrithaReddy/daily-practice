const client = require('./client');


async function listRedisFunction() {

    await client.lpush("messages", 1);
    await client.lpush("messages", 2);
    await client.lpush("messages", 3);
    await client.lpush("messages", 4);
    await client.lpush("messages", 5);
    await client.rpush("messages", 6);


    const result = await client.rpop("messages");
    await client.xadd('temp', '*', 't', '1');



    console.log(result);
};


listRedisFunction();

