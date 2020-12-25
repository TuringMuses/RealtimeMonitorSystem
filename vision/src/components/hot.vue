<template>
  <div class="com-container">
    <div class="com-chart" ref="hot_ref"></div>
    <span class="arr-left" @click="toLeft" :style="comStyle">上一个</span>
    <span class="arr-right" @click="toRight" :style="comStyle">下一个</span>
    <span class="cat-name" :style="comStyle">{{ catName }}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chartInstance: null,
      allData: null,
      currentIndex: 0,
      titleFontSize: 0
    }
  },
  created () {
    this.$socket.registerCallBack('hotproductData', this.getData)
  },
  computed: {
    catName () {
      if (!this.allData) {
        return ''
      } else {
        return this.allData[this.currentIndex].name
      }
    },
    comStyle () {
      return {
        fontSize: this.titleFontSize + 'px'
      }
    }
  },
  mounted () {
    this.initChart()
    // this.getData()
    // 发送数据给服务器，告诉服务器现在需要数据
    this.$socket.send({
      action: 'getData',
      socketType: 'hotproductData',
      chartName: 'hotproduct',
      value: ''
    })
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
    this.$socket.unRegisterCallBack('hotproductData')
  },
  methods: {
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.hot_ref, 'vintage')
      const initOption = {
        title: {
          text: '▌监控数据分布',
          left: 20,
          top: 20
        },
        legend: {
          top: '15%',
          icon: 'circle'
        },
        series: [
          {
            type: 'pie',
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true
              },
              labelLine: {
                show: false
              }
            }
          }
        ]
      }
      this.chartInstance.setOption(initOption)
    },
    getData (ret) {
      // const { data: ret } = await this.$http.get('hotproduct')
      this.allData = ret
      console.log(this.allData)
      this.updateChart()
    },
    updateChart () {
      const legendData = this.allData[this.currentIndex].children.map(item => {
        return item.name
      })
      const seriesData = this.allData[this.currentIndex].children.map(item => {
        return {
          name: item.name,
          value: item.value
        }
      })
      const dataOption = {
        legend: {
          data: legendData
        },
        series: [
          {
            data: seriesData
          }
        ]
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter () {
      this.titleFontSize = this.$refs.hot_ref.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: this.titleFontSize
          }
        },
        legend: {
          itemWidth: this.titleFontSize / 2,
          itemHeight: this.titleFontSize / 2,
          itemGap: this.titleFontSize / 2,
          textStyle: {
            fontSize: this.titleFontSize / 1.1
          }
        },
        series: [
          {
            radius: this.titleFontSize * 4.5,
            center: ['50%', '60%']
          }
        ]
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    toLeft () {
      this.currentIndex--
      if (this.currentIndex < 0) {
        this.currentIndex = this.allData.length - 1
      }
      this.updateChart()
    },
    toRight () {
      this.currentIndex++
      if (this.currentIndex > this.allData.length - 1) {
        this.currentIndex = 0
      }
      this.updateChart()
    }
  }
}
</script>

<style lang="less" scoped>
.arr-left {
  position: absolute;
  left: 10%;
  top: 60%;
  transform: translateY(-50%);
  cursor: pointer;
  color: black;
}
.arr-right {
  position: absolute;
  right: 10%;
  top: 60%;
  transform: translateY(-50%);
  cursor: pointer;
  color: black;
}
.cat-name {
  position: absolute;
  left: 80%;
  bottom: 40px;
  color: rgb(146, 14, 14);
  font-weight: bold;
}

</style>
