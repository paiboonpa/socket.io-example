const redis = require("redis");
const bluebird = require("bluebird");
const client = redis.createClient();
const fs = require('fs');
const {promisify} = require('util');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const readFileAsync = promisify(fs.readFile);

async function main() {
    // Basic eval
    let command = "redis.call('set', 'foo', 'bar')\n";
    command += "return redis.call('get','foo')";
    let result = await client.evalAsync(command, 0);
    console.log(result);

    // unpack example
    command = `
local arr = {1,2,3}
local func = function(param1, param2, param3)
  return param3
end

return func( unpack(arr) )
    `;
    result = await client.evalAsync(command, 0);
    console.log("unpack result: " + result);

    // load from file eval
    let result2;
    try {
        const lua_script = await readFileAsync('lua_script/getset.lua', 'utf8');
        result2 = await client.evalAsync(lua_script, 1, 'mouse');
    } catch (exception) {
        console.error("Lua Script Error: "+exception);
        result2 = 0;
    }
    console.log(result2);
}

main();