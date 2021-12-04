<template>
  <div>
    <app-explain title="app-icon组件自带图标展示">
      <p>
        使用方式：&lt;app-icon icon="github" size="32" color="red"/&gt;，
        使用svg图标需确保/src/assets/icon下存在对应文件名的svg文件
      </p>
    </app-explain>
    <h3>assets/icon下的SVG图标展示</h3>
    <ul class="icon-set clearfix">
      <li v-for="s in svgArr" @click="copyIconTag(s)" :key="s">
        <app-icon size="36" :icon="s.replace('icon-', '')" />
        <span>{{ s }}</span>
      </li>
    </ul>

    <h3>
      <a
        target="_blank"
        href="https://element-plus.gitee.io/zh-CN/component/icon.html"
      >
        element-plus自带图标展示
      </a>
    </h3>
    <p>el-icon已全局注册，图标使用支持小驼峰和中划线分隔两个命名格式</p>
    <p>
      e.g:&lt;app-icon icon="elIconApple" /&gt; and &lt;app-icon
      icon="el-icon-apple" /&gt;
    </p>
    <ul class="icon-set clearfix">
      <li
        v-for="name in showElIcons"
        :key="name"
        @click="copyIconTag(name, true)"
      >
        <app-icon size="36" :icon="name" />
        <span>{{ name.replace('elIcon', '') }}</span>
      </li>
      <el-button
        class="load-more-icon"
        @click="loadMoreElIcon"
        :disabled="noMoreElIcon"
        type="text"
      >
        加载更多
        <i class="el-icon-arrow-right" />
      </el-button>
    </ul>
  </div>
</template>

<script>
// 相关参考 https://juejin.cn/post/6966491047257964575#heading-3
import { ElMessage } from 'element-plus'
import { getCurrentInstance, reactive, ref } from 'vue'

export default {
  name: 'Icons',
  setup() {
    // 获取 body > svg#svgSpriteStats 标签下的svg图标
    const svgArr = []
    const child = document.getElementById('svgSpriteStats').children
    for (const c of child) {
      svgArr.push(c.id.replace('icon-', ''))
    }

    // 获取已经全局注册的el-icon图标
    const {
      appContext: { components: comps },
    } = getCurrentInstance()
    const noMoreElIcon = ref(false)
    const elIcons = Object.keys(comps).filter((k) => k.startsWith('elIcon'))
    const elIconsSpliceLength = elIcons.length / 4
    const showElIcons = reactive(elIcons.slice(0, elIconsSpliceLength))

    function loadMoreElIcon() {
      elIcons.length > 0
        ? showElIcons.push(...elIcons.splice(0, elIconsSpliceLength))
        : (noMoreElIcon.value = true)
    }

    return { svgArr, showElIcons, copyIconTag, loadMoreElIcon, noMoreElIcon }
  },
}

// 优秀的复制内容到剪切板的库👉 https://clipboardjs.com/
function copyIconTag(str, toKebab) {
  const content = `<app-icon icon="${
    /* 是否驼峰转中划线 */
    toKebab ? str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() : str
  }" />`

  const textarea = document.createElement('textarea')
  textarea.value = content
  textarea.addEventListener('focusin', (e) => e.stopPropagation())
  textarea.setAttribute('readonly', '')
  document.body.appendChild(textarea)

  textarea.select()
  document.execCommand('Copy')
  textarea.remove()

  ElMessage.success({
    message: `已复制到剪切板:${content}`,
    type: 'success',
    center: true,
  })
}
</script>

<style lang="scss" scoped>
.icon-set {
  padding: 0;
  margin-right: 20px;
  list-style: none;
  background-color: white;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  border-radius: 4px;
  @media screen and (max-width: $lg-width) {
    & > li {
      width: 16.6% !important;
    }
  }
  @media screen and (max-width: $sm-width) {
    & > li {
      width: 25% !important;
    }
  }

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    float: left;
    width: 12.5%;
    height: 120px;
    text-align: center; /* 用于<i>标签的图标水平居中 */
    cursor: pointer;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    transition: color 0.5s;

    &:hover {
      color: var(--primary-color);
      background-color: #f2f3f4;
    }

    > .svg-icon {
      margin-top: 8px;
      color: #99a9bb;
    }
  }
}

.load-more-icon {
  padding-left: 18px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}
</style>
