<template>
  <component :class="{ disabled, center }" :is="compType" v-bind="compProp">
    <span v-if="sharp" class="app-link__sharp">#</span>
    <slot />
  </component>
</template>

<script setup>
/**
 * @example   <app-link  :to="i.path"> xxx </app-link>
 *
 * component是内置组件，根据 :is='type' 来决定哪个组件被渲染
 * type是字符串，可以是html自带的标签如 'a' ，也可以是组件名称 'router-link'
 * vue内置组件component说明 https://v3.cn.vuejs.org/api/built-in-components.html#component
 * 参考自 https://github.com/PanJiaChen/vue-element-admin/blob/master/src/layout/components/Sidebar/Link.vue
 */
const { to } = defineProps({
  to: { type: String },
  // 是否禁用点击
  disabled: { type: Boolean, default: false },
  // 是否居中显示
  center: { type: Boolean, default: false },
  // 是否显示 `#` 符号
  sharp: { type: Boolean, default: false },
})

const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
const compType = to ? (isExternal(to) ? 'a' : 'router-link') : 'span'
const compProp = {}
if (compType === 'a') {
  compProp.href = to
  compProp.target = '_blank'
} else {
  compProp.to = to
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
