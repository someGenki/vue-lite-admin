<template>
  <aside class="sidebar-container" :style="{ width: sidebarWidth }">
    <sidebar-logo v-show="showLogo" :is-collapse="unfoldSidebar" />
    <el-menu
      :uniqueOpened="true"
      :collapse-transition="false"
      :collapse="!unfoldSidebar"
      :default-active="$route.path"
      :text-color="elMenuStyle.text"
      :active-text-color="elMenuStyle.activeText"
      :background-color="elMenuStyle.background"
    >
      <sidebar-item v-for="item in routers" :key="item.path" :item="item" />
    </el-menu>
  </aside>
</template>

<script>
import { toRaw, toRefs } from 'vue'
import { state as userState } from '/src/store/user'
import SidebarLogo from './SidebarLogo.vue'
import SidebarItem from './SidebarItem.vue'
import useLayout from '../useLayout.js'

export default {
  name: 'Sidebar',
  components: { SidebarLogo, SidebarItem },
  setup() {
    const { state, sidebarWidth } = useLayout(),
      { showLogo, unfoldSidebar } = toRefs(state)
    // 根据routers(已根据roles处理过的路由表  )来动态生成侧边菜单栏
    const routers = toRaw(userState.addRoutes)
    const elMenuStyle = {
      text: '#dcdcdc',
      background: '#304156',
      activeText: state.themeColor,
    }
    return {
      routers,
      showLogo,
      elMenuStyle,
      sidebarWidth,
      unfoldSidebar,
    }
  },
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  position: fixed;
  overflow: hidden;
  height: 100%;
  z-index: 100;

  .el-menu {
    flex-grow: 1;
    border-right: none;
    user-select: none;
  }

  .el-submenu {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .el-menu-item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .el-submenu .el-menu-item {
    min-width: 160px;
  }
}
</style>
