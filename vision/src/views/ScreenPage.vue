<template>
  <div class="screen-container">
    <header class="screen-header">
      <!--
      <div>
        <img src="/static/img/header_border_dark.png" alt="">
      </div>
      <span class="logo">
        <img src="/static/img/logo_dark.png" alt="">
      </span>
      -->
      <span class="title" background>业务数据实时监控系统</span>
      <div class="title-right">
        <!--<img src="/static/img/qiehuan_dark.png" class="qiehuan">-->
        <span class="datetime">2021-01-01 00:00:00</span>
      </div>
    </header>
    <div class="screen-body">
      <section class="screen-left">
        <div id="left-top" :class="[fullScreenStatus.trend ? 'fullscreen' : '']">
          <!--销量趋势图表-->
          <trend ref="trend"></trend>
          <div class="resize">
            <span @click="changeSize('trend')" class="iconfont icon-expend-alt">{{fullScreenStatus.trend ? '缩小' : '放大'}}</span>
          </div>
        </div>
        <div id="left-bottom" :class="[fullScreenStatus.seller ? 'fullscreen' : '']">
          <!--商家销售金额图表-->
          <seller ref="seller"></seller>
          <div class="resize">
            <span @click="changeSize('seller')" class="iconfont icon-expend-alt">{{fullScreenStatus.seller ? '缩小' : '放大'}}</span>
          </div>
        </div>
      </section>
      <section class="screen-middle">
        <div id="middle-top" :class="[fullScreenStatus.map ? 'fullscreen' : '']">
          <!--商家分布图表-->
          <single-map ref="map"></single-map>
          <div class="resize">
            <span @click="changeSize('map')" class="iconfont icon-expend-alt">{{fullScreenStatus.map ? '缩小' : '放大'}}</span>
          </div>
        </div>
        <div id="middle-bottom" :class="[fullScreenStatus.rank ? 'fullscreen' : '']">
          <!--地区销量排行图表-->
          <rank ref="rank"></rank>
          <div class="resize">
            <span @click="changeSize('rank')" class="iconfont icon-expend-alt">{{fullScreenStatus.rank ? '缩小' : '放大'}}</span>
          </div>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top" :class="[fullScreenStatus.hot ? 'fullscreen' : '']">
          <!--热销商品图表-->
          <hot ref="hot"></hot>
          <div class="resize">
            <span @click="changeSize('hot')" class="iconfont icon-expend-alt">{{fullScreenStatus.hot ? '缩小' : '放大'}}</span>
          </div>
        </div>
        <div id="right-bottom" :class="[fullScreenStatus.stock ? 'fullscreen' : '']">
          <!--库存销量分析图表-->
          <stock ref="stock"></stock>
          <div class="resize">
            <span @click="changeSize('stock')" class="iconfont icon-expend-alt">{{fullScreenStatus.stock ? '缩小' : '放大'}}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import hot from '@/components/hot.vue'
import map from '@/components/map.vue'
import rank from '@/components/rank.vue'
import seller from '@/components/seller.vue'
import stock from '@/components/stock.vue'
import trend from '@/components/Trend.vue'

export default {
  data () {
    return {
      // 定义每一图表的全屏状态数据
      fullScreenStatus: {
        trend: false,
        seller: false,
        map: false,
        rank: false,
        hot: false,
        stock: false
      }
    }
  },
  components: {
    hot: hot,
    'single-map': map,
    rank: rank,
    seller: seller,
    stock: stock,
    trend: trend
  },
  methods: {
    changeSize (chartName) {
      this.fullScreenStatus[chartName] = !this.fullScreenStatus[chartName]
      this.$nextTick(() => {
        this.$refs[chartName].screenAdapter()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.fullscreen {
  position:fixed !important;
  top:0 !important;
  left:0 !important;
  width:100% !important;
  height:100% !important;
  margin:0  !important;
  z-index:100;
}
.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
}
.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
  > div {
      img {
        width: 100%;
      }
  }
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 30px;
    transform: translate(-50%,-50%);
  }
  .title-right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
  }
  .qiehuan {
    width: 20px;
    height: 21px;
    cursor: pointer;
  }
  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }
  .logo {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-80%);
    img {
      height: 35px;
      width: 128px;
    }
  }
}
.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;
  .screen-left {
    height: 100%;
    width:27.6%;
    #left-top {
      height: 46%;
      position: relative;
    }
    #left-bottom {
      height: 38%;
      margin-top: 25px;
      position: relative;
    }
  }
  .screen-middle {
    height: 100%;
    width:41.5%;
    margin-left: 1.6%;
    margin-right: 1.6%;
    #middle-top {
      width: 100%;
      height: 56%;
      position: relative;
    }
    #middle-bottom {
      margin-top: 25px;
      width: 100%;
      height: 28%;
      position: relative;
    }
  }
  .screen-right {
    height: 100%;
    width:27.6%;
    #right-top {
      height: 46%;
      position: relative;
    }
    #right-bottom {
      margin-top: 25px;
      height: 38%;
      position: relative;
    }
  }
}
.resize {
  position: absolute;
  right: 20px;
  top:20px;
  color: black;
  cursor:pointer;
}

</style>
