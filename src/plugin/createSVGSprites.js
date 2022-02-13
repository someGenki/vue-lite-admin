/**
 *  加载目标目录下的所有SVG文件，生成一个个 <symbol> 标签来组成 SVG Sprites。

 *  <b>使用方法</b>：
 *  import { createSVGSprites } from './src/plugin/createSVGSprites'    // at vite.config.js
 *  plugins: [ createSVGSprites() ]                                     // 注册该插件
 *
 *  import 'virtual:svg-symbol-create'    // 在 /src/main.js 中导入注册脚本就完事了哈
 *
 *  导入该脚本返回一个ESM模块文件，并自动执行相关代码以生成一个个 <symbol> 标签插入到 document.body 中
 *  使用 <svg width="xx" height="xx"> <use xlink:href="#icon-icon1"></use> </svg>，
 *    即可对已经生成的<symbol>标签进行ID引用并展示 SVG 图标。
 *  svg中的width和height属性即是SVG的画布大小，亦可使用 style="width: 36px;height: 36px;"
 *
 *  <b>参考链接</b>：
 *    关于SVG的viewBox https://blog.csdn.net/weixin_34080903/article/details/90158481
 *    <symbol> 概念：https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/symbol
 *    Vite插件 API：https://cn.vitejs.dev/guide/api-plugin.html
 */
import { readFileSync, readdirSync } from 'fs'
import path from 'path'

const pluginName = 'rollup:svg-sprites-create'
const virtualModuleId = 'virtual:svg-sprites-create'
const resolvedVirtualModuleId = '\0' + virtualModuleId
// 提取SVG的开始标签及其viewBox属性(viewBox属性代表可视区域)
const svgTagExtract = /.*<svg[^<>]*viewBox="([^"]*)"[^<>]*>/
// 默认配置项
const defaultOption = {
  path: '/src/icons/',
  symbolIdPrefix: 'icon',
  separator: '-',
  customEleId: 'svgSpriteStats',
}

/**
 * 将对象内的属性视为模块的导出属性，生成一个字符串化的模块脚本
 * @example
 *   const res = moduleStringify( {fn: function(){}} );
 *   res === 'export const fn=function(){};export default {}'; // true
 * @param {object} module 对象中的属性视为要导出模块的属性
 * @param {string} runNow 声明完导出属性后，立即执行的代码段
 * @returns {string} 字符串形式的ESM模块脚本
 */
function moduleStringify(module, runNow = '') {
  const stringify = (key) => {
    const target = module[key]
    if (typeof target === 'function') {
      return `export const ${key}=${target.toString()};`
    } else {
      return `export const ${key}=${JSON.stringify(target)};`
    }
  }
  const code = Object.keys(module).reduce(
    (prev, key) => prev + stringify(key),
    ''
  )
  return `${code}\n${runNow}\n` + 'export default {}'
}

/**
 * 加载目标路径下的 svg 文件，生成<symbol>标签集合
 * @param {string} path 目标绝对路径，形如 c:/xx/xx/<project-name>/src/...
 * @param {string} prefix 生成symbol标签的id的前缀
 * @param {string} separator id前缀和文件名之间的分隔符
 * @returns {string} 作用于 SVG Element 的 innerHTML 字符串
 */
function preloadSVGToHTML(path, prefix, separator) {
  let SVGInnerHTML = ''
  const getSVGFile = (_path) => {
    const dirs = readdirSync(_path, { withFileTypes: true }) // 读取目录的内容
    for (const dir of dirs) {
      if (dir.isDirectory()) {
        // 如果是目录则进进入下一层级进行递归处理
        getSVGFile(_path + dir.name + '/')
      } else {
        // 非svg后缀的文件跳过
        if (!dir.name.endsWith('.svg')) continue
        // 根据前缀、分隔符和文件名生成标签ID
        const symbolId = prefix + separator + dir.name.replace('.svg', '')
        // 读取文件内，提取出<svg>标签内容，并换成<symbol>标签添加上属性，便于项目代码中引用
        const content = readFileSync(_path + dir.name)
          .toString()
          .replace(svgTagExtract, (substr, viewBoxAttr) => {
            return `<symbol id="${symbolId}" viewBox="${viewBoxAttr}">`
          })
          .replace('</svg>', '</symbol>')

        SVGInnerHTML += content
      }
    }
  }
  getSVGFile(path)
  return SVGInnerHTML
}

// !important 该方法将会在浏览器中执行
function mountSVG(opt, innerHTML) {
  if (typeof opt === 'string') opt = JSON.parse(opt) // opt需要为对象格式
  if (opt === null || typeof opt !== 'object')
    throw new TypeError('mountSVG() param:opt must be a object')

  const element =
    document.getElementById(opt.customEleId) ||
    document.createElementNS('http://www.w3.org/2000/svg', 'svg')

  element.id = opt.customEleId
  element.style.display = 'none'
  element.innerHTML = innerHTML
  document.body.append(element)
}

export function createSVGSprites(option) {
  const opt = Object.assign(defaultOption, option)
  // 遍历目标文件夹以获取SVG图标的innerHTML字符串
  const svgHtml = preloadSVGToHTML(
    path.join(process.cwd(), opt.path),
    opt.symbolIdPrefix,
    opt.separator
  )

  return {
    name: pluginName,
    // required! 模块加载机制：解析文件地址，返回文件的ID来让rollup加载
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId
    },
    // 加载对应模块时，返回模块内容，感觉类似webpack loader
    load(id) {
      if (id === resolvedVirtualModuleId)
        return moduleStringify(
          { mountSVG: mountSVG, innerHTML: svgHtml },
          `mountSVG(${JSON.stringify(opt)},innerHTML);`
        )
    },
  }
}
