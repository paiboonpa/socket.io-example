const redis = require("redis");
const bluebird = require("bluebird");
const client = redis.createClient();
const fs = require('fs');
const {promisify} = require('util');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const readFileAsync = promisify(fs.readFile);

async function main() {
    // load from file eval
    let stockLeft;
    try {
        const lua_script = await readFileAsync('lua_script/getset.lua', 'utf8');
        stockLeft = await client.evalAsync(lua_script, 1, 'mouse');
    } catch (exception) {
        console.error("Lua Script Error: "+exception);
        stockLeft = 0;
    }
    console.log(stockLeft);
}

main();