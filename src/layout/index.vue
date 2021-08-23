<template>
  <div class="app-wrapper">
    <sidebar />
    <div
      class="mask-zIndex99"
      v-if="isMobile && unfoldSidebar"
      @click.self.stop="handleSidebarToggle(false)"
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
import { AppMain, NavBar, Settings, Sidebar, TabBar } from './components'
import useLayout from './components/useLayout'
import { computed, toRefs } from 'vue'

export default {
  name: 'Layout',
  components: { Settings, AppMain, Sidebar, NavBar, TabBar },
  setup() {
    const { state, sidebarWidth, handleSidebarToggle } = useLayout()
    const { fixedHeader, isMobile, unfoldSidebar, showTabBar } = toRefs(state)

    // 当固定头部时，main-container的上边距值
    const mainPaddingTopOnFixed = computed(() => {
      if (!fixedHeader.value) return '0'
      else if (fixedHeader.value && showTabBar.value) return 42 + 34 + 'px'
      else return 42 + 'px'
    })

    return {
      isMobile,
      showTabBar,
      fixedHeader,
      sidebarWidth,
      unfoldSidebar,
      mainPaddingTopOnFixed,
      handleSidebarToggle,
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
