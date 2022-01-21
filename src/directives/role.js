// 自定义指令 https://v3.cn.vuejs.org/guide/custom-directive.html
// v-role="'ADMIN'" | v-role="['ADMIN','TEST']"
import { useUserStore } from '/src/store/user'

const userStore = useUserStore()
const concat = Array.prototype.concat.bind([])

const roleDirective = {
  mounted: (el, binding) => {
    const value = binding.value
    if (!value) return
    // 字母全大写比较
    if (!hasPermission(value)) {
      el.remove()
    }
  },
}

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
  // 判断value跟user.roles是否有交集(全大写比较) /利用concat将非数组变成数组
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
