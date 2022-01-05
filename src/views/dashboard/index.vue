<template>
  <div style="position: relative">
    <Cards :gutter="10" :style="{ marginBottom: '10px' }" />
    <el-row :gutter="10">
      <el-col style="position: relative" :xs="24" :sm="12" :lg="6">
        <div style="height: 300px" ref="shop" />
      </el-col>
      <el-col class="quick-nav" :xs="24" :sm="12" :lg="6">
        <p style="margin-top: 0;font-size: 18px; font-weight: bolder;">快捷导航</p>
        <easy-nav :navs="navList" />
      </el-col>
      <el-col style="position: relative" :xs="24" :sm="12" :lg="6">
        <Todo />
      </el-col>
      <el-col
        style="
          height: 300px;
          padding: 12px;
          overflow: hidden;
          border-radius: 1rem;
        "
        :xs="24"
        :sm="12"
        :lg="6"
      >
        <el-tooltip
          content="免费插画网站推荐 https://mixkit.co/free-stock-art/"
          placement="top"
        >
          <img
            style="width: 100%; margin-top: -30px"
            src="https://mixkit.imgix.net/art/preview/mixkit-woman-holding-a-guidebook-or-map-90-square-medium.png?q=80&auto=format%2Ccompress"
            alt=""
        /></el-tooltip>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// https://element-plus.gitee.io/#/zh-CN/component/layout
// element-plus响应式布局分24栏, 为简化只关注xs,sm和lg。分别是小于768px,大于768px和大于1200px
// 数字增加 https://blog.csdn.net/sunny123x/article/details/102589067
// 请求动画帧 https://github.com/PanJiaChen/vue-countTo/blob/master/src/requestAnimationFrame.js
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import Cards from './components/Cards.vue'
import Todo from '/src/components/Todo/index.vue'
import EasyNav from '/src/components/EasyNav/index.vue'
import pie1option from './options/pie1option'
import navList from './options/navList'

export default {
  name: 'Dashboard',
  components: { Todo, Cards, EasyNav },
  setup() {
    const shop = ref(null)

    onMounted(() => {
      let myChart = echarts.init(shop.value)
      myChart.setOption(pie1option)
      window.addEventListener('resize', () => myChart.resize())
    })

    return { shop, navList }
  },
}
</script>

<style lang="scss" scoped>
.el-col {
  margin-bottom: 4px;
}
</style>
