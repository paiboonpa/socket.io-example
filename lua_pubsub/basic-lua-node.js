import { createClient } from 'redis';
import fs from 'fs';

const client = createClient();
client.connect().catch(console.error);

async function main() {
    // Basic eval
    let command = "redis.call('set', 'foo', 'bar')\n";
    command += "return redis.call('get','foo')";
    let result = await client.eval(command);
    console.log(result);

    command = "redis.call('set', KEYS[2], ARGV[1])\n";
    command += "return redis.call('get',KEYS[1])";
    let paramObj = {
        keys: ['foo', 'foo2'],
        arguments: ['bar']
    };
    result = await client.eval(command, paramObj);
    console.log(result);

    // unpack example
    command = `
local arr = {1,2,3}
local func = function(param1, param2, param3)
  return param3
end

return func( unpack(arr) )
    `;
    result = await client.eval(command);
    console.log("unpack result: " + result);

    command = "return redis.call(KEYS[1],ARGV[1])";
    paramObj = {
        keys: ['get'],
        arguments: ['foo']
    };

    result = await client.eval(command, paramObj);
    console.log(result);
      
}

main();