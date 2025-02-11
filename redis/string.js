const client = require('./client');


async function redisStrFunction() {
    // await client.set('msg:6', 'Hey from nodejs redis');
    // await client.expire('msg:6', 10);
    const result = await client.get('msg:6');

    console.log('Result', result);
};



redisStrFunction();