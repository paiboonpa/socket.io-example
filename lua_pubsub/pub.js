const redis = require("redis");
const sub = redis.createClient(), 
      pub = redis.createClient(),
      store = redis.createClient();

sub.on("message", (channel, message) => {
    console.log('Channel : ' + channel);
    console.log('Message : ' + message);
});

pub.publish("myChannel", "I am sending a message.");