<template>
  <el-popover :width="250" popper-class="emotion-box">
    <template #reference>
      <span>
        <slot>
          <span class="emotion-box__open-btn">表情</span>
        </slot>
      </span>
    </template>
    <div class="emotion-box__wrapper">
      <div class="emotion-box__container" v-if="current === 'wechat'">
        <span
          v-for="(item, index) in wechatList"
          :key="'w:' + index"
          class="emotion-box__item"
          v-html="item.url"
          @click="$emit('emotion-add', item.name)"
        />
      </div>
      <div class="emotion-box__container" v-else-if="current === 'kaomoji'">
        <span
          v-for="(item, index) in kaomojiList"
          v-html="item"
          :key="'k:' + index"
          class="emotion-box__item"
          @click="$emit('emotion-add', item)"
        />
      </div>
      <div class="emotion-box__tabs">
        <span
          v-for="item in emotions"
          :key="item.key"
          v-text="item.name"
          @click.stop="current = item.key"
          :class="current === item.key ? 'emotion-box__tabs--active' : ''"
        />
      </div>
    </div>
  </el-popover>
</template>

<script>
import { ref } from 'vue'
import { useEmotions } from './useEmotions'

export default {
  name: 'EmotionBox',
  props: ['position'],
  emits: ['emotion-add'],
  setup() {
    let current = ref('wechat')
    let wechatList = useEmotions('wechat')
    let kaomojiList = useEmotions('kaomoji')
    let emotions = [
      { key: 'wechat', name: '微信表情' },
      { key: 'kaomoji', name: '颜文字' },
    ]
    return { wechatList, kaomojiList, current, emotions }
  },
}
</script>

<style lang="scss" scoped>
$hover-color: #aaa;

.emotion-box {
  //默认展开表情盒子的按钮 or 触发Popover的按钮
  &__open-btn {
    height: 30px;
    line-height: 30px;
    padding: 2px 4px;
    margin-right: 5px;
    cursor: pointer;
    user-select: none;
    border: 1px solid #9c9a9a;
    border-radius: 7px;

    &:hover {
      background-color: var(--primary-color);
    }
  }

  // 包裹层
  &__wrapper {
    // 抵消popover的padding
    margin: -6px;
  }

  //装有一堆表情的容器
  &__container {
    height: 150px;
    overflow: scroll;
  }

  //单个表情
  &__item {
    cursor: pointer;
    display: inline-block;
    margin: 2px;
    padding: 2px;

    &:hover {
      border-radius: 5px;
      background-color: $hover-color;
    }
  }

  // 切换表情的tab
  &__tabs {
    font-size: 0.95rem;
    padding: 5px;

    > span {
      cursor: pointer;
      padding: 3px;
      margin-right: 3px;
      border-radius: 4px;

      &:hover {
        background-color: $hover-color;
      }
    }

    &--active {
      background-color: $hover-color;
    }
  }
}
</style>
