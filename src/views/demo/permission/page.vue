<template>
  <div>
    <h2>权限页面</h2>
    <div>
      <p>当前权限用户拥有权限:{{ roles }}</p>
    </div>
    <h3>v-role指令控制元素是否可见</h3>
    <div v-if="!tagsRefresh" class="tag-group">
      <el-tag v-role="'ADMIN'" effect="dark" size="large"> ADMIN</el-tag>
      <el-tag v-role.keep="'ADMIN'" effect="dark" size="large">
        ADMIN(keep)
      </el-tag>
      <el-tag v-role="['ADMIN', 'TEST']" effect="dark" size="large">
        ['ADMIN','TEST']
      </el-tag>

      <el-tag v-role="'TEST'" effect="dark" size="large">TEST</el-tag>
      <el-tag v-role="'MAS'" effect="dark" size="large">MAS</el-tag>
    </div>
    <h3>切换角色</h3>
    <div>
      <el-button v-if="!roles.includes('test')" @click="changeRole('test')">
        test
      </el-button>
      <el-button v-if="!roles.includes('admin')" @click="changeRole('admin')">
        admin
      </el-button>
    </div>
  </div>
</template>

<script>
import role from '/src/directives/role'
import { useUserStore } from '/src/store/user'
import { ref, nextTick } from 'vue'

export default {
  name: 'PagePermission',
  directives: { role },
  setup() {
    const userStore = useUserStore()
    const roles = userStore.roles
    const tagsRefresh = ref(false)

    const changeRole = (role) => {
      userStore.changeRoles([role])
      tagsRefresh.value = true
      nextTick(() => (tagsRefresh.value = false))
    }

    return { changeRole, roles, tagsRefresh }
  },
}
</script>

<style>
.tag-group > span {
  margin-right: 8px;
  font-weight: bold;
}
</style>
