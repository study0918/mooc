require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})




console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it

  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
  }
  _resolve()
})


var server = app.listen(port);

/******socket.io*******/
var bodyParser = require('body-parser'); 
var io = require('socket.io').listen(server);

server.listen(port, function(){
    console.log('waiting')
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
// app.use(require('express').static(path.join(__dirname, 'src')));

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');


// // app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

// app.get('/a', function (req, res) {
//     res.render('webcam');
// });

var roomInfo = {};
io.sockets.on('connection', function(socket) {
    var url = socket.request.headers.referer;

    var splited = url.split('/');
    var roomID = splited[splited.length - 1];   // 获取房间ID
    var roomID = '';
    var user = '';

    // socket.on('join', function (userName) {
    //     console.log('这里有个:',userName)
    //     user = userName;
    //       // 将用户昵称加入房间名单中
    //     if (!roomInfo[roomID]) {
    //         roomInfo[roomID] = [];
    //         return;
    //     }

    //     roomInfo[roomID].push(user);
    //     socket.join(roomID);    // 加入房间
    //     // 通知房间内人员
    //     io.to(roomID).emit('sys', user + '加入了房间', roomInfo[roomID]);  
    //     console.log(user + '加入了' + roomID);
    // });
     socket.on('join', function (userName) {
        console.log('这里有个:',userName)
        user = userName;
          // 将用户昵称加入房间名单中
        if (!roomInfo[user]) {
            roomInfo[user] = [];
            return;
        }

        roomInfo[user].push(user);
        socket.join(user);    // 加入房间

        // 通知房间内人员
        // io.to(user).emit('sys', user + '加入了房间', roomInfo[user]);  

        socket.on('touchstart',function(data){
            io.to(user).emit('touchstart',data)
        })

        socket.on('touchmove',function(data){
            io.to(user).emit('touchmove',data);
        })
        socket.on('touchend',function(data){
            io.to(user).emit('touchend',data);
        })

        socket.on('changeTool',function(data){
            io.to(user).emit('changeTool',data);
        })

        socket.on('clearScreen',function(data){
            io.to(user).emit('clearScreen',data);
        })

        socket.on('showColor',function(data){
            io.to(user).emit('showColor',data);
        })

        socket.on('changeColor',function(data){
            io.to(user).emit('changeColor',data);
        })

        socket.on('changeCursor',function(data){
            io.to(user).emit('changeCursor',data);
        })

        socket.on('switchBoard',function(data){
            io.to(user).emit('switchBoard',data);
        })

        socket.on('textInsert',function(data){
            io.to(user).emit('textInsert',data);
        })

        socket.on('textValue',function(data){
            io.to(user).emit('textValue',data);
        })

        socket.on('changeToolWidth',function(data){
            io.to(user).emit('changeToolWidth',data);
        })

        socket.on('textCancel',function(data){
            io.to(user).emit('textCancel',data);
        })

        socket.on('hideBoard',function(data){
            io.to(user).emit('hideBoard',data)
        })
    });

    socket.on('leave', function () {
        socket.emit('disconnect');
    });

    socket.on('disconnect', function () {
        // 从房间名单中移除
        var index = roomInfo[user].indexOf(user);
        if (index !== -1) {
            roomInfo[user].splice(index, 1);
        }

        socket.leave(user);    // 退出房间
        io.to(user).emit('sys', user + '退出了房间', roomInfo[user]);      
        console.log(user + '退出了' + user);
    });

    // 接收用户消息,发送相应的房间
    socket.on('message', function (msg) {
      // 验证如果用户不在房间内则不给发送
      if (roomInfo[roomID].indexOf(user) === -1) {  
          return false;
      }
      io.to(roomID).emit('msg', user, msg);
    });
        
});
/******socket.io*******/

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
