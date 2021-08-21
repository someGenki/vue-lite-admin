<template>
  <router-link
    :to="toPath"
    class="MutableLogo-wrapper"
    :style="{ backgroundColor, color: textColor }"
  >
    <img src="~@/assets/logo.png" alt="logo" />
    <h4 style="margin-left: 10px" v-show="isCollapse">{{ title }}</h4>
  </router-link>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    toPath: { default: '/' },
    isCollapse: { default: false },
    textColor: { default: '#dcdcdc' },
    title: { default: 'Admin-Template' },
    backgroundColor: { default: '#2f343d' },
  },
}
</script>

<style lang="scss" scoped>
.MutableLogo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $sidebar-logo-height;
  overflow: hidden;
  cursor: pointer;

  img {
    height: 36px;
    width: 36px;
  }
}
</style>
