const redis = require("redis");
const bluebird = require("bluebird");
const client = redis.createClient();
const fs = require('fs');
const {promisify} = require('util');
client.connect().catch(console.error);

const readFileAsync = promisify(fs.readFile);

async function main() {
    // load from file eval
    let stockLeft;
    let amount = '2';
    try {
        const lua_script = await readFileAsync('./lua_pubsub/lua_script/getset.lua', 'utf8');
        stockLeft = await client.eval(lua_script, {
            keys: ['mouse'],
            arguments: [amount]
        });
    } catch (exception) {
        console.error("Lua Script Error: "+exception);
        stockLeft = 0;
    }
    console.log(stockLeft);
}

main();