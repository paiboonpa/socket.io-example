import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer();
const io = new Server(server);

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});
    