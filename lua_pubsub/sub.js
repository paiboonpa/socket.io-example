import { createClient } from 'redis';

const client = createClient();
const sub = client.duplicate(),
      pub = client.duplicate();
   
async function main() {
  await sub.connect().catch(console.error);
  await pub.connect().catch(console.error);
  await client.connect().catch(console.error);

  sub.subscribe('myChannel', (message, channel) => {
    console.log("sub.js log ", message, channel)
    pub.publish("myChannelBack", " World");
  });
}
main();