<template>
  <div class="app-explain">
    <h2 class="app-explain__title">{{ title }}</h2>
    <div class="app-explain__remark">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppExplain',
  props: {
    title: { type: String, required: true },
    remark: { type: String },
    background: { type: String, default: '#FFFFFF' },
  },
}
</script>

<style lang="scss" scoped>
.app-explain {
  padding: 10px;
  margin: -15px -15px 0 -15px;
  overflow: auto;
  background: v-bind('background');

  &__title {
    margin: 8px 8px 8px 0;
  }
}
</style>
