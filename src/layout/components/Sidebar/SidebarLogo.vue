<template>
  <router-link
    :to="toPath"
    class="MutableLogo-wrapper"
    :style="{ backgroundColor, color: textColor }"
  >
    <img width="32" height="32" src="~@/assets/logo2.ico" alt="logo" />
    <h4 style="margin-left: 6px" v-show="isCollapse">{{ title }}</h4>
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
@import '/src/styles/_mixins.scss';

.MutableLogo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $sidebar-logo-height;
  overflow: hidden;
  cursor: pointer;

  h4 {
    @include ellipsis(1);
  }
}
</style>
