<template>
  <div class="app-wrapper">
    <sidebar />
    <div
      class="mask-zIndex99"
      v-if="isMobile && unfoldSidebar"
      @click.self.stop="toggleSidebar(false)"
    />
    <!-- ↑ 移动端模式展开侧边栏出现的遮罩层 ↑  -->
    <div
      class="main-container"
      :style="{
        paddingLeft: isMobile ? 0 : sidebarWidth,
        paddingTop: mainPaddingTopOnFixed,
      }"
    >
      <header :class="{ 'fixed-header': fixedHeader }">
        <nav-bar />
        <tab-bar v-if="showTabBar" />
      </header>
      <app-main />
    </div>
    <settings />
  </div>
</template>

<script>
import { toRefs } from 'vue'
import { useLayoutStore } from '/src/store/layout'
import { AppMain, NavBar, Settings, Sidebar, TabBar } from './components'

export default {
  name: 'Layout',
  components: { Settings, AppMain, Sidebar, NavBar, TabBar },
  setup() {
    const store = useLayoutStore()
    const {
      isMobile,
      showTabBar,
      fixedHeader,
      sidebarWidth,
      toggleSidebar,
      unfoldSidebar,
      mainPaddingTopOnFixed,
    } = toRefs(store)

    setTimeout(() => {

    })

    return {
      isMobile,
      showTabBar,
      fixedHeader,
      sidebarWidth,
      toggleSidebar,
      unfoldSidebar,
      mainPaddingTopOnFixed,
    }
  },
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  overflow: auto;
  position: relative;
  height: 100vh; // 固定容器高度，让滚动条出现在这一层
}

.main-container {
  flex-grow: 1; // 撑满页面右边的主体区域
}

// header变成固定模式时，给第二层router-view的容器加上 上边距
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  padding-left: inherit; /* 解决设置fixed之后，宽度100%会盖过侧边栏的问题 */
  z-index: 10;
}
</style>
