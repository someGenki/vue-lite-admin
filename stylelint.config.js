// 与ESlint类似的CSS检测工具， 用于样式规范检查与修复 https://cloud.tencent.com/developer/chapter/18030
// vue项目中使用新的单文件组件样式的特性（状态驱动的动态 CSS | v-bind(var) )时，值需要用引号包裹起来，避免被stylelint所格式化
module.exports = {
  root: true,
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-prettier',
    // 对css进行排序 → https://github.com/stormwarning/stylelint-config-recess-order/blob/main/index.js
    'stylelint-config-recess-order',
  ],
  rules: {
    'at-rule-no-unknown': null,
    'no-empty-source': null,
    'no-descending-specificity': null,
    'scss/at-import-partial-extension': null,
    'scss/at-import-no-partial-leading-underscore': null,
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
}
