<template>
  <div>
    <span>设置h1标签数量：</span>
    <el-input-number
      v-model="num"
      size="small"
      :min="1"
      :max="1000"
      label="设置h1标签数量"
    />
    <h1 v-for="i in num">这是个标题-{{ i }}</h1>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'scroll-page',
  setup() {
    const num = ref(50)
    return { num }
  },
}
</script>

<style scoped></style>
