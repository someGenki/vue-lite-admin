// 自定义指令 https://v3.cn.vuejs.org/guide/custom-directive.html
// v-role="ADMIN"
const roleDirective = {
  mounted(el, binding) {
    const value = binding.value

    // TODO 在这里写判断逻辑，返回为true时正常显示该元素
    let result = true
    // 如果result返回的结果为false，则不显示该元素
    !result && el.parentNode && el.parentNode.removeChild(el)
  },
}
