import { defineStore } from 'pinia'
import { toRaw } from 'vue'

export const useStyleStore = defineStore('style', {
  // TODO 增加缓存到localstorage中
  state: () => ({
    'primary-color': '#35A7FF',
    'primary-color-tinge': '#75d2de',
    'primary-text-color': '#000000a6',
    'primary-text-color-tinge': '#00000070',
  }),
  getters: {
    // 侧边菜单栏颜色样式
    elMenuStyle: (state) => ({
      text: '#dcdcdc',
      background: 'transparent',
      activeText: state['primary-color'],
    }),
  },
  actions: {
    injectCssVarToRoot() {
      const styles = document.documentElement.style
      const vars = toRaw(this.$state)
      Object.keys(vars).forEach((item) => {
        styles.setProperty('--' + item, vars[item])
      })
    },
    changePrimaryColor(val) {
      document.documentElement.style.setProperty('--primary-color', val)
    },
  },
})
