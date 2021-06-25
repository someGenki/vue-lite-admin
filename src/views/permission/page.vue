<template>
  <div>
    <div>权限相关页面</div>
    <div>
      <p>当前权限用户拥有权限:{{$store.state.user.roles}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PagePermission',
  setup() {
    console.log('page')
  },
}
</script>

<style scoped></style>
