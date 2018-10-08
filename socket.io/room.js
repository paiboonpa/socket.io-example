const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

function serverRoomManage(socket) {
  let totalUserNum = Object.keys(allUser).length;
  let roomNo = totalUserNum % 2;
  let roomName = 'room'+roomNo;
  socket.join(roomName);

  socket.emit('roomMessage', roomHistory[roomName]);

  allUser[socket.id] = roomName;
  room[roomNo].push(socket.id);
  console.log(socket.id + " joined room" + roomNo);
  //console.log(room);
  //console.log("User Online (Concurrent) :", allUser.length);
}

let allUser = {};
let room = [];
room[0] = [];
room[1] = [];
let roomHistory = {
  room0: '',
  room1: ''
};

io.on('connection', function(socket){
  serverRoomManage(socket);

  socket.on('chat message', function(msg){
      let roomName = allUser[socket.id];
      roomHistory[roomName] += msg + "<br>";
      console.log(roomHistory);
      // send message to everyone in roomName
      //io.to(roomName).emit('roomMessage', roomHistory[roomName]);
      
      // send message to everyone in roomName except itself
      //socket.broadcast.to(roomName).emit('roomMessage', roomHistory[roomName]);
      
      // send message to everyone in every room
      io.sockets.emit('roomMessage', roomHistory[roomName]);
  });
});

/*
setInterval(function() {
  io.to('room0').emit('roomMessage', "Hello Room0");
}, 1000);
setInterval(function() {
  io.to('room1').emit('roomMessage', "Hello Room1");
}, 500);
*/

server.listen(3000, function(){
  console.log('listening on *:3000');
});
    