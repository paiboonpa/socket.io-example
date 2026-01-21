import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

const pubClient = createClient({ host: 'localhost', port: 6379 });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
    io.adapter(createAdapter(pubClient, subClient));
    server.listen(3000, function(){
        console.log('listening on *:3000');
    });
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

