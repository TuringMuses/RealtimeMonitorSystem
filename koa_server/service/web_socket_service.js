const path = require('path')
const fileUtils = require('../utils/file_utils')
const WebSocket = require('ws')
const wss = new WebSocket.Server({
    port: 9998
})

//服务端开启了监听
module.exports.listen = () => {
    //对客户端的连接对象进行监听
    //client代表客户端的连接对象
    wss.on('connection', client => {
        console.log('有客户端连接成功了...')
        //对客户端的连接对象进行message事件的监听
        client.on('message', async msg => {
            console.log('客户端发送数据给服务端了：'+msg)
            let payload = JSON.parse(msg)
            const action = payload.action
            if(action === 'getData'){
                let filePath = '../data/'+payload.chartName +'.json'
                filePath = path.join(__dirname,filePath)
                const ret = await fileUtils.getFileJsonData(filePath)
                //需要在服务端获取到数据的基础上，增加一个data字段
                payload.data = ret
                client.send(JSON.stringify(payload))
            }else{
                //原封不动地将所接收到的数据转发给每一个处于连接状态的客户端
                wss.clients.forEach(client => {
                    client.send(msg)
                })

            }
            //由服务端向客户端发送数据
            //client.send('hello socket from backend')
        })
    })
}
