<template>
  <div class="TabBar">
    <el-scrollbar>
      <div class="item-list" @contextmenu="handleContextMenu">
        <tab-item
          v-for="view in visitedViews"
          :key="view.timeStamp"
          :item="view"
          :close="delTabBarItem"
        />
      </div>
    </el-scrollbar>
    <span class="TabBar-refresh" @click="refreshPage" title="refresh">
      <app-icon icon="el-icon-refresh" />
    </span>
  </div>
</template>

<script setup>
import { toRef } from 'vue'
import { usePageFn } from '/src/hooks/usePageFn'
import { useLayoutStore } from '/src/store/layout'
import useTabBar from './useTabBar'
import TabItem from './TarBarItem.vue'

// TODO 封装context menu
// 可参考 https://codepen.io/havardob/pen/YzwzQgm https://github.com/heynext/v-contextmenu
// https://github.com/imengyu/vue3-context-menu  https://github.com/Hunlongyu/vue3-contextmenu  https://github.com/chiic/vue-contextmenu
const { refreshPage } = usePageFn()
const { delTabBarItem, visitedViews } = useTabBar()

const mainPaddingLeft = toRef(useLayoutStore(), 'mainPaddingLeft')
// 事件委托：在父容器注册事件，监听子元素的右键事件
const handleContextMenu = ($event) => {
  if ($event.target.tagName === 'SPAN') {
    $event.preventDefault()
    const time = +$event.target.dataset.time // 获取time并转回数字形式
    const item = visitedViews.value.filter((v) => v.timeStamp === time)[0]
    // delTabBarItem(item)
    // TODO 右键弹出菜单
  }
}
</script>
<style lang="scss" scoped>
.TabBar {
  position: relative;
  width: calc(100vw - v-bind('mainPaddingLeft') - #{$scrollbar-width});
  height: $tabBar-height;
  padding-right: 30px;
  padding-left: 10px;
  background: #fff;
  //border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 #0000001e;
}

.item-list {
  display: flex;
  align-items: center;
  height: $tabBar-height;
}

.tabBar-contextmenu {
  position: absolute;
  z-index: 1000;
  min-width: 110px;
  padding: 5px;
  font-size: 12px;
  list-style-type: none;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(#404040, 0.15);

  > li {
    padding: 5px;
    cursor: pointer;
    border-radius: 6px;

    &:hover {
      background-color: #f1f3f7;
    }
  }
}

.TabBar-refresh {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  height: $tabBar-height;
  padding: 0 5px;
  font-size: 18px;
  line-height: $tabBar-height;
  color: #6a6a6a;
  cursor: pointer;
  background-color: inherit;
  border-left: 1px solid #e7e7e7;

  & > i {
    transition: all 1s;
  }

  & > i:hover {
    color: black;
    transform: rotate(360deg);
  }
}
</style>
