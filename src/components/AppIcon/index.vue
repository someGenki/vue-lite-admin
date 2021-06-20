<script>
/**
 * <app-icon icon="el-icon-right" />      el-开头将渲染成 <i/>
 * <app-icon icon="github" size="32" />   其他则渲染成 <svg>
 * @tips:
 * 1. 渲染成<i/>标签时，图标是和具体宽度在::before中，需要时可以对app-icon使用style="width: 16px" 设置宽度
 */
import { h } from 'vue'
export default {
  name: 'AppIcon',
  props: {
    icon: { type: String, required: true },
    // 如果svg标签的path标签已设置fill="color" 则该path的颜色也不会被更改
    color: { type: String },
    size: { default: 16 },
  },
  setup(props) {
    // 如果以特定前缀 则使用i标签 如自带的el-icon
    // 否则根据名字生成id使用svg>symbol里的svg(注入到index.html中body下的svg标签)
    const { icon, color, size } = props
    const sizePx = size + 'px'
    if (icon.startsWith('el-'))
      return () =>
        h('i', {
          class: icon + ' app-icon',
          style: { fontSize: sizePx, color },
        })
    else {
      const style = { width: sizePx, height: sizePx }

      if (color) {
        style.color = color
        style.fill = 'currentColor'
      }

      return () =>
        h(
          'svg',
          { style, class: 'svg-icon app-icon' },
          h('use', { 'xlink:href': '#icon-' + icon })
        )
    }
  },
}
</script>

<style>
.svg-icon {
  vertical-align: sub;
}
</style>
