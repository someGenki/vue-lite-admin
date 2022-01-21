<template>
  <div>
    <div>权限相关页面</div>
    <div>
      <p>当前权限用户拥有权限:...</p>
    </div>
    <button v-role="'ADMIN'">ADMIN</button>
    <button v-role="'MAS'">MAS</button>
  </div>
</template>

<script>
import role from '/src/directives/role'

export default {
  name: 'PagePermission',
  directives: { role },
  setup() {
    console.log('page')
  },
}
</script>
