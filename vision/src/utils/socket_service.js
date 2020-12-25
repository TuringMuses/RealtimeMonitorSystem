// 1.定义类SocketService，并定义成单例的设计模式
export default class SocketService {
  // 单例的设计模式
  static instance = null
  // 保证多次获取的都是同一个对象
  static get Instance () {
    if (!this.instance) {
      this.instance = new SocketService()
    }
    return this.instance
  }

  // 和服务端连接的websocket对象
  ws = null

  // 存储回调函数
  callBackMapping = {}

  // 标识是否连接成功了
  connected = false

  // 尝试发送不成功的次数
  sendRetyrCount = 0

  connectRetryCount = 0

  // 2.定义连接服务器的方法connect
  connect () {
    // 连接服务器
    if (!window.WebSocket) {
      return console.log('您的浏览器不支持WebSocket')
    }
    this.ws = new WebSocket('ws://localhost:9998')

    // 连接成功事件监听
    this.ws.onopen = () => {
      console.log('连接服务端成功')
      this.connected = true
      this.connectRetryCount = 0
    }
    // 连接失败事件监听
    this.ws.onclose = () => {
      console.log('连接服务端失败')
      this.connected = false
      this.connectRetryCount++
      setTimeout(() => {
        this.connect()
      }, this.connectRetryCount * 500)
    }
    // 得到服务端发送过来的数据
    this.ws.onmessage = msg => {
      console.log('从服务端获取到了数据')
      console.log(msg.data)
      const recvData = JSON.parse(msg.data)
      const socketType = recvData.socketType
      // 判断回调函数是否被注册
      if (this.callBackMapping[socketType]) {
        const action = recvData.action
        if (action === 'getData') {
          const realData = JSON.parse(recvData.data)
          this.callBackMapping[socketType].call(this, realData)
        } else if (action === 'fullScreen') {

        } else if (action === 'themeChange') {

        }
      }
    }
  }

  // 4.注册回调函数
  registerCallBack (socketType, callBack) {
    this.callBackMapping[socketType] = callBack
  }

  // 取消回调函数的注册
  unRegisterCallBack (socketType) {
    this.callBackMapping[socketType] = null
  }

  // 定义发送数据方法
  send (data) {
    if (this.connected) {
      this.ws.send(JSON.stringify(data))
      this.sendRetyrCount = 0
    } else {
      this.sendRetyrCount++
      setTimeout(() => {
        this.send(data)
      }, this.sendRetryCount * 500)
    }
  }
}
