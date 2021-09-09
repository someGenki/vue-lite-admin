<template>
  <div class="easy-nav-grid">
    <a
      target="_blank"
      :href="nav.link"
      class="easy-nav-grid__card"
      v-for="nav in navs"
    >
      <img :src="nav.img"  alt="Logo"/>
      <p>{{ nav.title }}</p>
      <span title="nav-desc">{{ nav.desc }}</span>
    </a>
  </div>
</template>

<script>
/**
 * @需求分析:
 * 1. 不同的布局选择
 *  1. 中图表-下文字
 *  2. 上图片-中标题-下描述 √
 *  3. 左图片-右上标题-右下描述
 *  4. 纯标题
 * 2. 必要属性
 *  1. link
 *  2. layout
 * 3. 后续加入
 *  1. 分组管理
 *  2. 动态添加
 *  3. 缩小功能
 */
export default {
  name: 'EasyNav',
  props: {
    navs: { type: Array, required: true },
  },
}
</script>

<style lang="scss" scoped>
.easy-nav-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  grid-gap: 6px;

  &__card {
    position: relative;
    display: inline-flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    height: 150px;
    padding: 6px;
    text-align: center;
    background-color: white;
    border-radius: 12px;
    transition: box-shadow 0.25s;

    > img {
      width: 60%;
      max-height: 55%;
    }

    > p {
      max-width: 100%;
      margin: 6px 0;
      overflow: hidden;
      font-size: 70%;
      font-weight: bold;
      color: #337ab7; // 动态设置
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    > span {
      display: -webkit-box;
      overflow: hidden;
      font-size: 65%;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    &:hover {
      box-shadow: 4px 10px 16px rgb(36 37 38 / 13%);
    }
  }
}
</style>
