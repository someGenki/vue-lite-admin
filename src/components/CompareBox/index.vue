<template>
  <div class="image-slider">
    <slot name="lower">
      <img class="gray" src="/src/assets/dio.jpg" />
    </slot>
    <div ref="upperImg" class="upper-img">
      <slot name="upper">
        <img src="/src/assets/dio.jpg" />
      </slot>
    </div>
    <input @input="changeRange" type="range" />
  </div>
</template>

<script>
// 交互式的图片对比控件 参考自 https://juejin.cn/post/6924206099193135111#heading-18
import { ref } from 'vue'

export default {
  name: 'CompareBox',
  setup() {
    const upperImg = ref(null)
    const changeRange = (e) => {
      upperImg.value.style.width = e.target.value + '%'
    }
    return { upperImg, changeRange }
  },
}
</script>

<style lang="scss" scoped>
.image-slider {
  position: relative;
  display: inline-block;
}

.image-slider > div {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 50%;
  overflow: hidden;
}

.image-slider img {
  display: inline-block;
  user-select: none;
}

.image-slider .gray {
  filter: blur(30px) opacity(0.6);
}

.image-slider input[type='range'] {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  margin: 0;
  filter: contrast(0.5);
  mix-blend-mode: luminosity;
}
</style>
