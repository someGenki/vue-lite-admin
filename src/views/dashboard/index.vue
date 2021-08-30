<template>
  <div class="dashboard-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :lg="6">
        <github />
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <bilibili />
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <earning />
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <we-chat />
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :lg="6">
        <div style="height: 300px" ref="shop" />
      </el-col>
      <el-col class="quick-nav" :xs="24" :sm="12" :lg="6">
        <p style=" font-size: 18px;font-weight: bolder">快捷导航</p>
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
import Todo from '/src/components/Todo/index.vue'
import { Earning, WeChat, Bilibili, Github } from './components/cards.js'
import pie1option from './options/pie1option'

export default {
  name: 'Dashboard',

  components: { Earning, WeChat, Bilibili, Github, Todo },

  setup() {
    const shop = ref(null)

    onMounted(() => {
      // 根据父元素的宽度来设置图表的宽度 （未添加resize事件处理）
      const parentWidth = shop.value.parentElement.clientWidth - 10
      shop.value.style.width = parentWidth + 'px'
      let myChart = echarts.init(shop.value)
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(pie1option)
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

.el-row > .el-col {
  padding-bottom: 10px;
}

// 新版样式穿透写法:deep(选择器)
:deep(.el-card__header) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 5px 10px;
}

:deep(.el-card__body) {
  height: 120px;
  padding: 0;
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
