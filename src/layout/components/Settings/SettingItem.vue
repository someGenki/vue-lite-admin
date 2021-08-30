<template>
  <div class="setting-item">
    <span style="font-size: 14px">{{ desc }}</span>
    <component :is="type" v-bind="$attrs" v-model="value" />
  </div>
</template>

<script>
/*
$attrs的使用     https://v3.cn.vuejs.org/api/instance-properties.html#attrs
在组件上使用emit  https://v3.cn.vuejs.org/guide/component-basics.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-v-model
Switch开关      https://element-plus.gitee.io/#/zh-CN/component/switch
*/
import { computed } from 'vue'

export default {
  name: 'SettingItem',
  props: {
    desc: { type: String, required: true },
    modelValue: { type: [Boolean, String, Number], required: true },
    type: { type: String, default: 'el-switch' },
    /* 暂不知道如何判断该组件已注册 */
  },
  emits: ['update:modelValue', 'change'],

  setup(props, { emit }) {
    const value = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val),
    })
    return { value }
  },
}
</script>

<style lang="scss" scoped>
.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px;
}
</style>
