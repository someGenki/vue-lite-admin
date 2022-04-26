<template>
  <el-tooltip
    :popper-class="emotionClass"
    effect="light"
    trigger="click"
    placement="bottom-start"
  >
    <!--暴露出去的样式-->
    <emotion-box :auto-focus="textAreaFocus"><span>表情</span></emotion-box>

    <template #content>
      <div class="emotion-title">{{ emotions[choose].name }}</div>
      <!--放置一堆表情的容器-->
      <el-scrollbar height="200px" view-class="emotion-wrapper">
        <a
          v-for="item in emotionList"
          v-html="item.html"
          class="emotion-item"
          :key="item.text"
          :data-text="item.text"
          @click="handleEmotionClick(item)"
        />
      </el-scrollbar>
      <!--底部切换标签栏-->
      <emotion-tab v-model="choose" :tabs="emotionTabs" />
    </template>
  </el-tooltip>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { useEmotion } from '/src/hooks/emotion/useEmotions'
import EmotionTab from './EmotionTab.vue'
import EmotionBox from './EmotionBox.vue'

/**
 * @example <app-emotion @emotion="handleEmotion" />
 * 需要provide一个输入框的element引用！
 */
const emit = defineEmits(['emotion'])
const { emotions, emotionTabs } = useEmotion()

const choose = ref('wx')
const cache = Object.create(null)
const textarea = inject('textarea')
const emotionList = computed(() => {
  const name = choose.value
  if (cache[name]) return cache[name]
  const emo = emotions[name]
  const process = emo.process
  return (cache[name] = emo.list.map(process))
})

const emotionClass = computed(() => {
  return 'emotion-box ' + choose.value
})
const textAreaFocus = () => {
  textarea?.value?.focus()
}
const handleEmotionClick = (arg) => {
  textAreaFocus()
  emit('emotion', arg.text)
}
</script>

<style lang="scss">
@import '/src/styles/variables';
// 弹出层卡片样式
.emotion-box {
  width: 360px;
  padding: 0;
  overflow: hidden;
  font-size: 14px;
  background-color: #ffffff;
  border: 1px solid #e3e4e5;
  border-radius: 8px;
  box-shadow: $popover-shadow;
  // 显示表情的集合名
  > .emotion-title {
    margin: 10px 14px 4px;
    line-height: 16px;
    color: #5a646e;
    letter-spacing: 1px;
  }

  // 被el-scroll包裹 所以层次有变
  .emotion-wrapper {
    margin: 6px 0 6px 6px;
    overflow: auto;
    word-break: break-word;

    & .emotion-item {
      display: inline-block;
      padding: 4px;
      cursor: pointer;
      border-radius: 4px;

      &:hover {
        background-color: $hover-bg;
      }
    }
  }
}

// 对于特定表情进行调整 [wx,emoji,颜文字]
.emotion-box.wx .emotion-item {
  margin: 4px;

  > img {
    width: 32px;
    height: 32px;
  }
}

// emoji字符
.emotion-box.emoji .emotion-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  margin: 6px;
  font-size: 28px;
}

// 颜文字
.emotion-box.kaomoji .emotion-item {
  width: auto;
  height: 28px;
  padding: 2px 4px;
  margin: 6px;
  font-size: 14px;
  line-height: 28px;
}
</style>
