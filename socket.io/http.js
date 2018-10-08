const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});
    