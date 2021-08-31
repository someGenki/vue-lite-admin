<template>
  <div class="app-wrapper">
    <sidebar />
    <!-- ↑ 侧边菜单栏 ↑  -->
    <div
      class="mask-zIndex99"
      v-if="isMobile && unfoldSidebar"
      @click.self.stop="toggleSidebar(false)"
    />
    <!-- ↑ 移动端模式展开侧边栏出现的遮罩层 ↑  -->
    <div
      class="main-container"
      :style="{
        paddingTop: mainPaddingTopOnFixed,
        paddingLeft: isMobile ? 0 : sidebarWidth,
      }"
    >
      <!-- ↑ 动态根据设置项控制左、上padding数值 ↑  -->
      <header :class="{ 'fixed-header': fixedHeader }">
        <nav-bar />
        <tab-bar v-if="showTabBar" />
      </header>
      <app-main />
      <!-- ↑ 内容主题展示区域 ↑  -->
    </div>
    <settings />
    <!-- ↑ 默认隐藏在右边的设置面板 ↑  -->
  </div>
</template>

<script setup>
// <script setup>教程：https://v3.cn.vuejs.org/api/sfc-script-setup.html
import { toRefs } from 'vue'
import { useStyleStore } from '../store/style'
import { useLayoutStore } from '/src/store/layout'
import { batchSaveSetting } from '/src/utils/storage'
// ide暂时无法识别使用情况，导致呈现灰色
import { AppMain, NavBar, Settings, Sidebar, TabBar } from './components'

const layoutStore = useLayoutStore()

const styleStore = useStyleStore()

const {
  isMobile,
  showTabBar,
  fixedHeader,
  sidebarWidth,
  toggleSidebar,
  unfoldSidebar,
  mainPaddingTopOnFixed,
} = toRefs(layoutStore)

// 监听以下key的变动，并存储到LocalStorage
layoutStore.$subscribe((mutation, state) => {
  const keys = [
    'showLogo',
    'showTabBar',
    'fixedHeader',
    'sUnfoldWidth',
    'unfoldSidebar',
  ]
  batchSaveSetting(keys, state)
})

styleStore.injectCssVarToRoot()
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  display: flex;
  height: 100vh; // 固定容器高度，让滚动条出现在这一层
  overflow: auto;
}

.main-container {
  flex-grow: 1; // 撑满页面右边的主体区域
}

// header变成固定模式时，给第二层router-view的容器加上 上边距
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  padding-left: inherit; // 解决设置fixed之后，宽度100%会盖过侧边栏的问题
}
</style>
