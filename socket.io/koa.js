import Koa from 'koa';
import serve from 'koa-static';
import Router from 'koa-router';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { readFile } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = new Koa();
const router = new Router();

const server = createServer(app.callback());
const io = new Server(server);

router.get('/', async function (ctx, next) {
    ctx.body = await readFile(__dirname + '/index.html', 'utf8');
    await next();
});

router.get('/page1', async function (ctx, next) {
    ctx.body = 'Hello World1';
    await next();
});

router.get('/page2', async function (ctx, next) {
    ctx.body = 'Hello World2';
    await next();
});

app.use(serve('public'));
app.use(router.routes());

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
});

server.listen(3000);