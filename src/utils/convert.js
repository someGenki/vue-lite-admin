const camelizeRE = /-(\w)/g

/**
 * 将中划线格式字符串驼峰化
 * @example jo-jo => joJo
 * @from vue-next/packages/shared/src/index.ts
 */
export function camelize(str) {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}
