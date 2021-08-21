// prettier前端代码格式化工具，需要配合插件
// 使用命令格式化所有文件  npx prettier --write .
module.exports = {
  printWidth: 80, // 换行宽度
  tabWidth: 2, // 缩进宽度 2
  useTabs: false, // 缩进不使用制表符
  semi: false, // 代码结尾不加分号
  singleQuote: true, // 使用单引号包裹字符串
  bracketSpacing: true, // true：{ foo: bar } false：{foo: bar}
  trailingComma: 'es5', // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  arrowParens: 'always', // 单个箭头的函数参数是否加()
  proseWrap: 'never', // 不要换行
  endOfLine: 'auto', // 结尾换行符
  vueIndentScriptAndStyle: false, //.vue文件中不缩进script和style标签内容
  htmlWhitespaceSensitivity: 'strict', // html文件中的全局空白区域敏感度:空格被认为是敏感的。
}
