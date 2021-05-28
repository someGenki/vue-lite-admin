<template>
  <app-link v-if="lastRoute" :to="lastRoute.path">
    <el-menu-item :index="lastRoute.path">
      <app-icon :icon="lastRoute.meta.icon || 'el-icon-menu'" />
      <template #title>
        {{ lastRoute.meta.title }}
      </template>
    </el-menu-item>
  </app-link>

  <sidebar-item v-else-if="childCount === 1" :item="item.children[0]" />

  <el-submenu v-else-if="childCount > 1" :index="item.path">
    <template #title>
      <app-icon :icon="item.meta.icon || 'el-icon-s-grid'" />
      <span>{{ item.meta.title }}</span>
    </template>
    <sidebar-item
      v-for="child in item.children"
      :key="child.path"
      :item="child"
    />
  </el-submenu>
</template>

<script>
import { useRouter } from 'vue-router'
import AppLink from '/src/components/AppLink/index.vue'
/**
 * 路由表是个树形结构,叶节点：没有children的路由/度为0,分支节点就是度不为0的节点
 * 情况分析，当前路由=item
 * 1. 当前路由没有分叉，是单链表，直接作为(el-menu-item)展示
 * 2. 当前路由只有一个子路由，但是子路由有分叉 单次递归调用组件自己一次(sidebar-item)
 * 3. 当前路由有多个有效子路由  v-for+递归调用自己
 * [<3可能会出现：有2个有效子路由A,B，但是B的子路由又没有有效子路由，导致el-submenu之渲染了A的孩子) ..
 * 应更换showingChildCount函数,判断叶节点的数量，而非判断子节点(子路由)数量>]
 *
 */
export default {
  name: 'SidebarItem',
  props: { item: { type: Object, required: true } },
  components: { AppLink },
  setup(props) {
    //路由设置不显示则连子路由都不显示
    if (props.item.hidden) return {}

    // 有效子路由(子节点)的数量
    const childCount = showingChildCount(props.item)

    // 如果当前路由节点一路往下遍历，呈现单链表情况(一条直链),则返回最后一个有效节点，叫做leaf
    const lastChild = childCount < 2 ? hasOneShowingChild(props.item) : null

    // 子路由(leaf)的标准化路由<RouteLocation>对象or外链类型路由,
    let lastRoute = null

    if (lastChild && !lastChild.hidden && lastChild.name) {
      // 如果这个路由的path不是外链，就解析成标准的路由对象，否则直接返回它
      lastRoute = !isExternal(lastChild.path)
        ? useRouter().resolve({ name: lastChild.name }) // 找到vue-router中唯一标准路由对象
        : lastChild
    }

    return { childCount, lastRoute }
  },
}

/**
 * 判断树是否单链表情况（一条直链，没有分支） （嵌套的路由也是一种树！）
 * @param parentNode 生路由对象对象 RouteConfig
 * @return {*|null} 如果是直链则返回最后一个节点，不是就返回null
 */
function hasOneShowingChild(parentNode) {
  if (!Array.isArray(parentNode.children) || parentNode.children.length === 0) {
    return !parentNode.hidden ? parentNode : null // 遍历到叶节点
  }
  return parentNode.children.length === 1
    ? hasOneShowingChild(parentNode.children[0]) // 深度遍历
    : null
}

/**
 * 计算某个节点下有效子节点个数
 * @param parentNode 生路由对象对象 RouteConfig
 */
function showingChildCount(parentNode) {
  let count = 0
  // 生路由对象的children数组长度大于0时，进行遍历
  if (Array.isArray(parentNode.children) && parentNode.children.length > 0)
    parentNode.children.forEach((node) => {
      if (!node.hidden) count++
    })
  return count
}

/** 外链的正则判断 */
function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
</script>
