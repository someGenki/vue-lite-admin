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
    <el-button type="primary" size="small" @click="changeBackground">
      换背景{{ menus.length }}
    </el-button>
  </aside>
</template>

<script setup>
import { reactive, ref, toRefs, watch } from 'vue'
import SidebarLogo from './SidebarLogo.vue'
import SidebarItem from './SidebarItem.vue'
import { useUserStore } from '/src/store/user'
import { useLayoutStore } from '/src/store/layout'
import { useStyleStore } from '/src/store/style'
import { createMenuFromAddRoutes } from './useMenu'

/**
 * 根据权限以及路由表动态生成侧边菜单栏 以及配置菜单栏相关样式
 */

const { elMenuStyle } = toRefs(useStyleStore())
const { addRoutes } = toRefs(useUserStore())
const menus = reactive([])

menus.push(...createMenuFromAddRoutes(addRoutes.value))

watch(addRoutes, (newRoutes) => {
  menus.length = 0
  menus.push(...createMenuFromAddRoutes(newRoutes))
})

const { showLogo, unfoldSidebar, sidebarWidth, menuAccordion } =
  /* wrap */ toRefs(useLayoutStore())

const changeFlag = ref(false)

function changeBackground() {
  changeFlag.value = !changeFlag.value
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
  overflow-x: hidden;
  overflow-y: auto;
  background-image: linear-gradient(rgb(10, 30, 60) 0%, rgb(80, 120, 150) 100%);
  background-size: auto 100%;
  transition: background 0.4s;

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
