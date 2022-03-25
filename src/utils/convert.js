/**
 * 将中划线格式字符串驼峰化
 * @example first-name => firstName
 * @from vue-next/packages/shared/src/index.ts
 */
export function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}

/**
 * 将驼峰化(Lower Camel Case)转换成Kebab Case
 * 大驼峰的化要自己处理下前面的 - 号
 * @example firstName => first-name
 */
export function KebabCase(str) {
  return str.replace(/[A-Z]/g, (_, c) => '-' + c.toLowerCase())
}
