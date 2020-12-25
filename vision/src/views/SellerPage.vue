<!--
针对/sellerpage这条路径而显示出来的
在这个组件
-->
<template>
    <div class="com-page">
      <seller></seller>
    </div>
</template>

<script>
import Seller from '@/components/seller'
export default {
  data () {
    return {}
  },
  methods: {},
  components: {
    seller: Seller
  }
}
</script>

<style lang="less" scoped>
</style>
