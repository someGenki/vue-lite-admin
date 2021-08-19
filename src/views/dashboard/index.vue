<template>
  <div class="dashboard-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :lg="6"><github /></el-col>
      <el-col :xs="24" :sm="12" :lg="6"><bilibili /></el-col>
      <el-col :xs="24" :sm="12" :lg="6"><earning /></el-col>
      <el-col :xs="24" :sm="12" :lg="6"><we-chat /></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :lg="6">
        <div style="height: 280px" ref="shop" />
      </el-col>
      <el-col class="quick-nav" :xs="24" :sm="12" :lg="6">
        <p style="font-weight: bold">快捷导航</p>
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
    </el-row>
  </div>
</template>

<script>
// https://element-plus.gitee.io/#/zh-CN/component/layout
// element-plus响应式布局分24栏, 为简化只关注xs,sm和lg。分别是小于768px,大于768px和大于1200px
// 数字增加 https://blog.csdn.net/sunny123x/article/details/102589067
// 请求动画帧 https://github.com/PanJiaChen/vue-countTo/blob/master/src/requestAnimationFrame.js

import { Earning, WeChat, Bilibili, Github } from './components/cards.js'
import * as echarts from 'echarts'
import { onMounted, reactive, ref} from 'vue'

export default {
  name: 'Dashboard',
  components: { Earning, WeChat, Bilibili, Github },

  setup() {
    const shop = ref(null)
    const arr = reactive([1, 2])
    onMounted(() => {
      // 根据父元素的宽度来设置图表的宽度 （未添加resize事件处理）
      const parentWidth = shop.value.parentElement.clientWidth - 10
      shop.value.style.width = parentWidth + 'px'
      let myChart = echarts.init(shop.value)
      // 指定图表的配置项和数据
      let option = {
        title: { text: 'ECharts' },
        tooltip: { trigger: 'axis' },
        legend: { data: ['收入', '利润'] },
        xAxis: { data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'] },
        yAxis: {},
        series: [
          { name: '收入', type: 'line', data: [15, 30, 46, 20, 20, 40] },
          { name: '利润', type: 'bar', data: [5, 20, 36, 10, 10, 20] },
        ],
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    })

    return { shop, arr }
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
  padding: 5px 10px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:deep(.el-card__body) {
  padding: 0;
  height: 120px;
}

.quick-nav {
  &__card {
    border: 1px solid #ccc;
    display: inline-flex;
    flex-flow: column wrap;
    align-items: center;
    text-align: center;
    margin: 6px;
    padding: 4px;

    > p {
      font-size: 1.1rem;
      font-weight: bold;
      color: #337ab7;
    }

    > span {
      font-size: 0.9rem;
    }

    &:hover {
      box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
    }
  }
}

.visited-panel {
  > .show-visited {
    font-weight: bold;

    .visited-num {
      font-size: 1.1rem;
      color: $primary-text-color-tinge;
    }
  }

  > .icon-wrapper {
    cursor: pointer;
    color: $primary-text-color;
    transition: 0.3s;
    font-size: 4rem;

    &:hover {
      color: #fff;
      border-radius: 8px;
      background-color: $primary-color-tinge;
    }
  }
}
</style>
