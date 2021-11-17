// 与ESlint类似的CSS检测工具， 用于样式规范检查与修复 https://cloud.tencent.com/developer/chapter/18030
// vue项目中使用新的单文件组件样式的特性（状态驱动的动态 CSS | v-bind(var) )时，值需要用引号包裹起来，避免被stylelint所格式化
module.exports = {
  root: true,
  plugins: ['stylelint-order', 'stylelint-scss'],
  extends: [
    // > 该风格是 Stylelint 的维护者汲取了 GitHub、Google、Airbnb 多家之长生成的一套css风格规则
    'stylelint-config-standard',
    // 兼容于prettier的规则，避免冲突
    'stylelint-config-prettier',
    // 对css进行排序 https://github.com/stormwarning/stylelint-config-recess-order/blob/main/index.js
    'stylelint-config-recess-order',
  ],
  rules: {
    'selector-pseudo-class-no-unknown': null,
    'selector-pseudo-element-no-unknown': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'return',
          'at-root',
          'apply',
          'variants',
          'responsive',
          'screen',
          'function',
          'if',
          'else',
          'each',
          'include',
          'mixin',
        ],
      },
    ],
    'no-empty-source': null,
    'named-grid-areas-no-invalid': null,
    'unicode-bom': 'never',
    'no-descending-specificity': null,
    'media-feature-name-no-vendor-prefix': true,
    'font-family-no-missing-generic-family-keyword': null,
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    // 'declaration-block-trailing-semicolon': 'always',
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
}
