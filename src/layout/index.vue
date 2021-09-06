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
    <div class="main-container">
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
import { debounce } from '/src/utils/util'
import { useStyleStore } from '/src/store/style'
import { useLayoutStore } from '/src/store/layout'
import { batchSaveSetting } from '/src/utils/storage'
import { AppMain, NavBar, Settings, Sidebar, TabBar } from './components' // ide暂时无法识别使用情况，导致呈现灰色

const styleStore = useStyleStore()
const layoutStore = useLayoutStore()

const {
  isMobile,
  showTabBar,
  fixedHeader,
  toggleSidebar,
  unfoldSidebar,
  checkIsMobile,
  mainPaddingLeft,
  mainPaddingTopOnFixed,
} = toRefs(layoutStore)

// 监听以下key的变动，并存储到LocalStorage
layoutStore.$subscribe((mutation, state) => {
  const keys = [
    'showLogo',
    'showTabBar',
    'fixedHeader',
    'sUnfoldWidth',
    'menuAccordion',
    'unfoldSidebar',
  ]
  batchSaveSetting(keys, state)
})

// 监听页面尺寸调整 动态改变state.isMobile的值判断是否是移动设备
window.addEventListener('resize', debounce(checkIsMobile.value, 200))

styleStore.injectCssVarToRoot()
</script>

<style lang="scss" scoped>
/* 用单文件组件样式的特性（状态驱动的动态 CSS | v-bind(var) )时，值需要用引号包裹起来，避免被stylelint所格式化 */
.app-wrapper {
  position: relative;
  display: flex;
  height: 100vh; // 固定容器高度，让滚动条出现在这一层
  overflow: auto;
}

.main-container {
  position: relative;
  flex-grow: 1; // 撑满页面右边的主体区域
  padding-top: v-bind('mainPaddingTopOnFixed');
  padding-left: v-bind('mainPaddingLeft');
}

// header变成固定模式时，给第二层router-view的容器加上 上边距
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  //z-index: 10;
  width: 100%;
  padding-left: v-bind('mainPaddingLeft');
}
</style>
