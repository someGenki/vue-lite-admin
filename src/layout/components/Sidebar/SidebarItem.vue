<template>
  <el-sub-menu
    v-if="item.children && item.children.length > 0"
    :index="item.path"
  >
    <template #title>
      <app-icon :icon="item.icon || 'el-icon-grid'" />
      <span style="margin-left: 4px">{{ item.title }}</span>
    </template>
    <sidebar-item
      v-for="child in item.children"
      :key="child.path"
      :item="child"
    />
  </el-sub-menu>

  <app-link v-else :to="realPath">
    <el-menu-item :index="realPath">
      <app-icon :icon="item.icon || 'el-icon-menu'" />
      <template #title>
        <span style="margin-left: 4px">{{ item.title }}</span>
      </template>
    </el-menu-item>
  </app-link>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'SidebarItem',
  props: { item: { type: Object, required: true } },
  setup(props) {
    const menu = props.item
    const router = useRouter()
    const realPath =
      !isExternal(menu.path) && menu.name
        ? router.resolve({ name: menu.name }).path
        : menu.path
    return { realPath }
  },
}

/** 外链的正则判断 */
function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
</script>
