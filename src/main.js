import { createApp, h } from 'vue'
import { RouterView } from 'vue-router'
import { setupStore } from './store'
import router from './router'

// 引入Element Plus
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

// 引入自己的样式、JS和组件
import '/src/styles/common.scss'
import appIcon from '/src/components/AppIcon/index.vue'
import appLink from '/src/components/AppLink/index.vue'
import appExplain from '/src/components/AppExplain/index.vue'



// 这里的替换掉了App.vue，因为里面暂时没啥东西，孤零零的就暂时把它放在这
const app = createApp({ render: () => h(RouterView) })

// \\ // \\  // \\ // \\  // \\ // \\

setupStore(app)

// \\ // \\  // \\ // \\  // \\ // \\

app.use(router).use(ElementPlus)

app.component('app-icon', appIcon)
app.component('app-link', appLink)
app.component('app-explain', appExplain)
app.mount('#app')
