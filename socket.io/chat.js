const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        socket.emit('chatMessageClient','Hello','World');
        //socket.join('some room');

        console.log('message: ' + msg);
    });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});
    