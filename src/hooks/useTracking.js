/**
 * 页面埋点相关功能 待完善
 */
export function useTracking() {
  const nav = window.performance.getEntries()[0]
  // const start = 0 // 统计起始点 建议从nav.fetchStart开始
  const times = {}
  // dns解析时间
  times.dnsTime = nav.domainLookupEnd - nav.domainLookupStart
  // tcp建立时间
  times.tcpTime = nav.connectEnd - nav.connectStart
  // 请求发起到接收到第一个字节的数据的耗时(这里指index.html)
  times.requestTime = nav.responseStart - nav.requestStart
  // 从接收到第一个字节的数据到最后一个字节数据的耗时(下载时间)
  times.downloadTime = nav.responseEnd - nav.responseStart
  // 读取页面第一个字节的时间
  times.firstByteTime = nav.responseStart
  // 白屏时间: 页面开始解析的时间，即将进入渲染环节
  times.blankTime = nav.domInteractive
  // 解析dom花费的时长 dom.readyState从interactive变成complete的耗时
  times.domReadyTime = nav.domComplete - nav.domInteractive
  // 当浏览器完成页面所有资源加载的耗时
  times.loadTime = nav.loadEventEnd

  // 用于发送一些统计和诊断，简单易用
  // navigator.sendBeacon("/log", data);
  return { times }
}
