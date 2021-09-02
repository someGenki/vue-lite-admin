/**
 *  @From https://github.com/JetBrains/svg-sprite-loader/issues/434
 *  @Better https://github.com/anncwb/vite-plugin-svg-icons
 *  svg的width和height属性 width="500" height="300" 表示SVG可见区域的大小(画布大小)，不带单位默认是px
 *  viewBox是可视区域，要尽可能铺满整个画布。里面元素的按照比例绘制到viewBox上
 *  参考：https://blog.csdn.net/weixin_34080903/article/details/90158481
 */
import { readFileSync, readdirSync } from 'fs'

let idPrefix = ''

// const hasViewBox = /(viewBox="[^>+].*?")/g

const clearHeightWidth = /(width|height)="([^>+].*?)"/g

const svgTitle = /<svg([^>+].*?)>/

const clearReturn = /(\r)|(\n)/g

// dir需以/结尾
function findSvgFile(dir) {
  const svgRes = []
  // 读取目标目录
  const dirents = readdirSync(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      // 是目录则递归遍历目录
      svgRes.push(...findSvgFile(dir + dirent.name + '/'))
    } else {
      if (!dirent.name.endsWith('.svg')) continue
      const svg = readFileSync(dir + dirent.name)
        .toString()
        .replace('<?xml version="1.0" standalone="no"?>', '')
        .replace(clearReturn, '')
        //提取出svg标签,并根据id规则生成<symbol id="xxx">
        .replace(svgTitle, ($1, $2) => {
          // 清除原先的width,height属性，让大小根据viewBox自适应
          let content = $2.replace(clearHeightWidth, '')
          // 将svg的文件名和id-prefix拼接成<symbol>标签的id
          return `<symbol id="${idPrefix}-${dirent.name.replace(
            '.svg',
            ''
          )}" ${content}>`
        })
        // 将闭合标签/svg也换成symbol
        .replace('</svg>', '</symbol>')
      svgRes.push(svg)
    }
  }
  return svgRes
}

// 加载指定目录下的svg图片并注入到html标签中
export const svgLoader = (path, prefix = 'icon') => {
  if (path === '') return
  idPrefix = prefix
  const res = findSvgFile(process.cwd() + path)
  return {
    name: 'svg-transform',
    // 转换 index.html 的专用钩子
    transformIndexHtml(html) {
      return html.replace(
        '<body>',
        `<svg id="svgSpriteStats" xmlns="http://www.w3.org/2000/svg"  style="display: none;">
          ${res.join('')}
         </svg>`
      )
    },
  }
}
