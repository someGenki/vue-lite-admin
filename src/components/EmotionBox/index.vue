<template>
  <div class="emotion-box">
    <span @click.stop="show = !show" style="cursor: pointer">
      <slot>
        <span class="open-btn">表情</span>
      </slot>
    </span>
    <div
      v-show="show"
      :style="{ top: position === 'top' ? '-210px' : null }"
      class="emotion-wrapper"
      v-ClickOutside="changeShow"
    >
      <p style="font-size: 0.8rem">{{ currentEmotion }}</p>

      <div class="emotion-container" v-if="current === 'wechat'">
        <span
          v-for="(item, index) in wechat"
          :key="'w:' + index"
          class="emotion"
          v-html="item.url"
          @click="$emit('emotion-add', item.name)"
        />
      </div>

      <div class="emotion-container" v-else-if="current === 'kaomoji'">
        <span
          v-for="(item, index) in kaomoji"
          :key="'k:' + index"
          class="emotion"
          v-html="item"
          @click="$emit('emotion-add', item)"
        />
      </div>
      <div class="emotion-tabs">
        <a
          @click.stop="current = 'wechat'"
          :class="current === 'wechat' ? 'emotion-active' : ''"
        >
          微信表情
        </a>
        <a
          @click.stop="current = 'kaomoji'"
          :class="current === 'kaomoji' ? 'emotion-active' : ''"
        >
          颜文字
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useEmotions } from './useEmotions'
import ClickOutside from '/src/directives/click-outside'

export default {
  name: 'EmotionBox',
  props: ['position'],
  emits: ['emotion-add'],
  directives: { ClickOutside },
  setup() {
    let show = ref(false)
    let current = ref('wechat')
    let wechat = useEmotions('wechat')
    let kaomoji = useEmotions('kaomoji')

    const currentEmotion = computed(() => {
      if (current.value === 'wechat') return '微信表情'
      else if (current.value === 'kaomoji') return '颜文字'
      else return 'unknown'
    })

    const changeShow = () => (show.value = false)

    return {
      show,
      wechat,
      kaomoji,
      current,
      currentEmotion,
      changeShow,
    }
  },
}
</script>

<style lang="scss" scoped>
.emotion-box {
  display: inline-block;
  position: relative;

  //展开表情盒子的按钮
  .open-btn {
    height: 30px;
    user-select: none;
    line-height: 30px;
    padding: 2px 4px;
    border: 1px solid #9c9a9a;
    border-radius: 7px;
    margin-right: 5px;

    &:hover {
      background-color: $primary-color;
    }
  }

  //装有一堆表情的容器
  .emotion-container {
    height: 150px;
    overflow: scroll;
  }

  //单个表情
  .emotion {
    cursor: pointer;
    display: inline-block;
    margin: 2px;
    padding: 2px;

    &:hover {
      border-radius: 5px;
      background-color: #9c9a9a;
    }
  }

  // 切换表情的tab
  .emotion-tabs {
    font-size: 0.95rem;
    padding: 5px;
    > a {
      cursor: pointer;
      padding: 3px;
      margin-right: 3px;
      border-radius: 4px;
      &:hover {
        background-color: #7b7b7b;
      }
    }
  }

  // 选择标签的tab
  .emotion-active {
    background-color: white;
  }

  // 包含wrapper和tabs的最外层容器
  .emotion-wrapper {
    position: absolute;
    top: 30px;
    width: 343px;

    padding: 5px;
    border: 1px solid aqua;
    color: $primary-text-color;
    background-color: #e2e2e2;
    z-index: 10;
  }
}
</style>
