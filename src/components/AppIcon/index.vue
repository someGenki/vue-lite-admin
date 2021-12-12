<template>
  <i v-bind="$attrs" class="svg-icon">
    <el-icon v-if="iconType === 'ElIcon'" v-bind="iconProp">
      <component :is="iconName" />
    </el-icon>
    <svg v-else v-bind="iconProp">
      <use :xlink:href.attr="iconName" />
    </svg>
  </i>
</template>

<script>
/**
 * <app-icon icon="el-icon-right" />      el-开头将渲染成 <i/> el图标支持小驼峰和中划线分割命名
 * <app-icon icon="github" size="32" />   其他则渲染成 <svg>
 *
 * 附： 动态组件 <component :is="xxx" />模板编译的结果：_resolveDynamicComponent(xxx)
 * 该函数被定义在 runtime-core/src/helpers/resolveAssets.ts，内部调用app.context获取对应已注册的组件
 * component 内置组件除了支持 is 绑定之外，也支持其他属性绑定和事件绑定
 */
import { ElIcon } from 'element-plus'

export default {
  name: 'AppIcon',
  components: { ElIcon },
  props: {
    icon: { type: String, required: true },
    // 如果svg标签的path标签已设置fill="color" 则该path的颜色也不会被更改
    color: { type: String },
    size: { default: 16 },
  },
  setup(props) {
    const { icon, color, size } = props
    let iconType, iconName, iconProp
    if (icon.startsWith('el-icon-') || icon.startsWith('elIcon')) {
      iconType = 'ElIcon'
      iconName = icon
      iconProp = { color, size: Number(size) }
    } else {
      // 根据名字生成id使用svg>symbol里的svg标签(已提前注入到index.html中body下的svg标签)
      iconType = 'Custom'
      iconName = '#icon-' + icon
      const sizePx = size + 'px'
      const style = { width: sizePx, height: sizePx }
      if (color) {
        style.color = color
        style.fill = 'currentColor'
      }
      iconProp = { style }
    }
    return { iconType, iconName, iconProp }
  },
}
</script>

<style>
.svg-icon {
  display: inline-flex;
}

/* 解决element-plus<V^1.2.0-beta.4~V^1.2.0-beta.6>组件库中<el-icon>的样式更新导致size属性失效 */
.el-icon {
  font-size: var(--font-size);
}
</style>
