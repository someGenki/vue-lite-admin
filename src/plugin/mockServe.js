// 基于vite-plugin-mock插件的再封装
// 使用说明 https://github.com/anncwb/vite-plugin-mock/blob/main/README.zh_CN.md
import { viteMockServe } from 'vite-plugin-mock'

// 关于模式 https://cn.vitejs.dev/guide/env-and-mode.html#modes
const isDev = (command) => command === 'serve'

const isProd = (command) => command === 'build'

// TODO 使用fs模块遍历mock下的xxx.js文件
const injectCode = `
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import data from '../mock/data.js'
!function () { createProdMockServer([...data])}();
`

/**
 * @param mode 参考 https://cn.vitejs.dev/guide/env-and-mode.html#modes
 * @param option 可选，vite-plugin-mock的所需的配置项，用于覆盖默认的。细节见该文件头顶的链接
 */
export const mockServe = function (mode, option = null) {
  const _option = {
    // 默认开启’开发模式‘下的 mock 功能，若要关闭直接设置为 false
    localEnabled: isDev(mode),
    // 默认开启’生产模式‘下的 mock 功能，若要关闭直接设置为 false
    prodEnabled: isProd(mode),
    // 根据 prodEnabled 的值，动态控制生产环境中mock的开启，未开启的mock也将不会被打包
    injectCode,
  }

  const mergedOption = Object.assign(_option, option)

  return viteMockServe(mergedOption)
}
