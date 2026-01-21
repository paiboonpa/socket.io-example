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

app.get('/', function(req, res, next){
  res.sendFile(__dirname + '/index.html');
});

app.get('/page2', function(req, res, next){
    res.send('Hello World2');
});

app.get('/page3', function(req, res, next){
  res.send('Hello World3');
});

app.get('/page4', function(req, res, next){
  res.send('Hello World4');
});

app.get('/page5', function(req, res, next){
  res.send('Hello World5');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});
    