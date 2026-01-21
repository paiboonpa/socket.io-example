import { createClient } from 'redis';

const client = createClient({
    url: 'redis://localhost:6379'
  });
client.connect().catch(console.error);

async function main() {
    await client.set('mykey','testValue');
    console.log(await client.get('mykey')); // testValue
    const myJson = {a:1, b:2};
    await client.set('my_json',JSON.stringify(myJson));
    await client.hSet('my_json2',{
        'dd': JSON.stringify(myJson),
        'ee': 11,
        'ff': 22
    });
    const myJson2 = JSON.parse( await client.get('my_json') );
    console.log(myJson2); // { a: 1, b: 2 }
    const myJson3 = await client.hGetAll('my_json2');

    console.log(myJson3); // { a: 1, b: 2 }
    console.log(JSON.parse( myJson3.dd) );
}

main();
