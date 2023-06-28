const redis = require("redis");
const client = redis.createClient();
client.connect().catch(console.error);

async function main() {
    await client.set('mykey','testValue');
    console.log(await client.get('mykey')); // testValue
    const myJson = {a:1, b:2};
    await client.set('my_json',JSON.stringify(myJson));
    await client.hSet('my_json2','dd',JSON.stringify(myJson));
    const myJson2 = JSON.parse( await client.get('my_json') );
    console.log(myJson2); // { a: 1, b: 2 }
    const myJson3 = JSON.parse( await client.get('my_json') );
    console.log(myJson3); // { a: 1, b: 2 }
}

main();
