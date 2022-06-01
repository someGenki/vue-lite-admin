<template>
  <div>
    <app-explain title="文本编辑器">
      <p>推荐md-editor-v3</p>
    </app-explain>
    <h2>
      <app-link sharp to="https://github.com/imzbf/md-editor-v3">
        md-editor-v3
      </app-link>
      <el-tag type="info">@2.0.1</el-tag>
    </h2>
    <div class="md-editor-container">
      <md-editor no-prettier no-katex no-mermaid v-model="mdText"/>
    </div>
    <el-button @click="printMdText">print origin text to console</el-button>
  </div>
</template>

<script>
import {ref} from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

export default {
  name: 'TextEditor',
  components: {MdEditor},
  setup() {
    const mdText = ref('Hello,world!')


    function printMdText() {
      console.log(mdText.value)
    }

    return {mdText, printMdText}
  },
}
</script>

<style scoped>
.md-editor-container {
  margin: 4px;
  overflow: auto;
}
</style>
