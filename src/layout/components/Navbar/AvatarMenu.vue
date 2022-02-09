<template>
  <el-dropdown>
    <img class="dropdown-avatar" :src="avatar" alt="avatar" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in items"
          :key="item.title"
          :divided="item.divided"
          :disabled="item.disabled"
          @click="typeof item.handle === 'function' ? item.handle() : null"
        >
          <app-link :to="item.path">{{ item.title }}</app-link>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <p class="menu-nickname" v-show="nickname">{{ nickname }}</p>
</template>

<script>
export default {
  name: 'AvatarMenu',
  // http://localhost:8008/admin/#/profileindex
  // http://localhost:8008/admin/#/profile/index
  // 数组中的对象要有 title 属性，如果有path属性则会渲染成链接
  // 如果没有path属性，则会渲染成普通的item项，并在点击时触发item.handle函数
  props: { items: { type: Array, required: true }, avatar: {}, nickname: {} },
}
</script>

<style lang="scss" scoped>
.dropdown-avatar {
  width: calc(#{$navbar-height} - 4px);
  height: calc(#{$navbar-height} - 4px);
  margin-top: 1px;
  margin-left: 4px;
  cursor: pointer;
  border-radius: 8px;
}

.menu-nickname {
  margin: 0 8px;
  font-size: 14px;
  font-weight: bold;
  color: #655959;
  //border-bottom: 2px solid #655959;
}
</style>
