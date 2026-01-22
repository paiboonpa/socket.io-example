import { createClient } from 'redis';
import fs from 'node:fs/promises';

const client = createClient();
client.connect().catch(console.error);

async function main() {
    // load from file eval
    let result;
    const product = {
        mouse: 9,
        keyboard: 5,
        adapter: 3
    }
    try {
        const lua_script = await fs.readFile('./lua_pubsub/lua_script/init_stock.lua', 'utf8');
        result = await client.eval(lua_script, {
            keys: ['key1'],
            arguments: [JSON.stringify(product)]
        });
    } catch (exception) {
        console.error("Lua Script Error: "+exception);
    } 
}

main();