const redis = require("redis");
const client = redis.createClient();
const sub = client.duplicate(), 
      pub = client.duplicate();
const myInstanceName = 'instance1';
    
async function main() {
  await sub.connect().catch(console.error);
  await pub.connect().catch(console.error);
  await client.connect().catch(console.error);

  sub.subscribe('myChannel', (message, channel) => {
    //if (myInstanceName == 'instance1')
        console.log("111", message, channel)
  });
  sub.subscribe('myJsonChannel', (message, channel) => {
    console.log("222", message, channel)
  });
}

main();