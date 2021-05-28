export default {
  mounted(el, binding) {
    function documentHandler(e) {
      if (el.style.display === 'none' || el.contains(e.target)) return
      else binding.value()
    }
    el.__vueClickOutsie__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  unmounted(el) {
    document.removeEventListener('click', el.__vueClickOutsie__)
    delete el.__vueClickOutsie__
  },
}
