let hadErrorInit = false
let vueApp = null
const option = {} // 存放相关信息，比如要上报的url，项目名称等
const errorType = ['VueError', 'Window', 'UnReject']
const errorMap = {}

// 当Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件
function handleUnReject(event) {
  // const { reason } = event
  console.log(`UNHANDLED PROMISE REJECTION: ${event.reason}`)
  errorMap['UnReject'].push(event)
}

// 处理语法异常和运行时异常
function handleWindowError(event) {
  // const { message, source, lineno, colno, error } = event
  console.log(event)
  errorMap['Window'].push(event)
}

// 处理组件渲染函数和侦听器执行期间抛出的未捕获错误
function initHandleVueError(vueApp) {
  if (!vueApp) return
  const { errorHandler } = vueApp.config

  vueApp.config.errorHandler = (err, vm, info) => {
    if (typeof errorHandler === 'function') {
      errorHandler(err, vm, info) // 保留原有调用
    }
    console.log(err, vm, info)
    errorMap['VueError'].push({ err, vm, info })
  }
}

function initError() {
  if (hadErrorInit) return
  window.addEventListener('error', handleWindowError)
  window.addEventListener('unhandledrejection', handleUnReject)
  initHandleVueError(vueApp)

  errorType.forEach((type) => (errorMap[type] = []))

  hadErrorInit = true
}

export function useErrorTrack() {
  // 功能待补全
  return { errorMap }
}

/**
 * 页面埋点相关功能 待完善
 * 性能相关收集
 */
export function useTracking() {
  const nav = window.performance.getEntries()[0]
  // browser info
  // const start = 0  // 统计起始点 建议从nav.fetchStart开始
  const times = {}
  // dns解析时间
  times.dnsTime = nav.domainLookupEnd - nav.domainLookupStart
  // tcp建立时间
  times.tcpTime = nav.connectEnd - nav.connectStart
  // TTFB: 读取页面第一个字节的时间
  times.firstByteTime = nav.responseStart
  // 下载时间: 从接收到第一个字节的数据到最后一个字节数据的耗时(下载时间)
  times.downloadTime = nav.responseEnd - nav.responseStart
  // 白屏时间: 页面开始解析的时间，即将进入渲染环节
  times.blankTime = nav.domInteractive

  // 解析dom花费的时长: dom.readyState从interactive变成complete的耗时(X)
  // times.domReadyTime = nav.domContentLoadedEventEnd  - nav.domInteractive

  // 当浏览器完成页面所有资源加载的耗时
  times.loadTime = nav.loadEventEnd

  // 用于发送一些统计和诊断，简单易用
  // navigator.sendBeacon("/log", data);
  return { times }
}

export default {
  install: (app, opt) => {
    vueApp = app
    option.url = opt?.url
    initError()
  },
}
