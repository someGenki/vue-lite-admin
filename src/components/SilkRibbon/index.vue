<template>
  <span style="z-index: 110; color: white" :class="ribbonClass">
    <span style="cursor: pointer">{{ content }}</span>
  </span>
</template>

<script>
export default {
  name: 'SilkRibbon',
  props: {
    // 缎带的花样
    pattern: {
      type: Number,
      default: 1,
    },
    // 缎带的文字
    content: {
      type: String,
      default: '文字',
    },
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
.silk-ribbon1:after {
  position: absolute;
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 40px solid transparent;
  border-top: 10px solid #f8463f;
}
.silk-ribbon1 span {
  position: relative;
  display: inline-block;
  text-align: center;
  background: #f8463f;
  font-size: 14px;
  line-height: 1;
  padding: 12px 8px 10px;
  border-top-right-radius: 8px;
  width: 90px;
}
.silk-ribbon1 span:before,
.silk-ribbon1 span:after {
  position: absolute;
  content: '';
  display: block;
}
.silk-ribbon1 span:before {
  background: #f8463f;
  height: 6px;
  width: 6px;
  left: -6px;
  top: 0;
}
.silk-ribbon1 span:after {
  background: #c02031;
  height: 6px;
  width: 8px;
  border-radius: 8px 8px 0 0;
  left: -8px;
  top: 0;
}

.silk-ribbon2 {
  display: inline-block;
  width: 60px;
  padding: 10px 0;
  background: #f47530;
  top: -6px;
  left: 25px;
  position: absolute;
  text-align: center;
  border-top-left-radius: 3px;
}
.silk-ribbon2:before {
  height: 0;
  width: 0;
  border-bottom: 6px solid #8d5a20;
  border-right: 6px solid transparent;
  right: -6px;
  top: 0;
}
.silk-ribbon2:before,
.silk-ribbon2:after {
  content: '';
  position: absolute;
}
.silk-ribbon2:after {
  height: 0;
  width: 0;
  border-left: 30px solid #f47530;
  border-right: 30px solid #f47530;
  border-bottom: 30px solid transparent;
  bottom: -30px;
  left: 0;
}

.silk-ribbon3 {
  display: inline-block;
  position: absolute;
  width: 150px;
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
  background: #59324c;
  left: -8px;
  top: 20px;
}
.silk-ribbon3:before,
.silk-ribbon3:after {
  content: '';
  position: absolute;
}
.silk-ribbon3:before {
  height: 0;
  width: 0;
  border-bottom: 8px solid black;
  border-left: 8px solid transparent;
  top: -8px;
  left: 0;
}
.silk-ribbon3:after {
  height: 0;
  width: 0;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  border-left: 15px solid #59324c;
  right: -15px;
}

.silk-ribbon4 {
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px 10px;
  background: #00b3ed;
  box-shadow: -1px 2px 4px rgba(0, 0, 0, 0.5);
}
.silk-ribbon4:before,
.silk-ribbon4:after {
  position: absolute;
  content: '';
  display: block;
}
.silk-ribbon4:before {
  width: 7px;
  height: 100%;
  padding: 0 0 7px;
  top: 0;
  left: -7px;
  background: inherit;
  border-radius: 5px 0 0 5px;
}
.silk-ribbon4:after {
  width: 5px;
  height: 5px;
  background: rgba(0, 0, 0, 0.35);
  bottom: -5px;
  left: -5px;
  border-radius: 5px 0 0 5px;
}
</style>
