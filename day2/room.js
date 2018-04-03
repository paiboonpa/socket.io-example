const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

let allUser = [];
let room = [];
room[0] = [];
room[1] = [];

io.on('connection', function(socket){
  let totalUserNum = allUser.length;
  let roomNo = totalUserNum % 2;
  socket.join('room'+roomNo);

  allUser.push(socket.id);
  room[roomNo].push(socket.id);
  console.log(socket.id + " joined room" + roomNo);
  console.log(room);
  console.log("User Online (Concurrent) :", allUser.length);

  socket.on('chat message', function(msg){
      socket.emit('chatMessageClient','Hello','World');
      //socket.join('some room');

      console.log('message: ' + msg);
  });
});

setInterval(function() {
  io.to('room0').emit('roomMessage', "Hello Room0");
}, 1000);
setInterval(function() {
  io.to('room1').emit('roomMessage', "Hello Room1");
}, 500);

server.listen(3000, function(){
  console.log('listening on *:3000');
});
    