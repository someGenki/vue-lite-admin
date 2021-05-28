<template>
  <div class="dashboard-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :lg="6"><github-state /></el-col>
      <el-col :xs="24" :sm="12" :lg="6"><bilibili-state /></el-col>
      <el-col :xs="24" :sm="12" :lg="6"><earning-position /></el-col>
      <el-col :xs="24" :sm="12" :lg="6"><we-chat-wallet /></el-col>
    </el-row>
    <div ref="shop" style="width: 300px; height: 300px;" />
  </div>
</template>

<script>
// https://element-plus.gitee.io/#/zh-CN/component/layout
// element-plus响应式布局分24栏, 为简化只关注xs,sm和lg。分别是小于768px,大于768px和大于1200px
//  数字增加 https://blog.csdn.net/sunny123x/article/details/102589067
// 请求动画帧 https://github.com/PanJiaChen/vue-countTo/blob/master/src/requestAnimationFrame.js

import EarningPosition from '/src/views/dashboard/components/EarningPosition/index.vue'
import WeChatWallet from '/src/views/dashboard/components/WeChatWallet/index.vue'
import BilibiliState from '/src/views/dashboard/components/BilibiliState/index.vue'
import GithubState from '/src/views/dashboard/components/GithubState/index.vue'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
export default {
  name: 'Dashboard',
  components: {
    GithubState,
    EarningPosition,
    WeChatWallet,
    BilibiliState,
  },
  setup() {
    const shop = ref(null)
    // console.log('Dashboard')
    onMounted(() => {
      let myChart = echarts.init(shop.value)
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: 'ECharts',
        },
        tooltip: {},
        legend: {
          data: ['收入', '利润'],
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [
          {
            name: '收入',
            type: 'bar',
            data: [15, 30, 46, 20, 20, 40],
          },
          {
            name: '利润',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    })
    return { shop }
  },
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  margin-right: 10px;
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
      color: #ffffff;
      border-radius: 8px;
      background-color: $primary-color-tinge;
    }
  }
}
</style>
