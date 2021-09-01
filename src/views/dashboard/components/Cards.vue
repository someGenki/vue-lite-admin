<script>
import { h } from 'vue'
import { ElRow, ElCol } from 'element-plus'
import Github from './GithubState/index.vue'
import WeChat from './WeChatWallet/index.vue'
import Earning from './EarningPosition/index.vue'
import Bilibili from './BilibiliState/index.vue'

const cards = [Github, Bilibili, Earning, WeChat]

const ElColProps = {
  xs: 24,
  sm: 12,
  lg: 6,
  style: { paddingBottom: '10px' },
}

// 根据cards的数量生成N个被ElCol包裹的卡片组件
const renderElColCard = cards.map((card) =>
  h(ElCol, ElColProps, { default: () => h(card) })
)

/**
 * 函数式组件用法示例，但不常用哦
 * docs：https://v3.cn.vuejs.org/guide/migration/functional-components.html
 */
export default function (props) {
  return h(ElRow, props, { default: () => renderElColCard })
}
</script>
