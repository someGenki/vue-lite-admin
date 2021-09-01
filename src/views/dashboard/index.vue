<template>
  <div class="dashboard-container">
    <Cards :gutter="10" :style="{ marginBottom: '10px' }" />
    <el-row :gutter="10">
      <el-col style="position: relative" :xs="24" :sm="12" :lg="6">
        <div style="height: 300px" ref="shop" />
      </el-col>
      <el-col class="quick-nav" :xs="24" :sm="12" :lg="6">
        <p style="font-size: 18px; font-weight: bolder">快捷导航</p>
        <div>
          <a
            target="_blank"
            href="https://v3.cn.vuejs.org/"
            class="quick-nav__card"
          >
            <img width="80" src="https://v3.cn.vuejs.org/logo.png" />
            <p>Vue.js3中文文档</p>
            <span>渐进式 JavaScript 框架</span>
          </a>
          <a
            target="_blank"
            href="https://element-plus.gitee.io/#/zh-CN/"
            class="quick-nav__card"
          >
            <img width="80" src="/src/assets/element-logo.svg" />
            <p>Element Plus文档</p>
            <span>Vue 3的桌面端组件库</span>
          </a>
        </div>
      </el-col>
      <el-col style="position: relative" :xs="24" :sm="12" :lg="6">
        <Todo />
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
import pie1option from './options/pie1option'

export default {
  name: 'Dashboard',
  components: { Todo, Cards },
  setup() {
    const shop = ref(null)

    onMounted(() => {
      let myChart = echarts.init(shop.value)
      myChart.setOption(pie1option)
      window.addEventListener('resize', () => myChart.resize())
    })

    // TODO 抽离 "quick-nav"成一个公共组件

    return { shop }
  },
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  //margin-right: 10px;
}

:global(.el-col){
  margin-bottom: 6px;
}

.quick-nav {
  > p {
    margin-top: 5px;
  }

  &__card {
    display: inline-flex;
    flex-flow: column wrap;
    align-items: center;
    padding: 10px;
    margin: 6px;
    text-align: center;
    //border: 1px solid #d0d9e1;
    background-color: white;
    border-radius: 10px;
    transition: box-shadow 0.25s;

    > p {
      font-size: 1.1rem;
      font-weight: bold;
      color: #337ab7;
    }

    > span {
      font-size: 0.9rem;
    }

    &:hover {
      box-shadow: 4px 10px 16px rgb(36 37 38 / 13%);
    }
  }
}

.el-col {
 margin-bottom: 5px;
}

.visited-panel {
  > .show-visited {
    font-weight: bold;

    .visited-num {
      font-size: 1.1rem;
      color: var(--primary-text-color-tinge);
    }
  }

  > .icon-wrapper {
    font-size: 4rem;
    color: var(--primary-text-color);
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      color: #fff;
      background-color: var(--primary-color-tinge);
      border-radius: 8px;
    }
  }
}
</style>
