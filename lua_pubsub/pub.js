import { createClient } from 'redis';

const client = createClient();
const sub = client.duplicate(), 
      pub = client.duplicate();

async function main() {
    await sub.connect().catch(console.error);
    await pub.connect().catch(console.error);
    await client.connect().catch(console.error);

    sub.subscribe('myChannelBack', (message, channel) => {
        console.log("Message ReceiveBack: ", message, channel)
    });

    pub.publish("myChannel", "Hello ");  
}

main();