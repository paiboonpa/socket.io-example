const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const Router = require('koa-router');
const router = new Router();

const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

router.get('/', async (ctx, next) => {
    ctx.body = await readFile(__dirname + '/public/index.html', 'utf8');
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