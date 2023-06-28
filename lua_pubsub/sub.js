const redis = require("redis");
const sub = redis.createClient(), 
      pub = redis.createClient(),
      store = redis.createClient();

sub.connect().catch(console.error);
pub.connect().catch(console.error);
store.connect().catch(console.error);

sub.subscribe('myChannel', (message, channel) => {
  console.log("111", message, channel)
});
sub.subscribe('myJsonChannel', (message, channel) => {
  console.log("222", message, channel)
});