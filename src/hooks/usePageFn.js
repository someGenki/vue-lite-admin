import router from '../router'
import { useLayoutStore } from '../store/layout'

const waterMarkId = 'waterMark'
const observerSym = Symbol()

const VM_STYLE = `
    position:fixed;
    top:0; left:0; bottom:0; right:0;
    pointer-events:none;
    background-repeat:repeat;`

const default_option = {
  letterSpacing: 4,
  width: 400,
  height: 100,
  stroke: '#000',
  opacity: 0.1,
  fontSize: 16,
  rotate: -20,
}

function createWaterMarkImage(str, option) {
  const o = Object.assign(default_option, option)
  const SVGTemplate =
    `<svg xmlns="http://www.w3.org/2000/svg" letter-spacing="${o.letterSpacing}" width="${o.width}" height="${o.height}">` +
    `<text x="0px" dx="0px" y="32px" dy="16px" fill="none" font-weight="100"
        stroke="${o.stroke}"
        stroke-opacity="${o.opacity}"
        font-size="${o.fontSize}"
        transform="rotate(${o.rotate})"
      >${str}</text>
      </svg>`
  return `url(data:image/svg+xml;base64,${window.btoa(
    unescape(encodeURIComponent(SVGTemplate))
  )})`
}

export function usePageFn() {
  // 刷新当前页面
  function refreshPage() {
    const route = router.currentRoute.value
    useLayoutStore().removeCachedView(route)
    if (route.path.indexOf('/redirect') > -1) return
    router.replace({ path: '/redirect' + route.fullPath, query: route.query })
  }

  // 打印当前页面
  function printPage() {}

  // 页面全屏
  function fullScreen() {
    //判断dom元素是否全屏 没有则请求全屏
    if (!document.fullscreenElement)
      document.documentElement.requestFullscreen()
    else if (document.exitFullscreen) document.exitFullscreen() //退出全屏
  }

  // 移除水印
  function delWaterMark(container = document.body) {
    const elm = container.querySelector('#' + waterMarkId)
    if (elm) {
      elm[observerSym] && elm[observerSym].disconnect()
      elm.remove()
    }
  }

  // 添加水印
  function waterMark(
    str,
    imageOption = {},
    container = document.body,
    protect = false
  ) {
    delWaterMark(container)
    const watermark = document.createElement('div')
    watermark.setAttribute('id', waterMarkId)
    watermark.setAttribute('style', VM_STYLE)
    watermark.style.backgroundImage = createWaterMarkImage(str, imageOption)
    container.appendChild(watermark)

    if (protect === true) {
      // 基于前端页面水印的保护措施，只能做到简易保护
      const observer = new MutationObserver(() => {
        if (!container.contains(watermark)) {
          // 这里只简单的监听下div是否被移除，没有监听属性的变化
          container.appendChild(watermark)
        }
      })
      observer.observe(container, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['style'],
      })
      watermark[observerSym] = observer
    }
  }

  return {
    refreshPage,
    fullScreen,
    waterMark,
    delWaterMark,
  }
}
