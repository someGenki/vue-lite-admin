<template>
  <div
    class="TabBar-item"
    :class="{ active: $route.fullPath === item.fullPath, mark: item.mark }"
    @click.middle.capture.stop="close(item)"
  >
    <span :data-time="item.timeStamp" @click="$router.replace(item)">
      {{ item.title }}
    </span>
    <app-icon
      @click="close(item)"
      class="tab-close"
      icon="el-icon-close"
      size="12"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
  close: Function,
})
</script>

<style lang="scss" scoped>
.TabBar-item {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  padding: 3px 1px 3px 5px;
  margin-right: 8px;
  font-size: 12px;
  color: #495060;
  cursor: pointer;
  user-select: none;
  background-color: #fdfdfd;
  border: 1px solid #d4d4d4;
  border-radius: 3px;

  &.mark::after {
    position: absolute;
    top: -8px;
    right: -8px;
    font-size: 14px;
    content: '😅';
  }

  &.active {
    color: #fff;
    background-color: var(--primary-color) !important;
    border: 0;
  }

  &:hover {
    background-color: #f1f1f1;
  }

  .tab-close {
    margin-left: 1px;
    transform: scale(0.8);
  }

  .tab-close:hover {
    transform: scale(1.2);
  }
}
</style>
