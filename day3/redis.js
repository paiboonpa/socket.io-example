const redis = require("redis");
const bluebird = require("bluebird");
const {promisify} = require('util');
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

async function main () {
    client.on("error", function (err) {
    console.log("Error " + err);
    });
    client.set("mykey", "myValue", redis.print);
    client.get("mykey", (err, result) => {
        console.log(result);
    });

    function myConsoleLog(msg) {
        console.log(msg)
    }

    async function getMyKey() {
        return await getAsync('mykey');
    } 

    console.log(await getAsync('mykey'));
    console.log(await client.getAsync('mykey'));
    myConsoleLog("Hello World");
    myConsoleLog(await getMyKey());
}

main();