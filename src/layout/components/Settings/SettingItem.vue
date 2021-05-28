<template>
  <div class="setting-item">
    <span>{{ desc }}</span>
    <component :is="type" v-bind="$attrs" v-model="value" />
  </div>
</template>

<script>
/*
$attrs的使用     https://v3.cn.vuejs.org/api/instance-properties.html#attrs
在组件上使用emit  https://v3.cn.vuejs.org/guide/component-basics.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-v-model
Switch 开关     https://element-plus.gitee.io/#/zh-CN/component/switch
*/
import { computed } from 'vue'

export default {
  name: 'SettingItem',
  props: {
    desc: { type: String, required: true },
    modelValue: {
      type: [Boolean, String, Number],
      required: true,
    },
    type: {
      type: String,
      // 暂时不知道怎么判断组件已注册
      default: 'el-switch',
    },
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
  justify-content: space-between;
  align-items: center;
  padding: 4px 16px;
}
</style>
