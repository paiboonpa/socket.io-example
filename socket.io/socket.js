import { Server } from 'socket.io';

const io = new Server();
io.listen(3000);
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});