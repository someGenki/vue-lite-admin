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
      <sidebar-item v-for="item in menus" :key="menus.path" :item="item" />
    </el-menu>
  </aside>
</template>

<script>
import { toRefs } from 'vue'
import SidebarLogo from './SidebarLogo.vue'
import SidebarItem from './SidebarItem.vue'
import { useUserStore } from '/src/store/user'
import { useLayoutStore } from '/src/store/layout'
import { createMenuFromAddRoutes } from './useMenu'

/**
 * 根据权限以及路由表动态生成侧边菜单栏 以及配置菜单栏相关样式
 */
export default {
  name: 'Sidebar',
  components: { SidebarLogo, SidebarItem },
  setup() {
    const store = useLayoutStore()
    const menus = createMenuFromAddRoutes(useUserStore().addRoutes)
    const { showLogo, unfoldSidebar, sidebarWidth, elMenuStyle } = toRefs(store)

    return {
      menus,
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
