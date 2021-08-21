<template>
  <div ref="resizeBox" class="resize-box" :class="'resize-box--' + direction">
    <div class="resize-box__left" :style="{ minWidth, padding }" ref="leftBox">
      <slot name="left" />
    </div>
    <div
      class="resize-box__line"
      :class="'line--' + direction"
      @mousedown.stop.passive="resizeBoxWidth"
      @touchstart.stop.passive="resizeBoxWidth"
      ref="rbLine"
    >
      <div style="flex: 2" :style="{ backgroundColor: lineColor }" />
      <slot name="line">
        <app-icon icon="el-icon-right" />
      </slot>
      <div :style="{ backgroundColor: lineColor, flex: positionRatio }" />
    </div>
    <div class="resize-box__right" :style="{ minWidth, padding }">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, toRefs } from 'vue'
/**
 * 这个破组件写的有点复杂了。。。
 * 关于元素位置/大小 可看文章 http://www.ruanyifeng.com/blog/2009/09/find_element_s_position_using_javascript.html
 基础用法 ↓
<resize-box>
 <template #left>
    <h1>left-content</h1>
 </template>
 <template #line>
    <app-icon icon="el-icon-right"/>
 </template>
 <template #right>
    <h1>right-content</h1>
 </template>
</resize-box>
 关于line中间的提示文本(文案)的使用,推荐使用自带的app-icon组件
 如果是自己的内容，可以自行transform: translateX(-200%) 来定位
 **/
export default {
  name: 'ResizeBox',
  props: {
    // 调整大小时，给左右盒子留的最小宽度(宽度保留) style写法
    minWidth: { type: String, default: '10%' },
    // 左右盒子的内边距 style的写法
    padding: { type: String, default: '8px' },
    // 设置调整的方向   horizontal / vertical
    direction: { type: String, default: 'horizontal' },
    // 调整线的内容位置  /* left / right / center */
    contentPosition: { type: String, default: 'center' },
    // 调整线的颜色     style的写法
    lineColor: { type: String, default: 'white' },
  },
  emits: [],
  setup(props) {
    const resizeBox = ref(null),
      leftBox = ref(null),
      rbLine = ref(null),
      rbInfo = {} /* 不需要响应式 */
    const { contentPosition, direction } = toRefs(props)
    // 分割线左右设置长度比例
    const positionRatio = computed(() => {
      if (contentPosition.value === 'left') return 3
      else if (contentPosition.value === 'right') return 1
      else return 2 /* 另一条线flex:2; 2/(2+2) 呈现居中  */
    })
    // 方便移动时(resizeStart函数调用)快速判断方向
    let isHorizontal

    // resize开始 修改leftBox的宽度
    const resizeStart = (e) => {
      e.stopPropagation()
      /* 盲猜这样的性能比<字符串之间的比较好些些> if (e.type === 'touchmove') e = e.changedTouches[0]*/
      if (e.changedTouches) e = e.changedTouches[0]
      if (isHorizontal) leftBox.value.style.width = e.pageX - rbInfo.left + 'px'
      else leftBox.value.style.height = e.pageY - rbInfo.top + 'px'
    }

    // resize结束 回复原来的样式，删除相关事件
    const resizeEnd = () => {
      const rb = resizeBox.value
      rb.style.cursor = rb.style.userSelect = null
      rb.style.width = rbInfo.styleWidth
      rb.style.height = rbInfo.styleHeight
      rb.removeEventListener('mousemove', resizeStart)
      rb.removeEventListener('touchmove', resizeStart)
      document.removeEventListener('mouseup', resizeEnd)
      document.removeEventListener('touchend', resizeEnd)
    }

    /** @按下事件：用于注册事件以及其他初始化工作 */
    const resizeBoxWidth = () => {
      const rb = resizeBox.value
      isHorizontal = direction.value === 'horizontal'
      if (isHorizontal) {
        /* resize-box左顶点距离整张页面左顶点的绝对距离之水平距离 */ rbInfo.left =
          rb.getBoundingClientRect().left + document.documentElement.scrollLeft
        rbInfo.styleWidth = rb.style.width // 记录原始的style属性
        rb.style.width = rb.offsetWidth + 'px' // 指定父容器宽度样式防止父容器变大
      } else {
        /* resize-box左顶点距离整张页面左顶点的绝对距离之垂直距离 */ rbInfo.top =
          rb.getBoundingClientRect().top + document.documentElement.scrollTop
        rbInfo.styleHeight = rb.style.height
        rb.style.height = rb.offsetHeight + 'px'
      }
      // 拖动期间避免区域内的文字被选中进而导致无法拖动
      rb.style.userSelect = 'none'
      rb.style.cursor = isHorizontal ? 'w-resize' : 'n-resize'
      /** @移动事件：修改left-box容器的尺寸 */
      rb.addEventListener('mousemove', resizeStart)
      /*
        设置 passive=true 解决警告，具体为什么可查看MDN的addEventListener文档
        Added non-passive event listener to a scroll-blocking 'mousewheel' event.
        Consider marking event handler as 'passive' to make the page more responsive
      */
      rb.addEventListener('touchmove', resizeStart, { passive: true })
      /** @抬起事件：清除移动事件和抬起事件 */
      document.addEventListener('mouseup', resizeEnd)
      document.addEventListener('touchend', resizeEnd)
    }

    return { resizeBox, leftBox, rbLine, positionRatio, resizeBoxWidth }
  },
}
</script>

<style lang="scss" scoped>
.resize-box {
  display: flex;
  position: relative;
}

.resize-box--horizontal {
  flex-direction: row;

  > .line--horizontal {
    flex-direction: column;
    width: 2px;
    min-height: 100px;
    cursor: w-resize;
    // 使文字纵向排列
    word-wrap: break-word;
    // 使用伪元素扩大可点击范围
    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: -6px;
      left: -6px;
    }
  }

  > .resize-box__left {
    width: 50%; /* 初始宽度 */
  }
}

.resize-box--vertical {
  flex-direction: column;

  > .line--vertical {
    flex-direction: row;
    min-width: 100%;
    height: 2px;
    cursor: n-resize;
    // 使用伪元素扩大可点击范围
    &::before {
      content: '';
      position: absolute;
      top: -6px;
      bottom: -6px;
      right: 0;
      left: 0;
    }
  }

  /*  > .resize-box__left {
    height: 50%; !* 初始高度 *!
  } */
}

.resize-box__line {
  display: flex;
  position: relative;
}

.resize-box__left {
  overflow: auto;
  flex-shrink: 0;
}

.resize-box__right {
  overflow: auto;
  flex-grow: 1; /* 占满右边剩下宽度 */
}
</style>

<style>
.line--horizontal > .app-icon {
  width: 16px;
  transform: translateX(-40%);
}

.line--vertical > .app-icon {
  height: 16px;
  transform: translateY(-40%);
}
</style>
