<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item v-for="item in list" :to="{ name: item.name }">
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: ['list'],
}
</script>

<style scoped>
.app-breadcrumb {
  display: inline-block;
}

/* 修改el-breadcrumb的样式位于/src/style/element-plus.css */
</style>
