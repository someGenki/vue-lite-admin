<template>
  <el-dropdown size="medium">
    <img class="dropdown-avatar" :src="avatar" alt="avatar" />
    <template #dropdown>
      <el-dropdown-menu>
        <template v-for="i in items" :key="i.title">
          <app-link v-if="i.path && !i.disabled" :to="i.path">
            <el-dropdown-item :divided="i.divided" v-text="i.title" />
          </app-link>
          <el-dropdown-item
            v-else
            v-text="i.title"
            :divided="i.divided"
            :disabled="i.disabled"
            @click.prevent="typeof i.handle === 'function' ? i.handle() : null"
          />
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <p class="menu-nickname" v-show="nickname">{{nickname}}</p>
</template>

<script>

export default {
  name: 'AvatarMenu',
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
  border-radius: 8px;
  cursor: pointer;
}

.menu-nickname {
  margin: 0 8px;
  font-size: 14px;
  font-weight: bold;
  //border-bottom: 2px solid #655959;
  color: #655959;
}
</style>
