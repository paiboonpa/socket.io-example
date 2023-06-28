const redis = require("redis");
const client = redis.createClient();
const sub = client.duplicate(), 
      pub = client.duplicate();
const myInstanceName = 'instance2';

async function main() {
    await sub.connect().catch(console.error);
    await pub.connect().catch(console.error);
    await client.connect().catch(console.error);

    sub.subscribe('myChannel', (message, channel) => {
        //if (myInstanceName == 'instance2')
            console.log("111", message, channel)
    });

    const myObject = {
        key1:1,
        key2:2
    };
    
    pub.publish("myChannel", "I am sending a message.");
    pub.publish("myJsonChannel", JSON.stringify(myObject));    
}

main();