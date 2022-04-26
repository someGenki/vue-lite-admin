<template>
  <div class="emotion-tabs">
    <a
      v-for="tab in tabs"
      v-html="tab.first"
      :class="{ choose: choose === tab.key }"
      @click="choose = tab.key"
    >
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  tabs: { type: Array, required: true },
  modelValue: { type: String, default: 'wx' },
})

const choose = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables';
.emotion-tabs {
  position: relative;
  height: 36px;
  overflow: hidden;
  background-color: #f1f2f3;
  border-radius: 0 0 4px 4px;

  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    width: 54px;
    height: 100%;
    cursor: pointer;

    &:hover {
      background-color: $hover-bg;
    }

    &.choose {
      background-color: #ffffff;
    }

    // 让第二个tab的emoji表情放大
    &:nth-child(2) {
      font-size: 20px;
    }
  }
}
</style>
