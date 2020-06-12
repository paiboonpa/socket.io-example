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
    let result2;
    const product = {
        mouse: 2,
        keyboard: 5,
        adapter: 3
    }
    try {
        const lua_script = await readFileAsync('lua_script/init_stock.lua', 'utf8');
        result2 = await client.evalAsync(lua_script, 1, null, JSON.stringify(product));
    } catch (exception) {
        console.error("Lua Script Error: "+exception);
        result2 = 0;
    }
    console.log(result2);
}

main();