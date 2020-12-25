<!--商家销量统计的横向柱状图-->
<template>
    <div class="com-container">
        <div class="com-chart" ref="seller_ref"></div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      chartInstance: null,
      allData: null,
      currentPage: 1, // 当前显示的页面
      totalPage: 0, // 一共有多少页
      timerId: null
    }
  },
  created () {
    this.$socket.registerCallBack('sellerData', this.getData)
  },
  mounted () {
    this.initChart()
    // this.getData()
    // 发送数据给服务器，告诉服务器现在需要数据
    this.$socket.send({
      action: 'getData',
      socketType: 'sellerData',
      chartName: 'seller',
      value: ''
    })
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed () {
    clearInterval(this.timerId)
    this.$socket.unRegisterCallBack('sellerData')
  },
  methods: {
    // 初始化echartsInstance对象
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.seller_ref, 'vintage')
      // 对图表对象进行鼠标对象的监听，鼠标进入时停止图标更新
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timerId)
      })
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },
    getData (ret) {
      // http:127.0.0.1:8888/api/seller
      // const { data: ret } = await this.$http.get('seller')
      this.allData = ret
      // 将数据从小到大排序
      this.allData.sort((a, b) => {
        return a.value - b.value
      })
      // 计算一共有多少页
      this.totalPage = this.allData.length % 5 === 0 ? this.allData.length / 5 : this.allData.length / 5 + 1
      this.updateChart()
      this.screenAdapter()
      this.startInterval()
    },
    updateChart () {
      const start = (this.currentPage - 1) * 5
      const end = this.currentPage * 5
      const showData = this.allData.slice(start, end)
      const sellerNames = showData.map((item) => {
        return item.name
      })
      const sellerValues = showData.map((item) => {
        return item.value
      })
      const option = {
        title: {
          text: '▌用户分发统计',
          left: 20,
          top: 20
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true // 距离包含坐标轴上的文字
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: sellerNames
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              color: '#2d3443'
            }
          }
        },
        series: [
          {
            type: 'bar',
            data: sellerValues,
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: 'white'
              }
            },
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#5052EE'
                },
                {
                  offset: 1,
                  color: '#AB6EE5'
                }
              ])
            }
          }
        ]
      }
      this.chartInstance.setOption(option)
    },
    startInterval () {
      // 为保险起见，先clear一下
      if (this.timerId) {
        clearInterval(this.timerId)
      }
      this.timerId = setInterval(() => {
        this.currentPage++
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1
        }
        this.updateChart()
      }, 3000)
    },
    screenAdapter () {
      const titleFontSize = this.$refs.seller_ref.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFontSize
            }
          }
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0]
            }
          }
        ]
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
