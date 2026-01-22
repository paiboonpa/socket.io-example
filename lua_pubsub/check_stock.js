import { createClient } from 'redis';
import fs from 'node:fs/promises';

const client = createClient();
client.connect().catch(console.error);

async function main() {
    // load from file eval
    let stockLeft;
    let amount = '2';
    try {
        const lua_script = await fs.readFile('./lua_pubsub/lua_script/getset.lua', 'utf8');
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