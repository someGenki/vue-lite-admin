<template>
  <div style="position: relative">
    <Cards :gutter="10" :style="{ marginBottom: '10px' }" />
    <el-row :gutter="10">
      <el-col style="position: relative" :xs="24" :sm="12" :lg="6">
        <div style="height: 300px" ref="shop" />
      </el-col>
      <el-col class="quick-nav" :xs="24" :sm="12" :lg="6">
        <p style="font-size: 18px; font-weight: bolder">快捷导航</p>
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

.quick-nav {
  > p {
    margin-top: 5px;
  }

  .nav-grid {
    display: grid;
    grid-template-rows: repeat(auto-fit, 150px);
    grid-template-columns: repeat(3, minmax(100px, 1fr));
    grid-gap: 6px;
  }

  &__card {
    position: relative;
    display: inline-flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    padding: 6px;
    text-align: center;
    background-color: white;
    border-radius: 12px;
    transition: box-shadow 0.25s;

    > img {
      width: 60%;
    }

    > p {
      max-width: 100%;
      margin: 6px 0;
      overflow: hidden;
      font-size: 70%;
      font-weight: bold;
      color: #337ab7; // 动态设置
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    > span {
      display: -webkit-box;
      overflow: hidden;
      font-size: 65%;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    &:hover {
      box-shadow: 4px 10px 16px rgb(36 37 38 / 13%);
    }
  }
}
</style>
