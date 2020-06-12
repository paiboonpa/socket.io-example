const redis = require("redis");
const sub = redis.createClient(), 
      pub = redis.createClient(),
      store = redis.createClient();

sub.subscribe('myChannel');
sub.subscribe('myJsonChannel');
sub.on("subscribe", function (channel, count) {
  console.log(channel, count);
});
sub.on("message", (channel, message) => {
  console.log('Channel : ' + channel);
  console.log('Message : ' + message);
});