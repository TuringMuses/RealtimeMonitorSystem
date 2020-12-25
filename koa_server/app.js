//服务器的入口文件
//1.创建koa对象
const Koa = require('koa')
const app = new Koa()
//2.编写响应函数（中间件）
//绑定第一层中间件
const respDurationMiddleware = require('./middleware/koa_response_duration')
app.use(respDurationMiddleware)
//绑定第二层中间件
const respHeaderMiddleware = require('./middleware/koa_response_header')
app.use(respHeaderMiddleware)
//绑定第三层中间件
const respDataMiddleware = require('./middleware/koa_response_data')
app.use(respDataMiddleware)
//3.绑定端口号3000
app.listen(8888)

const webSocketService = require('./service/web_socket_service')  //require导入的时候就已经执行了前面连接的部分
//开启服务端的监听，监听客户端的连接
//当某个客户端连接成功之后，就对其message消息进行监听
webSocketService.listen()
