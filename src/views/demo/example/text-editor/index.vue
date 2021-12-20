<template>
  <div>
    <app-explain title="文本编辑器">
      <p>在左侧输入框输入标签，右侧实时将微信渲染成img标签 </p>
    </app-explain>
    <h2>
      <app-link sharp to="https://github.com/originjs/mavonEditor-next" />
      mavonEditor- A markdown editor
      <el-tag type="danger">Beta</el-tag>
    </h2>
    <div class="md-editor-container">
      <mavon-editor ref="me1" v-model="mdText" />
    </div>
    <el-button @click="printMdText">print origin text</el-button>
  </div>
</template>

<script>
// Using TinyMCE-Vue: https://www.tiny.cloud/docs/integrations/vue
// language-packages: https://www.tiny.cloud/get-tiny/language-packages/
// TODO 将TinyMCE封装成组件
import { ref } from 'vue'
import me from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'TextEditor',
  components: { mavonEditor: me.mavonEditor },
  setup() {
    const mdText = ref('Hello,world!')

    const me1 = ref(null)

    function printMdText() {
      console.log(mdText.value)
    }

    return { mdText, me1, printMdText }
  },
}
</script>

<style scoped>
.md-editor-container {
  margin: 4px;
  overflow: auto;
}

.v-note-wrapper {
  z-index: 10;
}
</style>
