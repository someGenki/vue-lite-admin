<template>
  <div class="navbar" role="navigation">
    <Hamburger :unfold="unfolded" @toggleClick="handleSidebarToggle" />
    <breadcrumb :list="breadcrumbList" />
    <div class="right-menu-area">
      <app-icon class="right-menu-action" icon="el-icon-search" />
      <app-icon class="right-menu-action" icon="el-icon-full-screen" />
      <el-popover trigger="click">
        <template #reference>
          <span class="right-menu-action">
            <el-badge is-dot>
              <app-icon icon="el-icon-bell" />
            </el-badge>
          </span>
        </template>
        <p>TODO 消息通知</p>
      </el-popover>
      <avatar-menu
        :nickname="'管理员'"
        :items="dropdownItems"
        :avatar="DioAvatar"
      />
      <app-icon
        size="20"
        icon="el-icon-setting"
        class="right-menu-action"
        @click.stop="handleSettingsToggle(true)"
      />
    </div>
  </div>
</template>

<script>
import AvatarMenu from './AvatarMenu.vue'
import Breadcrumb from './Breadcrumb.vue'
import Hamburger from './Hamburger.vue'
import DioAvatar from '/src/assets/dio.jpg'
import useLayout from '../useLayout'
import { toRef } from 'vue'

export default {
  name: 'Navbar',
  components: { AvatarMenu, Breadcrumb, Hamburger },
  setup() {
    const { handleSidebarToggle, handleSettingsToggle, dropdownItems, state } =
      useLayout()

    return {
      DioAvatar /* 项目默认头像,来自assets文件夹,vite会自动解析返回公共路径 */,
      dropdownItems,
      handleSidebarToggle,
      handleSettingsToggle,
      unfolded: toRef(state, 'unfoldSidebar'),
      breadcrumbList: toRef(state, 'breadcrumbList'),
    }
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  height: $navbar-height;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 2px 4px #00000114;
}

.right-menu-area {
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  height: 100%;
}

.right-menu-action {
  display: inline-block;
  padding: 15px 10px;
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: $hover-background-color;
  }
}
@media screen and (max-width: $sm-width) {
  .app-breadcrumb {
    display: none;
  }
}
</style>
