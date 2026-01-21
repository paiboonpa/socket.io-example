import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
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
    