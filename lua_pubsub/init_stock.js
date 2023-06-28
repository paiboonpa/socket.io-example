const redis = require("redis");
const bluebird = require("bluebird");
const client = redis.createClient();
const fs = require('fs');
const {promisify} = require('util');
client.connect().catch(console.error);

const readFileAsync = promisify(fs.readFile);

async function main() {
    // Basic eval
    let command = "redis.call('set', 'foo', 'bar')\n";
    command += "return redis.call('get','foo')";
    let result = await client.eval(command, 0);
    console.log(result);

    // unpack example
    command = `
local arr = {1,2,3}
local func = function(param1, param2, param3)
  return param3
end

return func( unpack(arr) )
    `;
    result = await client.eval(command, 0);
    console.log("unpack result: " + result);

    // load from file eval
    let result2;
    const product = {
        mouse: 9,
        keyboard: 5,
        adapter: 3
    }
    try {
        const lua_script = await readFileAsync('./lua_pubsub/lua_script/init_stock.lua', 'utf8');
        result2 = await client.eval(lua_script, {
            keys: ['key1'],
            arguments: [JSON.stringify(product)]
        });
    } catch (exception) {
        console.error("Lua Script Error: "+exception);
    }
    console.log(result2);
}

main();