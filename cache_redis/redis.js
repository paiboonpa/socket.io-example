const redis = require("redis");
const client = redis.createClient();
client.on('error', err => console.log('Redis Client Error', err));

async function main() {
    await client.connect();
    await client.set('mykey','testValue');
    console.log(await client.get('mykey')); // testValue
    const myJson = {a:1, b:2};
    await client.set('my_json',JSON.stringify(myJson));
    const myJson2 = JSON.parse( await client.get('my_json') );

    console.log(myJson2); // { a: 1, b: 2 }
}

main();
