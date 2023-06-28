const redis = require("redis");
const sub = redis.createClient(), 
      pub = redis.createClient(),
      store = redis.createClient();
    
sub.connect().catch(console.error);
pub.connect().catch(console.error);
store.connect().catch(console.error);

const myObject = {
    key1:1,
    key2:2
};

pub.publish("myChannel", "I am sending a message.");
pub.publish("myJsonChannel", JSON.stringify(myObject));