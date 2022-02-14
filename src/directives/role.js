// 自定义指令 https://v3.cn.vuejs.org/guide/custom-directive.html
// v-role="'ADMIN'" | v-role="['ADMIN','TEST']"
import { useUserStore } from '/src/store/user'

const userStore = useUserStore()
const concat = Array.prototype.concat.bind([])

const roleDirective = (el, binding) => {
  const { value, modifiers } = binding
  if (!value) return
  // 字母全大写比较，不满足权限则隐藏或者添加禁用样式
  if (!hasPermission(value)) {
    if (modifiers.keep) {
      el.style.textDecoration = 'line-through'
      el.style.color = '#d0d0d0'
      el.style.cursor = 'not-allowed'
      el.style.pointerEvents = 'none'
    } else {
      el.remove()
    }
  }
}

/*
const roleDirective1 = {
  mounted: directiveHook,
  updated: directiveHook,
}
*/

/**
 *
 * @param value string | string[]
 * @param defVal 默认值
 * @returns {boolean}
 */
function hasPermission(value, defVal = true) {
  if (!value) return defVal

  // 基于getPermCodeList ... (差不多)
  //   ...

  // 基于store/user.roles[]
  // 判断value跟user.roles是否有交集(全大写比较)  利用concat将非数组变成数组
  return hasIntersection(concat(value), userStore['roles'])
}

// 判断数组是否有交集
function hasIntersection(arr1, arr2, upper = true) {
  if (upper) {
    arr1 = arr1.map((r) => r.toUpperCase())
    arr2 = arr2.map((r) => r.toUpperCase())
  }
  return arr1.some((a1) => arr2.includes(a1))
}

export default roleDirective
