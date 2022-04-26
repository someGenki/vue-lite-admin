<template>
  <app-explain title="图片输入框">
    <p>在左侧输入框输入标签，右侧实时将微信渲染成img标签 </p>
  </app-explain>
  <resize-box>
    <template #left>
      <el-input
        type="textarea"
        ref="textareaRef"
        :rows="4"
        placeholder="请输入内容"
        v-model="text1"
      />
      <app-emotion @emotion="(text)=>text1+=text"/>
      <!--新版本vs旧版本-->
      <emotion-box @emotion-add="(e) => (text1 += e)"/>
    </template>
    <template #right>
      <div style="min-height: 90px;padding: 8px;background: #fff;border-radius: 6px" v-html="processText"/>
    </template>
    <template #line>
      <app-icon icon="el-icon-right"/>
    </template>
  </resize-box>
</template>

<script>
import {computed, provide, ref} from 'vue'
import EmotionBox from '/src/components/EmotionBox/index.vue'
import ResizeBox from '/src/components/ResizeBox/index.vue'
import AppEmotion from '/src/components/AppEmotion/index.vue'
import {processEmotionText} from '/src/components/EmotionBox/useEmotions'

export default {
  name: 'EmotionDemo',
  components: {EmotionBox, ResizeBox, AppEmotion},
  setup() {
    const text1 = ref('')
    const textareaRef = ref(null)
    provide('textarea', textareaRef)
    const processText = computed(() => processEmotionText(text1.value))
    return {text1, processText, textareaRef}
  },
}
</script>

<style lang="scss" scoped></style>
