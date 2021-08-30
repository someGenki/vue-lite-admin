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
import { useStyleStore } from '/src/store/style'
import { createMenuFromAddRoutes } from './useMenu'

/**
 * 根据权限以及路由表动态生成侧边菜单栏 以及配置菜单栏相关样式
 */
export default {
  name: 'Sidebar',
  components: { SidebarLogo, SidebarItem },
  setup() {
    const store = useLayoutStore()
    const style = useStyleStore()
    const menus = createMenuFromAddRoutes(useUserStore().addRoutes)
    const { showLogo, unfoldSidebar, sidebarWidth } = toRefs(store)

    return {
      menus,
      showLogo,
      sidebarWidth,
      unfoldSidebar,
      elMenuStyle: style.elMenuStyle,
    }
  },
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  position: fixed;
  z-index: 100;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  .el-menu {
    flex-grow: 1;
    user-select: none;
    border-right: none;
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
