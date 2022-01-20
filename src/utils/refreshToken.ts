// 请求前根据时间来刷新token的方法 [供参考用!]
class RefreshToken {
  private refreshing: boolean
  private waitingQueue: any[]

  constructor() {
    this.refreshing = false
    this.waitingQueue = []
  }

  // 用于排除不需要token的接口，避免死循环请求
  private isNeedTokenURL(url, arr = ['/login', '/refresh', '/getUserInfo']) {
    return !arr.some((val) => url.indexOf(val) > -1)
  }

  // 返回一个promise对象，用于阻塞调用者继续执行。这里面发送刷新请求，成功后清空请求队列
  private refreshTokenBeforeReq(
    doRefreshTokenApi: () => Promise<any>
  ): Promise<unknown> {
    // 创建一个未完成的promise，把改变状态的resolve方法交给请求token结束后执行
    const promise = new Promise((resolve) => {
      console.log('等待新token')
      // 等待队列放的是一个回调函数，来延迟resolve的执行，以此控制promise状态的改变
      this.waitingQueue.push(() => resolve(null))
    })
    if (!this.refreshing) {
      this.refreshing = true
      // 模拟请求刷新Token接口，当接口返回数据时执行then方法
      doRefreshTokenApi()
        .then(() => {
          console.log('刷新token成功，放行队列中的请求')
          this.refreshing = false
          this.waitingQueue.forEach((cb) => cb())
          this.waitingQueue.length = 0
        })
        .catch((error) => {
          console.error(error)
        })
    }
    return promise
  }
}
