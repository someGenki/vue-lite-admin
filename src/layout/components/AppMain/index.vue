<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <!--      <transition name="fade-transform" mode="out-in">-->
      <keep-alive :include="cachedViewNames">
        <component :is="Component" />
      </keep-alive>
      <!--      </transition>-->
    </router-view>
  </div>
</template>

<script>
/**
 * 被缓存页面的name属性要和routes中的name属性一致
 * https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/essentials/tags-view.html
 * https://v3.cn.vuejs.org/api/built-in-components.html#keep-alive
 * https://next.router.vuejs.org/zh/guide/migration/index.html#router-view-%E3%80%81-keep-alive-%E5%92%8C-transition
 * https://next.router.vuejs.org/zh/api/#router-view-props
 * <router-view>、<keep-alive> 和 <transition> 变化：https://github.com/vuejs/rfcs/blob/master/active-rfcs/0034-router-view-keep-alive-transitions.md
 *
 * 这里是第二层 <router-view>
 */
import { toRef } from 'vue'
import { useLayoutStore } from '/src/store/layout'

export default {
  name: 'AppMain',
  setup() {
    return { cachedViewNames: toRef(useLayoutStore(), 'cachedViews') }
  },
}
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  width: 100%;
  min-height: calc(100vh - #{$navbar-height + $tabBar-height});
  padding: 15px;
  background-color: #f1f2f3;
}

/*
 fade-transform 会被transition在恰当时机添加/删除CSS类名
 https://v3.cn.vuejs.org/api/built-in-components.html#component
 https://v3.cn.vuejs.org/guide/transitions-enterleave.html#%E8%BF%87%E6%B8%A1class
 enter/leave-active:进入过渡/离开过度生效时的状态,这个类可以被用来定义进入/离开过渡的过程时间，延迟和曲线函数。
*/
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.4s;
}

/* 定义元素离开的动画效果 */
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(24px);
}
</style>
