<template>
  <span style="z-index: 1; color: white" :class="ribbonClass">
    <span style="cursor: pointer">{{ content }}</span>
  </span>
</template>

<script>
export default {
  name: 'SilkRibbon',
  props: {
    // 缎带的花样
    pattern: { type: Number, default: 1 },
    // 缎带的文字
    content: { type: String, default: '文字' },
  },
  computed: {
    ribbonClass() {
      if (this.pattern < 6 && this.pattern > 1)
        return 'silk-ribbon' + this.pattern
      else return 'silk-ribbon1'
    },
  },
}
</script>

<style lang="scss" scoped>
.silk-ribbon1 {
  position: absolute;
  top: -6px;
  right: 10px;
}

.silk-ribbon1::after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  content: '';
  border-top: 10px solid #f8463f;
  border-right: 40px solid transparent;
  border-left: 50px solid transparent;
}

.silk-ribbon1 span {
  position: relative;
  display: inline-block;
  width: 90px;
  padding: 12px 8px 10px;
  font-size: 14px;
  line-height: 1;
  text-align: center;
  background: #f8463f;
  border-top-right-radius: 8px;
}

.silk-ribbon1 span::before,
.silk-ribbon1 span::after {
  position: absolute;
  display: block;
  content: '';
}

.silk-ribbon1 span::before {
  top: 0;
  left: -6px;
  width: 6px;
  height: 6px;
  background: #f8463f;
}

.silk-ribbon1 span::after {
  top: 0;
  left: -8px;
  width: 8px;
  height: 6px;
  background: #c02031;
  border-radius: 8px 8px 0 0;
}

.silk-ribbon2 {
  position: absolute;
  top: -6px;
  left: 25px;
  display: inline-block;
  width: 60px;
  padding: 10px 0;
  text-align: center;
  background: #f47530;
  border-top-left-radius: 3px;
}

.silk-ribbon2::before {
  top: 0;
  right: -6px;
  width: 0;
  height: 0;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #8d5a20;
}

.silk-ribbon2::before,
.silk-ribbon2::after {
  position: absolute;
  content: '';
}

.silk-ribbon2::after {
  bottom: -30px;
  left: 0;
  width: 0;
  height: 0;
  border-right: 30px solid #f47530;
  border-bottom: 30px solid transparent;
  border-left: 30px solid #f47530;
}

.silk-ribbon3 {
  position: absolute;
  top: 20px;
  left: -8px;
  display: inline-block;
  width: 150px;
  height: 50px;
  padding-left: 15px;
  line-height: 50px;
  background: #59324c;
}

.silk-ribbon3::before,
.silk-ribbon3::after {
  position: absolute;
  content: '';
}

.silk-ribbon3::before {
  top: -8px;
  left: 0;
  width: 0;
  height: 0;
  border-bottom: 8px solid black;
  border-left: 8px solid transparent;
}

.silk-ribbon3::after {
  right: -15px;
  width: 0;
  height: 0;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  border-left: 15px solid #59324c;
}

.silk-ribbon4 {
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px 10px;
  background: #00b3ed;
  box-shadow: -1px 2px 4px rgba(0, 0, 0, 0.5);
}

.silk-ribbon4::before,
.silk-ribbon4::after {
  position: absolute;
  display: block;
  content: '';
}

.silk-ribbon4::before {
  top: 0;
  left: -7px;
  width: 7px;
  height: 100%;
  padding: 0 0 7px;
  background: inherit;
  border-radius: 5px 0 0 5px;
}

.silk-ribbon4::after {
  bottom: -5px;
  left: -5px;
  width: 5px;
  height: 5px;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 5px 0 0 5px;
}
</style>
