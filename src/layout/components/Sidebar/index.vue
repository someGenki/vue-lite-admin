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
import { useUserStore } from '/src/store/user'
import SidebarLogo from './SidebarLogo.vue'
import SidebarItem from './SidebarItem.vue'
import { toRaw, toRefs } from 'vue'
import { useLayoutStore } from '../../../store/layout'

/**
 * 根据权限以及路由表动态生成侧边菜单栏 以及配置菜单栏相关样式
 * TODO 抽离创建菜单的方式，不直接从router创建，而是提供选择
 */
export default {
  name: 'Sidebar',
  components: { SidebarLogo, SidebarItem },
  setup() {
    const store = useLayoutStore()
    const { showLogo, unfoldSidebar, sidebarWidth, elMenuStyle } = toRefs(store)
    const routers = toRaw(useUserStore().addRoutes)

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
