import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

/* 引入ElementPlus并设置语言 */
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// import '/src/styles/element-variables.scss'

/* 引入自己的样式、JS文和组件 */
import '/src/styles/common.scss'
import appIcon from '/src/components/AppIcon/index.vue'

const app = createApp(App)
app.use(router).use(ElementPlus)
app.component('app-icon', appIcon)
app.mount('#app')
