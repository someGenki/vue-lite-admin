<template>
  <component v-if="type" :is="type" v-bind="linkProps">
    <span v-if="sharp" class="app-link__sharp">#</span>
    <slot />
  </component>
  <slot v-else />
</template>

<script>
// vue内置组件component说明 https://v3.cn.vuejs.org/api/built-in-components.html#component
// 参考自 https://github.com/PanJiaChen/vue-element-admin/blob/master/src/layout/components/Sidebar/Link.vue

/**
 *   <app-link  :to="i.path"> xxx </app-link>
 *
 * component是内置组件，根据 :is='type' 来决定哪个组件被渲染
 * type是字符串，可以是html自带的标签如 'a' ，也可以是组件名称 'router-link'
 */
export default {
  name: 'AppLink',
  props: {
    // 跳转路径
    to: { type: String },
    // 是否显示 `#` 符号
    sharp: { type: Boolean, default: false },
  },
  setup(props) {
    const { to } = props
    const type = to ? (isExternal(to) ? 'a' : 'router-link') : null
    if (type === 'a') {
      return { type, linkProps: { href: to, target: '_blank' } }
    } else if (type === 'router-link') {
      return { type, linkProps: { to } }
    } else {
      return { type, linkProps: {} }
    }
  },
}

function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
</script>

<style>
.app-link__sharp {
  font-size: 0.85em;
  color: var(--primary-color);
}

.app-link__sharp:hover {
  border-bottom: 2px solid var(--primary-color);
}

.app-link--disabled {
  pointer-events: none;
}
</style>
