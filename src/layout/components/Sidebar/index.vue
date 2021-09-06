<template>
  <aside
    class="sidebar-container"
    :class="{ 'starry-sky': changeFlag }"
    :style="{ width: sidebarWidth }"
  >
    <sidebar-logo
      v-show="showLogo"
      backgroundColor="transparent"
      :is-collapse="unfoldSidebar"
    />
    <el-menu
      :collapse-transition="false"
      :uniqueOpened="menuAccordion"
      :collapse="!unfoldSidebar"
      :default-active="$route.path"
      :text-color="elMenuStyle.text"
      :active-text-color="elMenuStyle.activeText"
      :background-color="elMenuStyle.background"
    >
      <sidebar-item v-for="item in menus" :key="menus.path" :item="item" />
    </el-menu>
    <el-button type="primary" size="mini" @click="changeBackground"
      >换背景
    </el-button>
  </aside>
</template>

<script>
import { ref, toRefs } from 'vue'
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
    const { elMenuStyle } = toRefs(useStyleStore())
    const menus = createMenuFromAddRoutes(useUserStore().addRoutes)
    const { showLogo, unfoldSidebar, sidebarWidth, menuAccordion } = toRefs(
      useLayoutStore()
    )

    const changeFlag = ref(false)

    function changeBackground() {
      changeFlag.value = !changeFlag.value
    }

    return {
      menus,
      changeFlag,
      showLogo,
      elMenuStyle,
      sidebarWidth,
      unfoldSidebar,
      menuAccordion,
      changeBackground,
    }
  },
}
</script>
<style>
.el-menu-item:hover {
  font-weight: bold;
  color: #2b5876 !important;
}

.el-menu--vertical li {
  color: #2b5876 !important;
}
</style>
<style lang="scss" scoped>
// TODO 添加折叠时，弹出菜单的背景颜色
.starry-sky {
  background-image: url('https://images.pexels.com/photos/2644734/pexels-photo-2644734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'),
    linear-gradient(rgb(10, 30, 60) 0%, rgb(80, 120, 150) 100%) !important;
  background-position-x: 430px;
}

.sidebar-container {
  position: fixed;
  z-index: 100; // 要大于遮罩层
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-image: linear-gradient(rgb(10, 30, 60) 0%, rgb(80, 120, 150) 100%);
  background-size: auto 100%;

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
