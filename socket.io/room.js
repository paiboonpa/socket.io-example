const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/room0/:message', function(req, res){
  roomHistory['room0'] += '<span style="color: red">' + req.params.message + "</span><br>";
  io.to('room0').emit('roomMessage', roomHistory['room0']);
});

app.get('/room1/:message', function(req, res){
  roomHistory['room1'] += '<span style="color: red">' + req.params.message + "</span><br>";
  io.to('room1').emit('roomMessage', roomHistory['room1']);
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
  console.log(room);
  console.log(allUser);
  console.log("User Online (Concurrent) :", Object.keys(allUser).length);
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
      io.to(roomName).emit('roomMessage', roomHistory[roomName]);
      
      // send message to everyone in roomName except itself
      //socket.broadcast.to(roomName).emit('roomMessage', roomHistory[roomName]);
      
      // send message to everyone in every room
      //io.sockets.emit('roomMessage', roomHistory[roomName]);
  });
});

/*setInterval(function() {
  roomHistory['room0'] += "Hello Room0" + "<br>";
  io.to('room0').emit('roomMessage', roomHistory['room0']);
}, 3000);
setInterval(function() {
  roomHistory['room1'] += "Hello Room1" + "<br>";
  io.to('room1').emit('roomMessage', roomHistory['room1']);
}, 1500);
*/
server.listen(3000, function(){
  console.log('listening on *:3000');
});
    