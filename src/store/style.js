import { defineStore } from 'pinia'
import { toRaw } from 'vue'

export const useStyleStore = defineStore('style', {
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
      background: '#304156',
      activeText: state['primary-color'],
    }),
  },
  actions: {
    // TODO 监听state改变 or 设置添加改变state的action
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
