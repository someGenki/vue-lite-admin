<template>
  <component :is="type" v-bind="linkProps">
    <slot />
  </component>
</template>

<script>
// vue内置组件component说明 https://v3.cn.vuejs.org/api/built-in-components.html#component
// 参考自 https://github.com/PanJiaChen/vue-element-admin/blob/master/src/layout/components/Sidebar/Link.vue

/**
 *   <app-link  :to="i.path">
 *     xxx
 *   </app-link>
 * component是内置组件，根据 :is='type' 来决定哪个组件被渲染
 * type是字符串，可以是html自带的标签如 'a' ，也可以是组件名称 'router-link'
 */
export default {
  name: 'AppLink',
  props: { to: { type: String, required: true } },
  setup(props) {
    let type = isExternal(props.to) ? 'a' : 'router-link'
    if (type === 'a') {
      return { type, linkProps: { href: props.to, target: '_blank' } }
    } else {
      return { linkProps: { to: props.to }, type }
    }
  },
}

function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
</script>
