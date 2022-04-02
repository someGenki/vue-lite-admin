import { createApp, h } from 'vue'
import { RouterView } from 'vue-router'
import store from './store'
import router from './router'

// 引入Element Plus和Element icons
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons'

// 引入自己的CSS、JS和Component
import 'virtual:svg-sprites-create'
import '/src/styles/common.scss'
import tracking from '/src/hooks/useTracking'
import AppIcon from '/src/components/AppIcon/index.vue'
import AppLink from '/src/components/AppLink/index.vue'
import AppExplain from '/src/components/AppExplain/index.vue'
import { globalRegister } from './utils/compRegister'

// 这里的替换掉了App.vue，因为里面暂时没啥东西，孤零零的就暂时把它放在这 addEventListener
const app = createApp({ render: () => h(RouterView) })

// \\ // \\  // \\ // \\  // \\ // \\

globalRegister(app, ElIcons, { prefix: 'elIcon' })

// \\ // \\  // \\ // \\  // \\ // \\

app.use(router).use(store).use(ElementPlus).use(tracking)

app.component('app-icon', AppIcon)
app.component('app-link', AppLink)
app.component('app-explain', AppExplain)

app.mount('#app')
