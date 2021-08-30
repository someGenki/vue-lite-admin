<template>
  <div class="tabBar">
    <el-scrollbar
      view-style="white-space:nowrap;display:flex;align-items: center;height: 100%;"
    >
      <span
        v-for="tab in visitedViews"
        class="tabBar-item"
        :class="{ active: $route.path === tab.path, mark: tab.mark }"
        @click.middle.stop.capture="delTabBarItem(tab)"
      >
        <span
          @click="
            $router.replace({
              path: tab.path,
              query: tab.query,
              fullPath: tab.fullPath,
            })
          "
          @contextmenu.prevent="openMenu(tab, $event)"
          v-text="tab.title"
        />
        <app-icon
          @contextmenu.prevent="openMenu(tab, $event)"
          @click="delTabBarItem(tab)"
          class="tab-close"
          icon="el-icon-close"
          size="12"
        />
      </span>
    </el-scrollbar>
    <span class="tabBar-refresh" @click="refreshView" title="refresh">
      <i class="el-icon-refresh" />
    </span>
    <teleport to="body">
      <ul
        v-if="contextMenuProp.show"
        :style="{
          left: contextMenuProp.left + 'px',
          top: contextMenuProp.top + 'px',
        }"
        class="tabBar-contextmenu"
      >
        <li @click="delTabBarItem(contextMenuProp.selectedTab, 'self')">
          关闭所选标签页🤏
        </li>
        <li @click="delTabBarItem(contextMenuProp.selectedTab, 'left')">
          关闭左侧标签页👈
        </li>
        <li @click="delTabBarItem(contextMenuProp.selectedTab, 'right')">
          关闭右侧标签页👉
        </li>
        <li @click="delTabBarItem(contextMenuProp.selectedTab, 'other')">
          关闭其他标签页👐
        </li>
        <li @click="delTabBarItem(contextMenuProp.selectedTab, 'all')">
          关闭所有标签页💥
        </li>
        <hr />
        <li @click="markedTab(contextMenuProp.selectedTab, true)">
          设置重要提醒
        </li>
        <li @click="markedTab(contextMenuProp.selectedTab, false)">
          移除重要提醒
        </li>
      </ul>
    </teleport>
  </div>
</template>

<script>
import { reactive, toRef, watch } from 'vue'
import { useRouter } from 'vue-router'
import useTabBar from './useTabBar'
import { useLayoutStore } from '/src/store/layout'

export default {
  name: 'TabBar',
  setup() {
    const router = useRouter()

    const store = useLayoutStore()

    const { delTabBarItem, visitedViews } = useTabBar()

    const contextMenuProp = reactive({
      top: 0,
      left: 0,
      show: false,
      selectedTab: null,
    })

    const openMenu = (tab, $event) => {
      // 由于是插入到body元素上，所以根据page来定位
      contextMenuProp.left = $event.pageX
      contextMenuProp.top = $event.pageY - 5
      contextMenuProp.selectedTab = tab
      contextMenuProp.show = true
    }

    const closeMenu = () => (contextMenuProp.show = false)

    const markedTab = (tab, bool) => (tab.mark = bool)

    const refreshView = () => {
      const route = router.currentRoute.value
      store.removeCachedView(route)
      if (route.path.indexOf('/redirect') > -1) return
      router.replace({ path: '/redirect' + route.fullPath })
    }

    watch(toRef(contextMenuProp, 'show'), (value) => {
      if (value) document.body.addEventListener('click', closeMenu)
      else document.body.removeEventListener('click', closeMenu)
    })

    return {
      contextMenuProp,
      visitedViews,
      delTabBarItem,
      refreshView,
      markedTab,
      openMenu,
    }
  },
}
</script>

<style lang="scss" scoped>
.tabBar {
  position: relative;
  height: $tabBar-height;
  padding-left: 10px;
  background: #fff;
  //border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 #0000001e;
}

.tabBar-item {
  position: relative;
  display: inline-block;
  padding: 3px 2px 3px 4px;
  margin-right: 10px;
  font-size: 0.75rem;
  color: #495060;
  cursor: pointer;
  user-select: none;
  background-color: #fafafa;
  border: 1px solid #d4d4d4;

  &.mark::after {
    position: absolute;
    top: -8px;
    right: -9px;
    font-size: 14px;
    content: '😅';
  }

  &.active {
    color: #fff;
    background-color: var(--primary-color);
  }

  .tab-close {
    margin-left: 3px;
    transform: scale(0.8);
  }

  .tab-close:hover {
    transform: scale(1.2);
  }
}

.tabBar-contextmenu {
  position: absolute;
  z-index: 1000;
  min-width: 110px;
  padding: 5px;
  font-size: 12px;
  list-style-type: none;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 0 #0004;

  > li {
    padding: 5px;
    cursor: pointer;

    &:hover {
      background-color: #eee;
    }
  }
}

.tabBar-refresh {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  height: $tabBar-height;
  padding: 0 5px;
  font-size: 1.2rem;
  line-height: $tabBar-height;
  color: #6a6a6a;
  cursor: pointer;
  background-color: inherit;
  border-left: 1px solid #e7e7e7;

  &:hover {
    color: black;
  }
}
</style>
