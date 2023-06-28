const redis = require("redis");
const bluebird = require("bluebird");
const client = redis.createClient();
const fs = require('fs');
const {promisify} = require('util');
client.connect().catch(console.error);

const readFileAsync = promisify(fs.readFile);

async function main() {
    // load from file eval
    let result;
    const product = {
        mouse: 9,
        keyboard: 5,
        adapter: 3
    }
    try {
        const lua_script = await readFileAsync('./lua_script/init_stock.lua', 'utf8');
        result = await client.eval(lua_script, {
            keys: ['key1'],
            arguments: [JSON.stringify(product)]
        });
    } catch (exception) {
        console.error("Lua Script Error: "+exception);
    } 
}

main();