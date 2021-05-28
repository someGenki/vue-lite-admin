<template>
  <div>
    <h2>app-icon组件自带图标展示</h2>
    <p>
      使用方式：&lt;app-icon icon="github" size="32" color="red"
      /&gt;，使用svg图标需确保/src/assets/icon下存在对应文件名的svg文件
    </p>
    <h3>assets/icon下的SVG图标展示</h3>
    <ul class="icon-set clearfix">
      <li v-for="s in svgArr" :key="s">
        <app-icon size="36" :icon="s.replace('icon-', '')" />
        <span @click="copyTag(s)">{{ s }}</span>
      </li>
    </ul>
    <h3>
      <a
        target="_blank"
        href="https://element-plus.gitee.io/#/zh-CN/component/icon"
      >
        element-plus自带图标展示,详细点击这里
      </a>
    </h3>
    <ul class="icon-set clearfix">
      <li v-for="e in elIcon" :key="e">
        <app-icon size="36" :icon="e" />
        <span @click="copyTag(e)">{{ e }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  name: 'Icons',
  setup() {
    const svgArr = []
    const elIcon = [
      'el-icon-platform-eleme',
      'el-icon-eleme',
      'el-icon-delete-solid',
      'el-icon-delete',
      'el-icon-s-tools',
      'el-icon-setting',
      'el-icon-user-solid',
      'el-icon-user',
      'el-icon-phone',
      'el-icon-phone-outline',
      'el-icon-more',
      'el-icon-more-outline',
      'el-icon-star-on',
      'el-icon-star-off',
      'el-icon-s-goods',
      'el-icon-goods',
      'el-icon-warning',
      'el-icon-warning-outline',
      'el-icon-question',
      'el-icon-info',
      'el-icon-s-unfold',
      'el-icon-s-grid',
      'el-icon-refresh',
      'el-icon-loading',
    ]
    let child = document.getElementById('svgSpriteStats').children
    for (const c of child) {
      svgArr.push(c.id.replace('icon-', ''))
    }
    // 优秀的复制内容到剪切板的库👉 https://clipboardjs.com/
    const copyTag = (str) => {
      const el = document.createElement('textarea')
      const content = `<app-icon  :icon="${str}" />`
      el.value = content
      document.body.appendChild(el)
      el.select()
      document.execCommand('Copy')
      el.remove()
      el.setAttribute('readonly', '') //利用只读属性来防止弹出虚拟键盘
      ElMessage.success({
        message: `复制到剪切板:${content}`,
        type: 'success',
        center: true,
      })
    }
    return { svgArr, elIcon, copyTag }
  },
}
</script>

<style lang="scss" scoped>
.icon-set {
  list-style: none;
  padding: 0;
  margin-right: 20px;
  border-radius: 4px;
  background-color: white;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  li {
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center; /* 用于<i>标签的图标水平居中 */
    width: 12.5%;
    height: 120px;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    transition: color 0.5s;
    &:hover {
      color: $primary-color;
    }
    > span {
      margin-top: 4px;
    }
  }
  @media screen and (max-width: $lg-width) {
    & > li {
      width: 16.6%;
    }
  }
  @media screen and (max-width: $sm-width) {
    & > li {
      width: 25%;
    }
  }
}
</style>
