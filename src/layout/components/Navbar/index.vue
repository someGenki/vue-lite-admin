<template>
  <div class="navbar" role="navigation">
    <Hamburger :unfold="unfoldSidebar" @toggleClick="toggleSidebar" />
    <breadcrumb :list="breadcrumbList" />
    <div class="right-menu-area">
      <app-icon class="right-menu-action" icon="el-icon-search" />
      <app-icon
        @click="fullScreen"
        class="right-menu-action"
        icon="el-icon-full-screen"
      />
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
        @click.stop="toggleSettings(true)"
      />
    </div>
  </div>
</template>

<script setup>
import { readonly, toRefs } from 'vue'
import AvatarMenu from './AvatarMenu.vue'
import Breadcrumb from './Breadcrumb.vue'
import Hamburger from './Hamburger.vue'
import DioAvatar from '/src/assets/dio.jpg'
import { removeToken } from '/src/utils/storage'
import { useLayoutStore } from '/src/store/layout'
import { usePageFn } from '/src/hooks/usePageFn'

const { fullScreen } = usePageFn()

const {
  unfoldSidebar,
  breadcrumbList,
  toggleSidebar,
  toggleSettings,
} /* wrap */ = toRefs(useLayoutStore())

// TEMP:头像下拉菜单项
const dropdownItems = readonly([
  { title: '个人中心', path: '/profile' },
  {
    title: '项目地址',
    path: 'https://github.com/someGenki/vue-lite-admin',
  },
  { title: '不可点击', path: '/', disabled: true },
  {
    title: '退出登录',
    divided: true,
    handle: () => {
      alert('您选择了登出')
      removeToken()
      location.reload()
    },
  },
])
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  display: flex;
  align-items: center;
  height: $navbar-height;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 4px #00000114;
}

.right-menu-area {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
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
