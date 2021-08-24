import { createApp, h } from 'vue'
import { RouterView } from 'vue-router'
import router from './router'

// 引入Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

// 引入自己的样式、JS文和组件
import '/src/styles/common.scss'
import appIcon from '/src/components/AppIcon/index.vue'
import { setupStore } from './store/pinia'

// 这里的替换掉了App.vue，因为里面暂时没啥东西，孤零零的就暂时把它放在这
const app = createApp({ render: () => h(RouterView) })

// \\ // \\  // \\ // \\  // \\ // \\
setupStore(app)
// \\ // \\  // \\ // \\  // \\ // \\

app.use(router).use(ElementPlus)
app.component('app-icon', appIcon)

app.mount('#app')
