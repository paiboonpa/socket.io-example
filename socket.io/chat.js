const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
  console.log(socket.id);
    socket.on('chat message', function(msg){
      let dataObj = {
        sender: 'admin',
        message: msg
      };
      socket.emit('chatMessageClient',dataObj);
      //socket.join('some room');

      console.log('message: ' + msg);
    });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});
    